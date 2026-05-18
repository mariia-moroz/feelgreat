"use client";

import * as React from "react";
import { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { CalendarIcon, Clock2Icon } from "lucide-react";

import { CustomFieldProps } from "./CustomFormField";
import { formatDateTime } from "@/lib/utils";

const getTimeValue = (date?: Date) => {
  if (!date) {
    return "09:00";
  }

  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${hours}:${minutes}`;
};

const updateDateTime = (date: Date, timeValue: string) => {
  const [hours, minutes] = timeValue.split(":").map(Number);
  const nextDate = new Date(date);

  nextDate.setHours(hours || 0, minutes || 0, 0, 0);

  return nextDate;
};

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
  const { id, placeholder, showTimeSelect } = props;
  const selectedDate = field.value ? new Date(field.value as string | number | Date) : undefined;

  const formattedValue = selectedDate
    ? showTimeSelect
      ? formatDateTime(selectedDate).dateTime
      : formatDateTime(selectedDate).dateOnly
    : (placeholder ?? "Select date");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type='button'
          aria-invalid={fieldState.invalid}
          className='justify-start shad-input-datepicker'
        >
          <CalendarIcon className='shad-input-icon' />
          {formattedValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto overflow-hidden p-2' align='start'>
        <Calendar
          mode='single'
          selected={selectedDate}
          defaultMonth={selectedDate}
          captionLayout='dropdown'
          onSelect={date => {
            if (!date) {
              field.onChange("");
              return;
            }

            const nextDate = showTimeSelect ? updateDateTime(date, getTimeValue(selectedDate)) : date;

            field.onChange(nextDate.toISOString());
            setOpen(false);
          }}
          disabled={showTimeSelect ? { before: new Date() } : { after: new Date() }}
        />
        {showTimeSelect && (
          <FieldGroup className='p-2'>
            <Field>
              <FieldLabel htmlFor='time'>Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id='time'
                  type='time'
                  step="60"
                  value={getTimeValue(selectedDate)}
                  onChange={event => {
                    const baseDate = selectedDate ?? new Date();
                    const nextDate = updateDateTime(baseDate, event.target.value);

                    field.onChange(nextDate.toISOString());
                  }}
                  className='appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                />
                <InputGroupAddon>
                  <Clock2Icon className='text-input-icon' />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
