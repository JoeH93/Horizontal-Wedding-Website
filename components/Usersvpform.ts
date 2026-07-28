"use client"
import { useState, FormEvent } from "react";
import { googleSheetDataType } from "@/types/googleSheetDataType";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL_DATA: googleSheetDataType = {
  guestName: "",
  attending: true,
  numberAttending: 1,
  note: "",
};

// Update with your actual Whish Money details
export const WHISH_NAME = "Jane Doe";
export const WHISH_NUMBER = "+961 XX XXX XXX";

export function useRsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<googleSheetDataType>(INITIAL_DATA);
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();
  const guestParam = searchParams.get("guest");
  const maxParam = searchParams.get("max");

  const guestName = guestParam ? decodeURIComponent(guestParam) : null;
  const parsedMax = maxParam ? parseInt(maxParam, 10) : NaN;
  const maxAttendees =
    Number.isFinite(parsedMax) && parsedMax > 0 ? parsedMax : null;

  function updateField<K extends keyof googleSheetDataType>(
    field: K,
    value: googleSheetDataType[K]
  ) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(WHISH_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail on non-HTTPS/older browsers - number is
      // still visible on screen for the guest to copy manually.
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!data.guestName.trim()) {
        throw new Error("Please enter your name.");
      }
      if (data.attending && data.numberAttending <= 0) {
        throw new Error("Please enter a valid number of guests.");
      }

      if (data.attending && maxAttendees && data.numberAttending > maxAttendees) {
        throw new Error(`Maximum number of attendees is ${maxAttendees}.`);
      }

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");

      setStatus("success");
      setData(INITIAL_DATA);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  return {
    status,
    errorMessage,
    data,
    updateField,
    handleSubmit,
    guestName,
    maxAttendees,
    copied,
    handleCopy,
  };
}