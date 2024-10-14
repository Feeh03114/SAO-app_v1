import React, { InputHTMLAttributes } from 'react';
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import InputMask from 'react-input-mask';
import { twMerge } from "tailwind-merge";

const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, '');

const phoneMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  mask: string;
}

export interface RegisterModelProps {
  name: string;
  label?: string;
  placeHolder?: string;
  children?: React.ReactNode;
  control: Control<any>;
  disabled?: boolean;
  className?: string;
  valueTypeName?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
  required?: boolean;
  mask?: string;
  readOnly?: boolean;
  typeInput?: string;
}

function MaskedInput({ error, name, label, control, className, required, mask="", readOnly=true, typeInput, ...rest }:RegisterModelProps): JSX.Element {
  function maxLength() {
    if (typeInput === "phoneNumber") {
      return 15
    } else if (typeInput === "rg") {
      return 13
    } else {
      return undefined
    }
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <label className={`${label === undefined && 'hidden'} pl-4 text-sm font-Inter font-medium leading-tight text-slate-700 dark:text-white`}>{label}<span className={`${required == undefined && "hidden"} text-red-500`}>*</span></label>
          <InputMask
            className={twMerge("w-full h-10 px-4 py-3 text-sm font-medium leading-tight truncate dark:text-white placeholder-slate-500 dark:placeholder-white shadow-sm border rounded-lg border-slate-300 dark:border-slate-500 dark:bg-slate-700", className)}
            name={name}
            mask={mask}
            maxLength = {maxLength()}
            value={typeInput === "phoneNumber" ? phoneMask(field.value) : field.value}
            alwaysShowMask={true}
            onChange={e => {
              field.onChange(onlyNumbers(e.target.value))
            }}
            readOnly={readOnly}
            {...rest}
            onFocus={(e) => {
              e.target.classList.add("ring-teal-400");
              e.target.classList.add("dark:ring-teal-400");
              e.target.classList.add("border-teal-400");
              e.target.classList.add("dark:border-teal-400");
            }}
            onBlur={(e) => {
              e.target.classList.remove("ring-teal-400");
              e.target.classList.remove("dark:ring-teal-400");
              e.target.classList.remove("border-teal-400");
              e.target.classList.remove("dark:border-teal-400");
            }}
          />
          {!!error && (
              <p className="text-red-500 text-sm">{error?.message?.toString()}</p>
          )}
        </>
      )}
    />
  );
} 

export default MaskedInput;