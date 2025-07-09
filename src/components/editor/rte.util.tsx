import parse from 'html-react-parser';

export function safeParseHtml(html: string | undefined | null): ReturnType<typeof parse> | null {
  if (hasDisplayableContent(html)) {
    return <div className="w-100">{parse(html)}</div>;
  } else {
    return null;
  }
}

export function hasDisplayableContent(html: string): boolean {
  if (!html) return false;

  // Create a temporary DOM element to parse
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Extract visible text ignoring whitespace
  const text = temp.textContent?.trim() || '';

  // If text found, return true
  if (text.length > 0) return true;

  // If no text, check if there is at least one <img> or <video> etc.
  const hasMedia = temp.querySelector('img, video, iframe, audio, embed, object') !== null;

  return hasMedia;
}
