"use client";

import { format, parse, differenceInYears } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import styles from "./DatePicker.module.css";

export function DatePicker({
  name,
  label,
  date,
  error,
  onChange,
}: {
  name: string;
  label: string;
  date: string;
  error?: string;
  onChange: ({ name, value, type }: { name: string, value: string, type?: string }) => void;
}) {
  const parsedDate =
    date && !isNaN(Date.parse(date))
      ? new Date(date)
      : parse(date ? date : "", "dd-MM-yyyy", new Date()); // supports "dd-MM-yyyy"

  const [selected, setSelected] = useState<Date | undefined>(
    parsedDate instanceof Date && !isNaN(parsedDate.getTime())
      ? parsedDate
      : undefined
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [month, setMonth] = useState<Date>(selected || new Date());

  const handleSelect = (date: Date | undefined) => {
    setErrorMsg("");
    if (!date) return;

    const age = differenceInYears(new Date(), date);

    if (age < 18) {
      setErrorMsg("Minimum age is 18 years");
      setSelected(undefined);
      return;
    }

    if (age > 100) {
      setErrorMsg("Maximum age is 100 years");
      setSelected(undefined);
      return;
    }

    setSelected(date);
    onChange({ name, value: date ? format(date, "dd-MM-yyyy") : "DD - MM - YYYY" });
  };

  useEffect(() => {
    if (date) {
      const parsed = parse(date, "dd-MM-yyyy", new Date());
      if (!isNaN(parsed.getTime())) {
        setSelected(parsed);
        setMonth(parsed);
      }
    }
  }, [date]);

  // Generate month and year lists
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); // last 100 years
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    const newDate = new Date(month);
    newDate.setMonth(newMonth);
    setMonth(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(month);
    newDate.setFullYear(newYear);
    setMonth(newDate);
  };

  return (
    <div className={`w-full ${styles.container}`}>
      <label className={styles.label}>{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-between bg-(--bodyfill-primary-green) shadow-none text-white hover:bg-(--bodyfill-dark-primary-blue)/90 hover:text-white
              ${!selected && "text-gray-400"}
              ${error || errorMsg ? "border-(--border-warning-red)" : "border-none"}
              ${styles.button}
            `}
          >
            {selected ? format(selected, "dd-MM-yyyy") : "DD - MM - YYYY"}
            <CalendarIcon className="h-4 w-4 opacity-80" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={`max-w-80 p-0 bg-(--bodyfill-dark-primary-blue) w-(--radix-popover-trigger-width) text-white border border-(--bodyfill-dark-primary-blue)/70 ${styles.popover}`}
          align="start"
        >
          {/* Month & Year Dropdowns */}
          <div className="flex justify-between items-center p-2 border-b border-(--bodyfill-dark-primary-blue)/70">
            <select
              value={month.getMonth()}
              onChange={handleMonthChange}
              className="bg-(--bodyfill-dark-primary-blue) text-(length:--input-font-size) w-full text-white text-sm focus:outline-none cursor-pointer"
            >
              {months.map((m, i) => (
                <option key={m} value={i} className={styles.options}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={month.getFullYear()}
              onChange={handleYearChange}
              className="bg-(--bodyfill-dark-primary-blue) text-(length:--input-font-size) w-full text-white text-sm focus:outline-none cursor-pointer"
            >
              {years.map((y) => (
                <option key={y} value={y} className={styles.options}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            disabled={(date) => {
              const age = differenceInYears(new Date(), date);
              return age < 18 || age > 100;
            }}
            className="bg-(--bodyfill-dark-primary-blue) w-full text-white [&_.rdp-day_selected]:bg-(--bodyfill-dark-primary-blue) [&_.rdp-day_selected]:text-white [&_.rdp-day_selected:hover]:bg-[#ffffff] [&_.rdp-nav_button]:text-[#c6ff00] [&_.rdp-nav_button:hover]:bg-transparent [&_.rdp-day_today]:text-[#c6ff00]"
          />

          <div className="flex justify-between px-3 pb-2">
            {errorMsg ? <p className={styles.errorText}>{errorMsg}</p> : <div />}
            <PrimaryButton onClick={() => setSelected(undefined)} >Clear</PrimaryButton>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default memo(DatePicker);