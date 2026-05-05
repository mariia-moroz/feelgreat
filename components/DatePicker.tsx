"use client";

import * as React from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import { CustomFieldProps } from "./CustomFormField";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const DatePicker = <T extends FieldValues>({
  field,
  fieldState,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  props: CustomFieldProps<T>;
}) => {
  const [open, setOpen] = React.useState(false);
  const { id, placeholder } = props;
  const selectedDate = field.value ? new Date(field.value as string | number | Date) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} type='button' aria-invalid={fieldState.invalid} className='justify-start shad-input-datepicker'>
          <CalendarIcon className='shad-input-icon' />
          {selectedDate ? dateFormatter.format(selectedDate) : placeholder ?? "Select your birth date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
        <Calendar
          mode='single'
          selected={selectedDate}
          defaultMonth={selectedDate}
          captionLayout='dropdown'
          onSelect={date => {
            field.onChange(date ? date.toISOString() : "");
            setOpen(false);
          }}
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
