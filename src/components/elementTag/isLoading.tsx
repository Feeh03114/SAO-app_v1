import { twMerge } from "tailwind-merge";

interface IProps {
  isVisible: boolean;
  textLoading?: string;
  className?: string;
}

export default function IsLoading({isVisible, textLoading, className}:IProps) {
  return (
    <div className={twMerge(`flex items-center justify-center aria-hidden:hidden text-teal-400`, className)}
      aria-hidden={!isVisible}
    >
        <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={"4"}></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2 aria-hidden:hidden" aria-hidden={!textLoading}>{textLoading}</span>
    </div>
  )
}