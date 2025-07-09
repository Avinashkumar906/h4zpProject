export function hasOwn(obj: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export const copyToClipboard = (data: any) => {
  if (data) {
    try {
      sessionStorage.setItem('component', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to serialize and copy:', error);
    }
  } else {
    console.error('Failed to copy');
  }
};

export const pasteFromClipboard = () => {
  const jsonData = sessionStorage.getItem('component');

  if (jsonData) {
    try {
      const item = JSON.parse(jsonData);
      return item;
    } catch (error) {
      console.error('Invalid JSON in session storage:', error);
      return null;
    }
  } else {
    console.log('No structured data found in session storage.');
    return null;
  }
};
