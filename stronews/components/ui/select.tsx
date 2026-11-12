"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "cn";

const Select = SelectPrimitive.Root;

function SelectTrigger({
  className,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-9 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-1 text-sm font-normal whitespace-nowrap text-foreground outline-none transition-colors select-none hover:bg-muted/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      className={cn("min-w-0 truncate text-left data-placeholder:text-muted-foreground", className)}
      {...props}
    />
  );
}

function SelectIcon({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Icon>) {
  return (
    <SelectPrimitive.Icon
      className={cn("size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    >
      <ChevronDown />
    </SelectPrimitive.Icon>
  );
}

function SelectContent({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Popup>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner className="z-50 select-none outline-none" sideOffset={6}>
        <SelectPrimitive.Popup
          className={cn(
            "max-h-72 min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-hidden rounded-lg border border-input bg-popover text-popover-foreground shadow-lg outline-none transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            className,
          )}
          {...props}
        />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectList({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.List>) {
  return (
    <SelectPrimitive.List
      className={cn("relative max-h-[var(--available-height)] overflow-y-auto p-1", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "grid cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="min-w-0 truncate">{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectScrollUpArrow({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn("flex h-6 w-full items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <ChevronUp className="size-3.5" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn("flex h-6 w-full items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <ChevronDown className="size-3.5" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  SelectValue,
};
