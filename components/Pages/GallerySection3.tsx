import Divider from "@/components/Divider/Divider";

const MOMENTS = [
  {
    label: "How We Met",
    text: "A rainy Tuesday, a closed café three hours later, and we were still talking.",
  },
  {
    label: "What Made It Click",
    text: "Somewhere between terrible jokes and very good arguments, we found someone worth keeping.",
  },
  {
    label: "The Leap",
    text: "No grand plan - just a quiet certainty that grew louder, until the question had to be asked.",
  },
];

export default function GallerySection3() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-2 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40">
          Our Story
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-[#2B2A28]">
          A Little Backstory
        </h2>

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border border-[#B08D57]/25 rounded-lg p-3 bg-white/40">
          {MOMENTS.map((m, i) => (
            <div key={m.label}>
              <span className="font-serif italic text-2xl text-[#B08D57]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-lg text-[#2B2A28] mt-1 mb-1">
                {m.label}
              </h3>
              <p className="text-sm text-[#2B2A28]/75 leading-relaxed">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}