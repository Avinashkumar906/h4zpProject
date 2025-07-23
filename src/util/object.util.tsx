import { ComponentType } from './mockData.util';

export function hasOwn(obj: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export const copyToClipboard = (data: ComponentType) => {
  if (data) {
    try {
      localStorage.setItem('component', JSON.stringify(data));
      alert('Copied to application clipboard.');
    } catch (error) {
      console.error('Failed to serialize and copy:', error);
    }
  } else {
    console.error('Failed to copy');
  }
};

export const pasteFromClipboard = () => {
  const jsonData = localStorage.getItem('component');

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

export const getImageSize = (url: string): Promise<{ width: number; height: number }> =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 200, height: 100 }); // fallback if image fails
  });
