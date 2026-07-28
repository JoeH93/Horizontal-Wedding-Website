"use client"
import { useState } from "react";
import { resizeImage } from "@/components/ImageResizer/ResizeImage";

export type QueueItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: "pending" | "uploading" | "done" | "error";
  errorMessage?: string;
};

export function usePhotoQueue(uploaderName: string) {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const newItems: QueueItem[] = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));
    setQueue((prev) => [...prev, ...newItems]);
  }

  async function uploadOne(item: QueueItem) {
    try {
      const { base64, mimeType } = await resizeImage(item.file);

      const res = await fetch("/api/photo-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: item.file.name,
          mimeType,
          base64Data: base64,
          uploaderName: uploaderName || "Guest",
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: "done" } : q))
      );
    } catch {
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? { ...q, status: "error", errorMessage: "Failed to upload" }
            : q
        )
      );
    }
  }

  async function uploadAll() {
    const pending = queue.filter(
      (q) => q.status === "pending" || q.status === "error"
    );
    const pendingIds = new Set(pending.map((q) => q.id));
    setQueue((prev) =>
      prev.map((q) => (pendingIds.has(q.id) ? { ...q, status: "uploading" } : q))
    );
    for (const item of pending) {
      await uploadOne(item);
    }
  }

  function removeItem(id: string) {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  }

  const hasPending = queue.some(
    (q) => q.status === "pending" || q.status === "error"
  );

  return { queue, addFiles, uploadAll, removeItem, hasPending };
}