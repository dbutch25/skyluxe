"use client";

import { useEffect } from "react";
import {
  useEditor,
  EditorContent,
  type Editor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";

interface RichTextEditorProps {
  /** Tiptap JSON document (matches the `content` field stored in the CMS). */
  value: object | null;
  /** Emits the updated Tiptap JSON document whenever the content changes. */
  onChange: (json: object) => void;
  label?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? "bg-primary-950 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-primary-950"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic"
      >
        <Italic size={16} />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        active={editor.isActive("heading", { level: 2 })}
        title="Heading"
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        title="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo2 size={16} />
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  label,
}: RichTextEditorProps) {
  const editor = useEditor({
    // Defer first render to the client so server and client markup match.
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value ?? "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[180px] px-3 py-3 font-montserrat text-gray-700 focus:outline-none [&_h2]:font-julius [&_h2]:text-primary-950",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // Sync external value changes (e.g. after the CMS data loads) into the editor
  // without clobbering in-progress edits.
  useEffect(() => {
    if (!editor || value == null) return;
    const current = JSON.stringify(editor.getJSON());
    const incoming = JSON.stringify(value);
    if (current !== incoming) {
      editor.commands.setContent(value as JSONContent, false);
    }
  }, [value, editor]);

  return (
    <div>
      {label && (
        <label className="mb-1 block font-montserrat text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="overflow-hidden rounded-lg border border-gray-300 focus-within:border-primary-800 focus-within:ring-1 focus-within:ring-primary-800/20">
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}