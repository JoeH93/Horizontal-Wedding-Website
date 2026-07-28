"use client"
import { useRef, useState } from "react";
import Divider from "@/components/Divider/Divider";
import { usePhotoQueue } from "../UsePhotoQueue";


const MAX_VISIBLE_THUMBS = 7;

export default function GallerySection6() {
  const [uploaderName, setUploaderName] = useState("");
  const { queue, addFiles, uploadAll, removeItem, hasPending, isUploading } =
    usePhotoQueue(uploaderName);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const visibleItems = queue.slice(0, MAX_VISIBLE_THUMBS);
  const overflowCount = queue.length - visibleItems.length;

  return (
    <div id="photos" className="h-full w-full flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-2 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40">
          Share the Moment
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-[#2B2A28]">
          Photo Memories
        </h2>

        <Divider />

        <input
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
          placeholder="Your Name (optional)"
          className="w-full max-w-xs mx-auto block border border-[#2B2A28]/20 rounded-md px-4 py-2.5 text-sm bg-white/60 focus:outline-none focus:border-[#B08D57] mb-4"
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="px-5 py-2.5 bg-[#2B2A28] text-[#FBF7F0] uppercase tracking-[0.15em] text-xs hover:bg-[#B08D57] transition-colors"
          >
            Take a Photo
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="px-5 py-2.5 border border-[#B08D57] text-[#B08D57] uppercase tracking-[0.15em] text-xs hover:bg-[#B08D57] hover:text-white transition-colors"
          >
            Upload from Gallery
          </button>
        </div>

        {queue.length > 0 && (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
              {visibleItems.map((item) => (
                <div key={item.id} className="relative aspect-square">
                  <img
                    src={item.previewUrl}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                  {item.status === "uploading" && (
                    <div className="absolute inset-0 bg-black/40 rounded-md" />
                  )}
                  {item.status === "done" && (
                    <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                  {item.status === "error" && (
                    <div className="absolute inset-0 bg-red-900/50 rounded-md" />
                  )}
                  {item.status !== "uploading" && item.status !== "done" && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#2B2A28] text-white text-[10px] flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              {overflowCount > 0 && (
                <div className="aspect-square rounded-md bg-[#2B2A28]/10 flex items-center justify-center">
                  <span className="text-xs text-[#2B2A28]/60">
                    +{overflowCount}
                  </span>
                </div>
              )}
            </div>

            {hasPending && (
              <button
                type="button"
                onClick={uploadAll}
                className="w-full max-w-xs mx-auto block bg-[#2B2A28] text-[#FBF7F0] py-2.5 uppercase tracking-[0.15em] text-xs hover:bg-[#B08D57] transition-colors"
              >
                Upload {queue.filter((q) => q.status === "pending" || q.status === "error").length} Photo(s)
              </button>
            )}

            {!hasPending && queue.length > 0 && !isUploading && (
              <p className="text-md text-[#161616]">
                All photos uploaded — thank you!
              </p>
            )}

            {!hasPending && queue.length > 0 && isUploading && (
              <p className="text-lg text-[#8A9A82] animate-pulse">
                Uploading
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}