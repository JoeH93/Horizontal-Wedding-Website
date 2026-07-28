"use client"
import Divider from "@/components/Divider/Divider";
import { useRsvpForm, WHISH_NAME, WHISH_NUMBER } from "../Usersvpform";


export default function GallerySection4() {
  const {
    status,
    errorMessage,
    data,
    updateField,
    handleSubmit,
    guestName,
    maxAttendees,
  } = useRsvpForm();

  return (
    <div id="rsvp" className="h-full w-full flex items-center justify-center px-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: greeting + registry */}
        <div className="text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-[#608150] mb-2 border border-[#B08D57]/25 rounded-2xl p-3 bg-white/40">
            {guestName ? "A Personal Invitation" : "Kindly Reply"}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-[#2B2A28]">
            {guestName ? `Dear ${guestName},` : "RSVP"}
          </h2>
          <p className="mt-2 text-sm text-[#2B2A28]/80 leading-relaxed">
            We would be so honored to have you join us.
            {maxAttendees
              ? maxAttendees === 1
                ? " This invitation is for one guest."
                  : ` This invitation includes up to ${maxAttendees} guests.`
                   : ""}
          </p>      
          <Divider/> 
        </div>
        
        {/* Right: form */}
        <div>
          {status === "success" ? (
            <div className="border border-[#8A9A82]/40 rounded-lg p-6 bg-[#8A9A82]/10 text-center">
              <p className="font-serif text-lg text-[#2B2A28] mb-1">
                You&apos;re on the list!
              </p>
              <p className="text-sm text-[#2B2A28]/70">
                Thank you for replying!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="guestName"
                value={data.guestName}
                onChange={(e) => updateField("guestName", e.target.value)}
                placeholder="Guest Name(s)"
                className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-2.5 text-sm bg-white/60 focus:outline-none focus:border-[#B08D57]"
              />

              <div className="flex gap-2">
                {[
                  { label: "yes", value: true },
                  { label: "no", value: false },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => updateField("attending", opt.value)}
                    className={`flex-1 py-2.5 rounded-md border text-xs uppercase tracking-[0.1em] transition-colors ${
                      data.attending === opt.value
                        ? "bg-[#2B2A28] text-[#FBF7F0] border-[#2B2A28]"
                        : "border-[#2B2A28]/20 text-[#2B2A28]"
                    }`}
                  >
                    {opt.value ? "Accept" : "Decline"}
                  </button>
                ))}
              </div>

              {data.attending && (
                <input
                  name="numberAttending"
                  type="number"
                  min={1}
                  value={data.numberAttending}
                  onChange={(e) =>
                    updateField("numberAttending", Number(e.target.value))
                  }
                  placeholder="Number Attending"
                  className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-2.5 text-sm bg-white/60 focus:outline-none focus:border-[#B08D57]"
                />
              )}

              <textarea
                name="note"
                rows={2}
                value={data.note}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="Note (optional)"
                className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-2.5 text-sm bg-white/60 focus:outline-none focus:border-[#B08D57]"
              />

              {status === "error" && (
                <p className="text-xs text-red-600">
                  {errorMessage || "Something went wrong — try again."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#2B2A28] text-[#FBF7F0] py-2.5 uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}