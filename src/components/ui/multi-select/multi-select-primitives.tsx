"use client";
import { noop } from "lodash";
import type {
  ComboboxButtonProps,
  ComboboxInputProps,
  ComboboxOptionProps,
  ComboboxOptionsProps,
} from "@headlessui/react";
import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { Group } from "../group";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type MultiSelectOptionType = string;

export const MultiSelectInputWrapper = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-row flex-wrap gap-1.5 rounded-sm border border-input p-1 pr-2.5 shadow-sm",
        className
      )}
      {...props}
    />
  );
});

export const MultiSelectTrigger = React.forwardRef<
  React.ElementRef<typeof ComboboxButton>,
  ComboboxButtonProps
>(({ className, ...props }, ref) => {
  return (
    <ComboboxButton
      ref={ref}
      className={cn(
        "absolute inset-y-0 right-0 flex shrink-0 items-center justify-center px-1.5"
      )}
      {...props}
    />
  );
});

export const MultiSelectInput = React.forwardRef<
  React.ElementRef<typeof ComboboxInput>,
  ComboboxInputProps
>(({ className, ...props }, ref) => {
  return (
    <ComboboxInput
      ref={ref}
      className={cn(
        "outline-none appearance-none border-none ring-0 text-sm flex-1 p-1.5",
        className
      )}
      {...props}
    />
  );
});

export const MultiSelectOptions = React.forwardRef<
  React.ElementRef<typeof ComboboxOptions>,
  ComboboxOptionsProps
>(({ className, ...props }, ref) => {
  return (
    <ComboboxOptions
      ref={ref}
      className={cn("mt-1.5 rounded-sm border border-input p-1.5", className)}
      {...props}
    />
  );
});

export const MultiSelectOption = React.forwardRef<
  React.ElementRef<typeof ComboboxOption>,
  ComboboxOptionProps<"div", MultiSelectOptionType>
>(({ className, ...props }, ref) => {
  return (
    <ComboboxOption
      ref={ref}
      className={cn(
        "group flex cursor-default select-none items-center gap-2 rounded-lg p-0.5 data-[focus]:bg-black/10 px-3",
        className
      )}
      {...props}
    />
  );
});

export const MultiSelectOptionLabel = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-sm text-black flex gap-1.5 items-center justify-between py-1 w-full",
        className
      )}
      {...props}
    >
      {children}
      <Check className="invisible size-4 group-data-[selected]:visible" />
    </div>
  );
});

export const MultiSelectSelectedItemBadge = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & { onRemoveItem?: () => void }
>(({ children, onRemoveItem = noop, ...props }, ref) => {
  return (
    <Badge ref={ref} variant="outline" {...props}>
      <Group>
        <span>{children}</span>
        <X className="size-4 cursor-pointer" onClick={onRemoveItem} />
      </Group>
    </Badge>
  );
});

export const MultiSelectSelectedItems = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex flex-wrap gap-1.5", className)}
      {...props}
      ref={ref}
    />
  );
});

export const MultiSelectOptionsListEmpty = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("p-1.5 text-sm", className)} {...props} />
  );
});
