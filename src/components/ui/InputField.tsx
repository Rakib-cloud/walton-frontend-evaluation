"use client";

import { cn } from "@/lib/cn";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  className?: string;
};

export function InputField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required = false,
  textarea = false,
  rows = 3,
  className,
}: InputFieldProps) {
  const inputClasses = cn(
    "w-full rounded-lg border px-3.5 py-2 text-sm focus:outline-none focus:ring-2 transition-all",
    error
      ? "border-red-500 focus:ring-red-200"
      : "border-zinc-300 focus:border-walton-blue focus:ring-walton-blue/15"
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="text-xs font-bold text-zinc-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}

      {error && (
        <p className="text-xs font-semibold text-red-600 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
