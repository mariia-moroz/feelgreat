"use client";

import { cn } from "@/lib/utils";
import {
  Control,
  Path,
  Controller,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { PhoneInput } from "@/components/reui/phone-input";
import DatePicker from "./DatePicker";
import { Checkbox } from "./ui/checkbox";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  RADIO_GROUP_INPUT = "radioGroupInput",
}

export interface CustomFieldProps<T extends FieldValues> {
  control: Control<T>;
  id: string;
  formFieldType: string;
  name: Path<T>;
  type?: string;
  label?: string;
  placeholder?: string;
  FieldIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  radioGroupOptions?: Array<string>;
  phoneDefaultCountry?: string;
  renderSkeleton?: (field: ControllerRenderProps<T, Path<T>>) => React.ReactNode;
}

const RenderInput = <T extends FieldValues>({
  field,
  fieldState,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  props: CustomFieldProps<T>;
}) => {
  const {
    formFieldType,
    id,
    name,
    type,
    label,
    placeholder,
    FieldIcon,
    radioGroupOptions,
    children,
    renderSkeleton,
    phoneDefaultCountry,
  } = props;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return FieldIcon ? (
        <InputGroup className='shad-input'>
          <InputGroupInput
            {...field}
            id={id}
            type={type ?? "text"}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={name}
            className='shad-input-text'
          />
          <InputGroupAddon>
            <FieldIcon className='shad-input-icon' />
          </InputGroupAddon>
        </InputGroup>
      ) : (
        <Input
          {...field}
          id={id}
          type={type ?? "text"}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          autoComplete={name}
          className='shad-input'
        />
      );

    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          {...field}
          id={id}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          autoComplete={name}
          className='shad-textArea resize-none'
          disabled={props.disabled}
        />
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          id={id}
          aria-invalid={fieldState.invalid}
          defaultCountry={phoneDefaultCountry as never}
          placeholder={placeholder}
          international
          value={field.value}
          onChange={field.onChange}
          className='input-phone'
        />
      );

    case FormFieldType.DATE_PICKER:
      return <DatePicker field={field} fieldState={fieldState} props={props} />;

    case FormFieldType.RADIO_GROUP_INPUT:
      return (
        <RadioGroup value={field.value} onValueChange={field.onChange} className='grid gap-4 xl:grid-cols-3'>
          {radioGroupOptions?.map(option => (
            <div key={option} className='radio-group'>
              <RadioGroupItem value={option} id={option} />
              <Label
                htmlFor={option}
                className={cn("checkbox-label", field.value === option && "!text-foreground")}
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case FormFieldType.SELECT:
      return (
        <Select name={field.name} value={field.value} onValueChange={field.onChange}>
          <SelectTrigger id={id} aria-invalid={fieldState.invalid} className='shad-select-trigger'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position='item-aligned' className='shad-select-content'>
            {children}
          </SelectContent>
        </Select>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.CHECKBOX:
      return (
        <div className='flex items-center gap-4'>
          <Checkbox
            id={id}
            name={field.name}
            aria-invalid={fieldState.invalid}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="shad-checkbox"
          />
          <FieldLabel htmlFor={id} className='checkbox-label'>
            {label}
          </FieldLabel>
        </div>
      );

    default:
      break;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomFieldProps<T>) => {
  const { control, formFieldType, id, name, label } = props;
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {formFieldType !== FormFieldType.CHECKBOX && label && (
              <FieldLabel htmlFor={id} className='shad-input-label'>
                {label}
              </FieldLabel>
            )}
            <RenderInput field={field} fieldState={fieldState} props={props} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

export default CustomFormField;
