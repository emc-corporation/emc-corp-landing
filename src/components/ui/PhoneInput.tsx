'use client';

import flags from 'react-phone-number-input/flags';
import PhoneInputWithCountry from 'react-phone-number-input';
import type { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface PhoneInputProps {
  value: Value | undefined;
  onChange: (value: Value | undefined) => void;
  placeholder?: string;
}

export function PhoneInput({ value, onChange, placeholder }: PhoneInputProps) {
  return (
    <PhoneInputWithCountry
      international
      defaultCountry="UZ"
      flags={flags}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="phone-input"
    />
  );
}
