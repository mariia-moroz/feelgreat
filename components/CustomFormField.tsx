"use client";

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
import { Input } from "@/components/ui/input";

import { PhoneInput } from "@/components/reui/phone-input";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  id: string;
  formFieldType: string;
  name: Path<T>;
  type: string;
  label: string;
  placeholder?: string;
  FieldIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: unknown) => React.ReactNode;
}

const RenderInput = <T extends FieldValues>({
  field,
  fieldState,
  props,
}: {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  props: CustomProps<T>;
}) => {
  const { formFieldType, id, name, type, placeholder, FieldIcon } = props;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return FieldIcon ? (
        <InputGroup className='shad-input'>
          <InputGroupInput
            {...field}
            id={id}
            type={type}
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
          type={type}
          aria-invalid={fieldState.invalid}
          placeholder={placeholder}
          autoComplete={name}
          className='shad-input'
        />
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          id={id}
          aria-invalid={fieldState.invalid}
          defaultCountry='GB'
          placeholder={placeholder}
          international
          value={field.value}
          onChange={field.onChange}
          className="input-phone"
        />
      );
    default:
      break;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
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
