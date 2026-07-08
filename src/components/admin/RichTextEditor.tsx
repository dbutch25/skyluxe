"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Heading2, Undo, Redo } from "lucide-react";

interface RichTextEditorProps {
  value: object | null;
  onChange: (json: object) => void;
  label?: string;
}

export default function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value ?? "",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] prose prose-sm max-w-none font-montserrat text-sm p-4 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const ToolbarBtn = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-1.5 rounded transition-colors ${
        active ? "bg-gray-800 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
          {label}
        </label>
      )}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50">
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={16} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={16} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={16} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List size={16} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered size={16} />
          </ToolbarBtn>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={16} />
          </ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={16} />
          </ToolbarBtn>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
