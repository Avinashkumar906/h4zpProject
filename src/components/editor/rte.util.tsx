import parse, { domToReact } from 'html-react-parser';
import { Link } from 'react-router-dom';

const replaceAnchor = (node) => {
  if (node.type !== 'tag' || node.name !== 'a' || !node.attribs?.href) {
    return;
  }

  const href = node.attribs.href;
  const className = node.attribs.class || '';

  if (href.startsWith('/')) {
    // Internal link: use React Router <Link>
    return (
      <Link to={href} className={className}>
        {domToReact(node.children)}
      </Link>
    );
  } else {
    // External link: open in new tab, preserve class
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {domToReact(node.children)}
      </a>
    );
  }
};

export function safeParseHtml(html: string | undefined | null): ReturnType<typeof parse> | null {
  if (hasDisplayableContent(html)) {
    return (
      <div className="w-100">
        {parse(html, {
          replace: replaceAnchor,
        })}
      </div>
    );
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
