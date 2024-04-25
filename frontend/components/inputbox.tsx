import React from "react";

interface InputBoxProps {
  heading: string;
  placeholder: string;
}

const InputBox: React.FC<InputBoxProps> = ({ heading, placeholder }) => {
  return (
    <div className="flex flex-col pt-4">
      <label className="text-sm font-semibold mb-1">{heading}</label>
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder={placeholder}
        aria-label={heading}
      />
    </div>
  );
};

export default InputBox;
