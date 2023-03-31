"use client";

import { uncertaintyValueRawData } from "@/prisma/data";
import { useState } from "react";

interface Option {
  label: string;
  value: number;
}

interface Props {
  sympCode: string;
}

const optionDescendSort: Option[] = uncertaintyValueRawData.sort((a, b) => b.value - a.value);
const options: Option[] = optionDescendSort

export default function RadioButton({ sympCode }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(() => {
    const findZero = options.find((option) => option.value === 0);
    return findZero?.label;
  });

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="grid grid-flow-row grid-cols-3 gap-4">
      {options.map((option: Option, index: number) => (
        <label
          key={index}
          tabIndex={0}
          className={`${selectedOption === option.label
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
