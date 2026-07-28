"use client"
import Divider from "@/components/Divider/Divider";
import { useRsvpForm, WHISH_NAME, WHISH_NUMBER } from "../Usersvpform";

export default function GallerySection7() {
  const { copied, handleCopy } = useRsvpForm();

  return (
    <div id="gifts" className="h-full w-full flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-2 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40">
          Here You Can Send Us a Gift
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-[#2B2A28]">
          Gift Registry
        </h2>

        <Divider />

        <p className="text-sm text-[#2B2A28]/80 leading-relaxed mb-6">
          Your love, laughter, and presence are all we could wish for on our
          special day. For those who&apos;d still like to send something,
          here&apos;s where to reach us.
        </p>

        <div className="border border-[#B08D57]/30 rounded-lg p-4 bg-white/40 max-w-xs mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B08D57] mb-2 text-center">
            Whish Money
          </p>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-[#2B2A28]/70">Name</span>
            <span className="font-serif text-[#2B2A28]">{WHISH_NAME}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#2B2A28]/70">Number</span>
            <span className="font-serif text-[#2B2A28]">{WHISH_NUMBER}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full mt-3 py-2 border border-[#B08D57] text-[#B08D57] text-xs uppercase tracking-[0.1em] hover:bg-[#B08D57] hover:text-white transition-colors"
          >
            {copied ? "Copied!" : "Copy Number"}
          </button>
        </div>
      </div>
    </div>
  );
}