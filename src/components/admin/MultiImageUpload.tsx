"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, GripVertical } from "lucide-react";

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  folder?: string;
}

export default function MultiImageUpload({
  values,
  onChange,
  label = "Images",
  folder = "skyluxe",
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) uploaded.push(data.url);
    }

    onChange([...values, ...uploaded]);
    setUploading(false);
  };

  const remove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 font-montserrat">
          {label}
        </label>
      )}

      <div className="grid grid-cols-3 gap-3 mb-3">
        {values.map((url, i) => (
          <div key={i} className="relative h-28 rounded-lg overflow-hidden border border-gray-200 group">
            <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" sizes="200px" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <label className="h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-secondary-400 transition-colors">
          {uploading ? (
            <Loader2 className="animate-spin text-secondary-500" size={20} />
          ) : (
            <>
              <Upload size={20} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-400 font-montserrat">Add</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
