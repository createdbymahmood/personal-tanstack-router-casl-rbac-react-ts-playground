import { useCalendarGrid } from "@react-aria/calendar";
import { getWeeksInMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { CalendarCell } from "./calendar-cell";
import styles from "./styles.module.css";
import { CalendarState } from "@react-stately/calendar";

type CalendarGridProps = {
  state: CalendarState;
};
export function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" className={styles.grid}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map(weekIndex => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
