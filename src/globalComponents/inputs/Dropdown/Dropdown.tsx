"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import styles from './Dropdown.module.css'
import { Option, SharedInputComponentProps } from "../types";
import { memo } from "react";

type DropdownProps = SharedInputComponentProps & {
  options: Option[];
  onChange: ({ name, value, type }: { name: string, value: string, type?: string }) => void;
}

function Dropdown({ name, value, error, options, onChange, label, placeholder, }: DropdownProps) {
  const selectedRole = options.find(option => option.value === value)?.label;

  return (
    <div className={`${styles.container} w-full text-white`}>
      <label className={styles.label}>
        {label}
      </label>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className={`${styles.dropdownButton} w-full flex justify-between items-center px-4 py-2 rounded-md text-sm focus:outline-none   ${error ? 'ring-1 ring-(--border-warning-red)' : 'focus:ring-2 focus:ring-offset-2 focus:ring-(primary)'}`}
          >
            {selectedRole || placeholder}
            <ChevronDown className="ml-1 h-4 w-4 opacity-80" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          collisionPadding={16}
          align="end"
          className={`w-full ${styles.dropdownBox} w-(--radix-dropdown-menu-trigger-width) min-w-(--radix-dropdown-menu-trigger-width) text-white rounded-md p-0 `}
        >
          {options.map((option, key) => (
            <DropdownMenuItem
              key={key}
              onSelect={() => onChange({ name, value: option.value, type: 'dropdown' })}
              className={`${styles.dropdownItem} w-(--radix-dropdown-menu-trigger-width) cursor-pointer  focus:bg-(primary-green) `}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className={styles.errorText}>{error}</p>}
    </div >
  );
}

export default memo(Dropdown);
