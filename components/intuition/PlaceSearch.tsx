'use client';

import { useEffect, useId, useRef, useState } from 'react';

export type PickedPlace = { id: number; label: string };

// Birthplace search: type a town, pick it from the list. Works with a
// keyboard (arrows, Enter, Escape) and screen readers (ARIA combobox).
export default function PlaceSearch({
  value,
  onChange,
  label,
  placeholder,
  help,
  empty,
  error,
  inline = false,
  inputClassName,
  describedBy,
}: {
  // Inline: sits inside a sentence; the parent shows the help and error text
  inline?: boolean;
  inputClassName?: string;
  describedBy?: string;
  value: PickedPlace | null;
  onChange: (place: PickedPlace | null) => void;
  label: string;
  placeholder: string;
  help: string;
  empty: string;
  error?: string;
}) {
  const id = useId();
  const [query, setQuery] = useState(value?.label ?? '');
  const [results, setResults] = useState<PickedPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  // Search as they type, waiting for a short pause
  useEffect(() => {
    const q = query.trim();
    if (value && q === value.label) return;
    if (q.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/intuition-blueprint/places?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        const json = (await res.json()) as { places?: PickedPlace[] };
        setResults(json.places ?? []);
        setActive(-1);
        setOpen(true);
        setSearched(true);
      } catch {
        /* a newer search replaced this one */
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, value]);

  // Close the list when tapping elsewhere
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  const pick = (place: PickedPlace) => {
    onChange(place);
    setQuery(place.label);
    setOpen(false);
    setResults([]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || !results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      pick(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const listId = `${id}-list`;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const showList = open && query.trim().length >= 2 && (results.length > 0 || searched);

  return (
    <div ref={wrapper} className={inline ? 'relative inline-block w-full align-baseline sm:w-auto' : 'relative'}>
      <label htmlFor={`${id}-input`} className={inline ? 'sr-only' : 'block font-body text-[0.7rem] font-semibold uppercase tracking-widest2 text-bark'}>
        {label}
      </label>
      <input
        id={`${id}-input`}
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        aria-describedby={inline ? describedBy : `${helpId}${error ? ` ${errorId}` : ''}`}
        aria-invalid={Boolean(error)}
        autoComplete="off"
        spellCheck={false}
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          if (value) onChange(null);
        }}
        onFocus={() => results.length && setOpen(true)}
        onKeyDown={onKeyDown}
        className={
          inputClassName ??
          `mt-3 w-full rounded-none border-b bg-transparent px-0 py-3 font-body text-lg text-bark placeholder:text-stone/70 focus:outline-none ${
            error ? 'border-rose' : 'border-bark/30 focus:border-bark'
          }`
        }
      />
      {loading && <span className="absolute right-0 top-10 font-body text-xs text-stone" aria-hidden="true">…</span>}
      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute left-0 z-20 mt-2 max-h-72 w-full min-w-[18rem] overflow-auto border border-bark/15 bg-white text-left not-italic shadow-lg"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 font-body text-sm text-stone">{empty}</li>
          ) : (
            results.map((r, i) => (
              <li
                key={r.id}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => pick(r)}
                className={`cursor-pointer px-4 py-3 font-body text-sm text-bark ${i === active ? 'bg-zing-yellow' : 'hover:bg-sand'}`}
              >
                {r.label}
              </li>
            ))
          )}
        </ul>
      )}
      {!inline && (
        <p id={helpId} className="mt-2 font-body text-xs leading-relaxed text-stone">
          {help}
        </p>
      )}
      {!inline && error && (
        <p id={errorId} className="mt-2 font-body text-sm text-[#a2363a]">
          {error}
        </p>
      )}
    </div>
  );
}
