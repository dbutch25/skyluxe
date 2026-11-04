"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadPhotos } from "@/lib/photo-upload";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  accept?: string;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
  folder = "skyluxe",
  accept = "image/*",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");

    // Photos go straight from the browser to Cloudflare (resized, location data
    // removed), so large files don't hit Vercel's 4.5 MB request limit.
    // Videos still go through /api/upload.
    if (file.type.startsWith("image/") || /\.(heic|heif)$/i.test(file.name)) {
      try {
        let failure = "";
        const [url] = await uploadPhotos([file], {
          folder,
          onProgress: (p) => {
            if (p.failed.length) failure = p.failed.join(", ");
          },
        });
        if (!url) throw new Error(failure ? `Upload failed: ${failure}` : "Upload failed");
        onChange(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // Cloudinary serves videos under a /video/upload/ path; also match common
  // video extensions. Video URLs must render in a <video>, not next/image.
  const isVideo =
    !!value &&
    (/\/video\/upload\//.test(value) ||
      /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(value));

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
          {isVideo ? (
            <video
              src={value}
              className="w-full h-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={value}
              alt="Uploaded"
              fill
              className="object-cover"
              sizes="400px"
            />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-secondary-400 transition-colors"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {uploading ? (
            <Loader2 className="animate-spin text-secondary-500" size={24} />
          ) : (
            <>
              <Upload size={24} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 font-montserrat text-center">
                Drop file here or click to upload
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1 font-montserrat">{error}</p>
      )}
    </div>
  );
}