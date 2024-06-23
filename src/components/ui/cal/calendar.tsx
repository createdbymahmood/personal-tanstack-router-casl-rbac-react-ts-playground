import { CalendarDate, createCalendar } from "@internationalized/date";
import { useCalendar } from "@react-aria/calendar";
import { useDateFormatter } from "@react-aria/i18n";
import {
  CalendarState,
  CalendarStateOptions,
  useCalendarState,
} from "@react-stately/calendar";
import { ChangeEvent, useRef } from "react";
import { Button } from "./button";
import { CalendarGrid } from "./calendar-grid";
import styles from "./styles.module.css";

export function Calendar(props: Omit<CalendarStateOptions, "createCalendar">) {
  const state = useCalendarState({
    ...props,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null!);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} ref={ref} className={styles.calendar}>
      <div className={styles.header}>
        <Button {...prevButtonProps}>&lsaquo;</Button>
        <div className={styles.dropdowns}>
          <MonthDropdown state={state} />
          <YearDropdown state={state} />
        </div>
        <Button {...nextButtonProps}>&rsaquo;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

function MonthDropdown({ state }: { state: CalendarState }) {
  const months = [];
  const formatter = useDateFormatter({
    month: "long",
    timeZone: state.timeZone,
  });

  // Format the name of each month in the year according to the
  // current locale and calendar system. Note that in some calendar
  // systems, such as the Hebrew, the number of months may differ
  // between years.
  const numMonths = state.focusedDate.calendar.getMonthsInYear(
    state.focusedDate
  );
  for (let i = 1; i <= numMonths; i++) {
    const date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    const date = state.focusedDate.set({ month: value });
    state.setFocusedDate(date);
  };

  return (
    <select
      aria-label="Month"
      onChange={onChange}
      value={state.focusedDate.month}
      className={styles.select}
    >
      {months.map((month, i) => (
        <option key={i} value={i + 1}>
          {month}
        </option>
      ))}
    </select>
  );
}

function YearDropdown({ state }: { state: CalendarState }) {
  const years = [] as { value: CalendarDate; formatted: string }[];
  const formatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone,
  });

  // Format 20 years on each side of the current year according
  // to the current locale and calendar system.
  for (let i = -20; i <= 20; i++) {
    const date = state.focusedDate.add({ years: i });
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    });
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    const date = years[index].value;
    state.setFocusedDate(date);
  };

  return (
    <select
      aria-label="Year"
      onChange={onChange}
      value={20}
      className={styles.select}
    >
      {years.map((year, i) => (
        // use the index as the value so we can retrieve the full
        // date object from the list in onChange. We cannot only
        // store the year number, because in some calendars, such
        // as the Japanese, the era may also change.
        <option key={i} value={i}>
          {year.formatted}
        </option>
      ))}
    </select>
  );
}
