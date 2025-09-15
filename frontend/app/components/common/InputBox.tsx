import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({
  label,
  type,
  placeholder,
  onChange,
  required = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="pb-4">
      <div className="text-left flex text-sm font-semibold text-gray-200">
        {label}
        {required && <span className="text-red-500">*</span>}
      </div>

      <div className="relative">
        <input
          onChange={onChange}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="px-2 py-2 border border-gray-500 w-full rounded-lg outline-none hover:border-gray-400 text-gray-200 pr-10"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-200 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
