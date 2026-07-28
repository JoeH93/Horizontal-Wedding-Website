import Divider from "@/components/Divider/Divider";

const FAQS = [
  {
    q: "Plus-one?",
    a: "If your invite says +1, bring someone! Otherwise, we're keeping it small.",
  },
  {
    q: "Kids invited?",
    a: "Adults-only — think wine, dancing, and bedtimes past 9pm.",
  },
  {
    q: "What to wear?",
    a: "Garden party glam — cocktail attire you can move in.",
  },
  {
    q: "Parking?",
    a: "Guest lot on-site, plus rideshare drop-off space.",
  },
  {
    q: "Indoors or out?",
    a: "Ceremony in the rose garden, reception indoors.",
  },
  {
    q: "Arrival time?",
    a: "Please arrive by 4:15 PM — we start right at 4:30.",
  },
];

export default function GallerySection5() {
  return (
    <div id="faq" className="h-full w-full flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-2 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40">
          Good to Know
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-[#2B2A28]">
          FAQ
        </h2>

        <Divider />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left border border-[#B08D57]/25 rounded-lg p-3 bg-white/40">
          {FAQS.map((item) => (
            <div key={item.q}>
              <p className="font-serif text-sm text-[#2B2A28] mb-0.5">
                {item.q}
              </p>
              <p className="text-xs text-[#2B2A28]/70 leading-snug">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}