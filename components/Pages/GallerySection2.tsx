import Divider from "@/components/Divider/Divider";
import Image from "next/image";

const DETAILS = [
  {
    label: "Church",
    time: "4:30 PM",
    venue: "Saint Charbel Annaya",
    note: "Arrive by 4:15 PM — seating is unassigned.",
    Image: "/Church.jpeg",
    Location:
      "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQoo-KudKVAxUAAAAAHQAAAAAQBQ..i&pvq=CgsvZy8xdGQxMDl2diITCg1zYWludCBjaGFyYmVsEAIYAw&lqi=Ch1zYWludCBjaGFyYmVsIGFubmF5YSBsb2NhdGlvbkjazsDA5YCAgAhaHhAAEAEYABgBIhRzYWludCBjaGFyYmVsIGFubmF5YZIBD2NhdGhvbGljX2NodXJjaJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMWFWRkZZUmxCTmVsbDRUMGQ0U1U1Vk1YRlJWVEZwVlZjNWRtTkZSUkFC-gEECAAQNw&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=lb&sa=X&ftid=0x151f50884ea0226d:0x488e56988fefb750",
  },
  {
    label: "Restaurant",
    time: "5:45 PM",
    venue: "Bar Du Port",
    note: "Drinks, bites, and a live trio.",
    Image: "/Restaurant.jpg",
    Location: "https://maps.app.goo.gl/sTeEktRnwx4W6aY1A",
  },
  {
    label: "Bride's House",
    time: "2:30 PM",
    venue: "Lala Land",
    note: "Family and Friends Gathering at home.",
    Image: "/brideHouse.webp",
    Location: "https://maps.app.goo.gl/t92JTBjYMpaVT5co8",
  },
  {
    label: "Groom's House",
    time: "2:30 PM",
    venue: "Krikita Land",
    note: "Family and Friends Gathering at home.",
    Image: "/groomHouse.webp",
    Location: "https://maps.app.goo.gl/t92JTBjYMpaVT5co8",
  },
];

export default function GallerySection2() {
  return (
    <div id="details" className="h-full w-full flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-2 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40">
          The Details
        </p>
        <h2 className="font-serif text-2xl md:text-4xl text-[#2B2A28]">
          When &amp; Where
        </h2>

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {DETAILS.map((d) => (
            <div
              key={d.label}
              className="flex gap-3 items-start border border-[#B08D57]/25 rounded-lg p-3 bg-white/40"
            >
              {d.Image ? (
                <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={d.Image}
                    alt={d.venue}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 shrink-0 rounded-md bg-gradient-to-br from-[#8A9A82]/25 to-[#B08D57]/25" />
              )}

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#B08D57]">
                  {d.label}
                </p>
                <p className="font-serif text-base text-[#2B2A28] leading-tight">
                  {d.time} &middot; {d.venue}
                </p>
                <p className="text-xs text-[#2B2A28]/60 italic truncate">
                  {d.note}
                </p>
                <a
                  href={d.Location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[10px] uppercase tracking-[0.1em] text-[#B08D57] border-b border-[#B08D57] hover:text-[#2B2A28] hover:border-[#2B2A28] transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}