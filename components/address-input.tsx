"use client";

import { useEffect, useRef, useState } from "react";

// Optional Mapbox autocomplete for Central Florida.
// Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in .env.local for better suggestions.
// Falls back gracefully to a plain input if the token is missing.

type MapboxFeature = { id: string; place_name: string; text: string };
type Suggestion = { id: string; primary: string; full: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
};

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const ORLANDO_PROXIMITY = "-81.3792,28.5383";
const CFL_BBOX = "-82.6,27.4,-80.4,29.4";

export function AddressInput({ value, onChange, placeholder, autoComplete = "street-address" }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounceRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const fetchSeq = useRef(0);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (!TOKEN) return;
    if (query.trim().length < 3) { setSuggestions([]); setOpen(false); return; }
    const seq = ++fetchSeq.current;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${TOKEN}&country=us&proximity=${ORLANDO_PROXIMITY}&bbox=${CFL_BBOX}&types=address,place,locality,neighborhood,postcode&autocomplete=true&limit=5`;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const data: { features?: MapboxFeature[] } = await res.json();
      if (seq !== fetchSeq.current) return;
      const items = (data.features ?? []).map(f => ({ id: f.id, primary: f.text, full: f.place_name }));
      setSuggestions(items);
      setOpen(items.length > 0);
      setActive(-1);
    } catch { /* fallback */ }
  };

  const onInput = (v: string) => {
    onChange(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => fetchSuggestions(v), 260);
  };

  const select = (s: Suggestion) => { onChange(s.full); setSuggestions([]); setOpen(false); };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); select(suggestions[active]); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        type="text"
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInput(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={onKey}
        className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3 text-base"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-[#E0DCD4] rounded-lg shadow-lg max-h-60 overflow-auto text-sm">
          {suggestions.map((s, i) => (
            <li key={s.id} onMouseDown={(e) => { e.preventDefault(); select(s); }} onMouseEnter={() => setActive(i)}
              className={`px-4 py-2.5 cursor-pointer ${i === active ? "bg-[#FBE6E0]" : "hover:bg-[#FAFAF9]"}`}>
              <div className="font-medium">{s.primary}</div>
              <div className="text-[#6B6B6B] text-xs">{s.full}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
