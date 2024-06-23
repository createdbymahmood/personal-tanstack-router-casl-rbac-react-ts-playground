import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Calendar } from "./calendar";
import styles from "./styles.module.css";
import { DateValue } from "@react-aria/calendar";

const calendars = [
  { key: "gregory", name: "Gregorian" },
  { key: "japanese", name: "Japanese" },
  { key: "buddhist", name: "Buddhist" },
  { key: "roc", name: "Taiwan" },
  { key: "persian", name: "Persian" },
  { key: "indian", name: "Indian" },
  { key: "islamic-umalqura", name: "Islamic (Umm al-Qura)" },
  { key: "islamic-civil", name: "Islamic Civil" },
  { key: "islamic-tbla", name: "Islamic Tabular" },
  { key: "hebrew", name: "Hebrew" },
  { key: "coptic", name: "Coptic" },
  { key: "ethiopic", name: "Ethiopic" },
  { key: "ethioaa", name: "Ethiopic (Amete Alem)" },
];

const defaultOptions = new Intl.DateTimeFormat("fa-IR").resolvedOptions();
export default function CalendarApp() {
  const [calendar, setCalendar] = useState(defaultOptions.calendar);
  const locale = useMemo(
    () => new Intl.Locale("fa-IR", { calendar }).toString(),
    [calendar]
  );

  const [value, setValue] = useState<DateValue | undefined>(
    parseDate(format(new Date(), "yyyy-MM-dd"))
  );

  return (
    <div className={styles.app}>
      {/* prettier-ignore */}
      <p style={{marginBottom: 50}}>This sandbox shows an example <strong><code>Calendar</code></strong> component built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank">React Aria</a> and <a href="https://github.com/css-modules/css-modules" rel="noreferrer" target="_blank">CSS Modules</a>. It also demonstrates how to add custom locale and calendar system aware month and year dropdowns to easily jump forward or backward in time.</p>
      <label style={{ display: "block", margin: "50px auto" }}>
        Calendar System:{" "}
        <select
          className={styles.select}
          value={calendar}
          onChange={e => setCalendar(e.target.value)}
        >
          {calendars.map((calendar, i) => (
            <option key={i} value={calendar.key}>
              {calendar.name}
            </option>
          ))}
        </select>
      </label>
      <I18nProvider locale={locale}>
        <Calendar value={value} onChange={setValue} locale={locale} />
      </I18nProvider>
    </div>
  );
}
