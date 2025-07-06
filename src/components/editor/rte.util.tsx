import parse from 'html-react-parser';

export function safeParseHtml(html: string | undefined | null): ReturnType<typeof parse> | null {
  if (!html) return null;

  const trimmed = html.trim();

  if (trimmed === '' || trimmed === '<div><br></div>') {
    return null;
  }

  return <div className="editor p-0">{parse(html)}</div>;
}
