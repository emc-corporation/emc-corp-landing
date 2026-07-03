'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from '@/components/icons';

export function CustomSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: number;
  onChange: (idx: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <label className="flex flex-col gap-[7px]">
      <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
        {label}
      </span>
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-lg border border-white/[.16] bg-white/[.06] px-[15px] py-[13px] text-left text-[15px] text-white transition-colors duration-200 hover:border-accent"
        >
          <span>{options[value]}</span>
          <ChevronDown
            size={20}
            className={`text-[#aeb4bb] transition-transform duration-[250ms] ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="absolute top-[calc(100%+6px)] right-0 left-0 z-20 flex flex-col gap-0.5 rounded-[10px] border border-white/[.16] bg-[#333941] p-1.5 shadow-[0_22px_44px_-18px_rgba(0,0,0,.7)]">
            {options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(idx);
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between gap-2.5 rounded-[7px] border-none bg-transparent px-3 py-[11px] text-left text-[14.5px] text-[#e9ebee] transition-colors duration-150 hover:bg-white/[.08]"
              >
                <span>{opt}</span>
                {idx === value && (
                  <Check size={18} className="text-accent" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}
