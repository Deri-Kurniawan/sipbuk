"use client";

import { useState } from "react";

interface Option {
  label: string;
  value: number;
}

interface Props {
  sympCode: string;
}

const options = [
  { label: "Sangat Yakin", value: 1 },
  { label: "Yakin", value: 0.8 },
  { label: "Cukup Yakin", value: 0.6 },
  { label: "Sedikit Yakin", value: 0.4 },
  { label: "Tidak Yakin", value: 0.2 },
  { label: "Sangat Tidak Yakin", value: 0 },
];

export default function RadioButton({ sympCode }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>(
    options[options.length - 1].label
  );

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="grid grid-flow-row grid-cols-3 gap-4">
      {options.map((option: Option, index: number) => (
        <label
          key={index}
          tabIndex={0}
          className={`${
            selectedOption === option.label
              ? "bg-blue-500 text-white"
              : "bg-primary"
          } col-span-1 text-sm text-center inline-flex justify-center lg:h-[42px] items-center px-4 py-2 rounded-lg transition-all duration-300 hover:cursor-pointer`}
        >
          <input
            type="radio"
            className="hidden"
            name={sympCode}
            value={option.value}
            checked={selectedOption === option.label}
            onChange={() => handleOptionChange(option.label)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
