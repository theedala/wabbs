"use client";
import { useState } from "react";

export function NewsImage({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <div className="-mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden border-b border-border bg-bg-subtle">
      {/* Publisher's own feed thumbnail — remote arbitrary hosts, so a plain img. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setOk(false)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
