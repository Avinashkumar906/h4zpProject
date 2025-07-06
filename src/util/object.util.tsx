export function hasOwn(obj: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Handles structured copy of an object to the clipboard.
 * @param e ClipboardEvent
 * @param data Array of objects to search from
 * @param docId ID to find and copy
 */
export const copyToClipboard = (e: ClipboardEvent, data: any) => {
  e.preventDefault();

  if (data) {
    try {
      const jsonData = JSON.stringify(data);
      e.clipboardData?.setData('application/json', jsonData);
      e.clipboardData?.setData('text/plain', jsonData);
    } catch (error) {
      console.error('❌ Failed to serialize and copy:', error);
    }
  }
};

/**
 * Handles structured paste from the clipboard.
 * @param e ClipboardEvent
 * @param cb Callback to handle the parsed object or null if unavailable
 */
export const pasteFromClipboard = (e: ClipboardEvent) => {
  e.preventDefault();

  const jsonData =
    e.clipboardData?.getData('application/json') || e.clipboardData?.getData('text/plain');

  if (jsonData) {
    try {
      const item = JSON.parse(jsonData);
      return item;
    } catch (error) {
      console.error('❌ Invalid JSON in clipboard:', error);
      return null;
    }
  } else {
    console.log('⚠️ No structured data found in clipboard.');
    return null;
  }
};
