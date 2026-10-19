/**
 * Renders a Tiptap JSON document as React elements.
 *
 * Text goes through React, so it is always escaped; there is no
 * dangerouslySetInnerHTML and no way for stored content to inject HTML.
 * Supports the StarterKit nodes and marks used by the CMS editor.
 */
import type { ReactNode } from "react";

interface TiptapMark {
  type: string;
}

interface TiptapNode {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: TiptapMark[];
  content?: TiptapNode[];
}

function renderMarks(text: string, marks: TiptapMark[] = [], key: string): ReactNode {
  return marks.reduce<ReactNode>((child, mark, i) => {
    const k = `${key}-m${i}`;
    switch (mark.type) {
      case "bold":   return <strong key={k}>{child}</strong>;
      case "italic": return <em key={k}>{child}</em>;
      case "strike": return <s key={k}>{child}</s>;
      case "code":   return <code key={k}>{child}</code>;
      default:       return child;
    }
  }, text);
}

function renderNode(node: TiptapNode, key: string): ReactNode {
  if (node.type === "text") return renderMarks(node.text ?? "", node.marks, key);

  const children = (node.content ?? []).map((child, i) => renderNode(child, `${key}-${i}`));

  switch (node.type) {
    case "doc":
      return <>{children}</>;
    case "paragraph":
      return <p key={key}>{children}</p>;
    case "heading": {
      // Post title is the page H1, so content headings start at H2
      const level = Math.min(Math.max(Number(node.attrs?.level) || 2, 2), 4);
      if (level === 2) return <h2 key={key}>{children}</h2>;
      if (level === 3) return <h3 key={key}>{children}</h3>;
      return <h4 key={key}>{children}</h4>;
    }
    case "bulletList":
      return <ul key={key}>{children}</ul>;
    case "orderedList":
      return (
        <ol key={key} start={Number(node.attrs?.start) || undefined}>
          {children}
        </ol>
      );
    case "listItem":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;
    case "codeBlock":
      return (
        <pre key={key}>
          <code>{children}</code>
        </pre>
      );
    case "hardBreak":
      return <br key={key} />;
    case "horizontalRule":
      return <hr key={key} />;
    default:
      return <span key={key}>{children}</span>;
  }
}

export default function TiptapContent({
  content,
  className,
}: {
  content: object | null;
  className?: string;
}) {
  if (!content || typeof content !== "object") return null;
  return <div className={className}>{renderNode(content as TiptapNode, "n")}</div>;
}
