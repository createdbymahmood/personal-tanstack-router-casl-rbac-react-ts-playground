"use client";

import { Combobox } from "@headlessui/react";
import { noop } from "lodash";
import { ChevronsUpDown } from "lucide-react";
import type { MatchSorterOptions } from "match-sorter";
import { matchSorter } from "match-sorter";
import * as React from "react";

import type { MultiSelectOptionType } from "./multi-select-primitives";
import {
  MultiSelectInput,
  MultiSelectInputWrapper,
  MultiSelectOption,
  MultiSelectOptionLabel,
  MultiSelectOptions,
  MultiSelectOptionsListEmpty,
  MultiSelectSelectedItemBadge,
  MultiSelectSelectedItems,
  MultiSelectTrigger,
} from "./multi-select-primitives";

interface MultiSelectProps {
  options: MultiSelectOptionType[];
  matchSorterOptions: MatchSorterOptions<MultiSelectOptionType>;
  onChange?: (options: MultiSelectOptionType[]) => void;
  defaultValues?: MultiSelectOptionType[];
}

export const MultiSelect = ({
  matchSorterOptions,
  onChange = noop,
  options,
  defaultValues = [],
}: MultiSelectProps) => {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] =
    React.useState<MultiSelectOptionType[]>(defaultValues);

  React.useEffect(() => onChange(selected), [selected]);
  const filteredOptions = React.useMemo(
    () => matchSorter(options, query, matchSorterOptions),
    [query]
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;

      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected(prev => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }

        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const onRemoveItem = React.useCallback(
    (option: MultiSelectOptionType) => () => {
      setSelected(prev => {
        return prev.filter(item => item !== option);
      });
    },
    []
  );

  const selectedItemsList = (() => {
    if (!selected.length) return null;
    return (
      <MultiSelectSelectedItems>
        {selected.map(_selected => (
          <MultiSelectSelectedItemBadge
            key={_selected}
            onRemoveItem={onRemoveItem(_selected)}
          >
            {_selected}
          </MultiSelectSelectedItemBadge>
        ))}
      </MultiSelectSelectedItems>
    );
  })();

  const filteredOptionsList = (() => {
    if (!filteredOptions.length)
      return (
        <MultiSelectOptionsListEmpty>
          No options found
        </MultiSelectOptionsListEmpty>
      );
    return filteredOptions.map(option => (
      <MultiSelectOption key={option} value={option}>
        <MultiSelectOptionLabel>{option}</MultiSelectOptionLabel>
      </MultiSelectOption>
    ));
  })();

  return (
    <Combobox
      value={selected}
      immediate
      multiple
      onChange={nextValue => {
        console.log({ nextValue });
        setSelected(nextValue);
      }}
      onClose={() => setQuery("")}
    >
      <MultiSelectInputWrapper>
        {selectedItemsList}

        <MultiSelectInput
          ref={inputRef}
          placeholder="Search Something..."
          onChange={event => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <MultiSelectTrigger>
          <ChevronsUpDown className="size-4" />
        </MultiSelectTrigger>
      </MultiSelectInputWrapper>

      <MultiSelectOptions>{filteredOptionsList}</MultiSelectOptions>
    </Combobox>
  );
};
