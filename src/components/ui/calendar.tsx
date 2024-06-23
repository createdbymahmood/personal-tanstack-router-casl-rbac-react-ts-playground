import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { toNumber } from "lodash-es";

const NU_LOCALE = "fa";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const formatDay = (day: Date) => {
  return toNumber(format(day, "dd")).toLocaleString(NU_LOCALE);
};

const formatWeekNumber = (weekNumber: number) => {
  return weekNumber.toLocaleString(NU_LOCALE);
};

const formatMonthCaption = (date: Date) => {
  const y = date.getFullYear().toLocaleString(NU_LOCALE);
  const m = format(date, "LLLL");
  return `${m} ${y}`;
};

const formatCaption = (date: Date) => {
  const m = format(date, "MMMM");
  const y = format(date, "yyyy");
  return `${m} ${toNumber(y).toLocaleString(NU_LOCALE, { useGrouping: false })}`;
};

const formatWeekdayName = (date: Date) => {
  const d = format(date, "EEEEE");
  return d;
};

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      formatters={{
        formatDay,
        formatMonthCaption,
        formatWeekNumber,
        formatCaption,
        formatWeekdayName,
      }}
      showWeekNumber
      showOutsideDays
      locale={faIR}
      dir="rtl"
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 gap-3",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronRight className="h-4 w-4" />,
        IconRight: () => <ChevronLeft className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
