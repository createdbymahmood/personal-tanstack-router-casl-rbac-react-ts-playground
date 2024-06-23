import { useRef } from "react";
import { AriaCalendarCellProps, useCalendarCell } from "@react-aria/calendar";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";
import styles from "./styles.module.css";
import clsx from "clsx";
import { CalendarState } from "@react-stately/calendar";

export function CalendarCell(
  props: { state: CalendarState } & AriaCalendarCellProps
) {
  const ref = useRef<HTMLDivElement>(null!);
  const {
    cellProps,
    buttonProps,
    formattedDate,
    isSelected,
    isDisabled,
    isOutsideVisibleRange,
  } = useCalendarCell(props, props.state, ref);

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td {...cellProps}>
      <div
        ref={ref}
        hidden={isOutsideVisibleRange}
        {...mergeProps(buttonProps, focusProps)}
        className={clsx(styles.cell, {
          [styles.selected]: isSelected,
          [styles.focusRing]: isFocusVisible,
          [styles.disabled]: isDisabled,
        })}
      >
        {formattedDate}
      </div>
    </td>
  );
}
