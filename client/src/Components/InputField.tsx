import React from "react";

type InputField_T = {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string,
    placeholder?: string,
    required?: boolean,
    type?: string
}


function InputField({value,onChange,label,placeholder,required,type="text"}:InputField_T) {
  return (
    <div className="space-y-1">
       {label && (
        <label htmlFor="inputField" className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={label}
        type={type}
        required = {required}
        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500 placeholder:text-sm"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
