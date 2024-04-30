import React from "react";
import { UseControllerProps, useController } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import { fr } from "date-fns/locale";
registerLocale("fr", fr);

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  Partial<ReactDatePickerProps>;

export default function DateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  return (
    <div className="block">
      <ReactDatePicker
        {...props}
        {...field}
        onChange={(value) => field.onChange(value)}
        selected={field.value}
        placeholderText={props.label}
        locale={fr}
        className={`
        rounded-lg w-[100%] flex flex-col
        ${
          fieldState.error
            ? "bg-red-50 border-red-500 text-red-900"
            : !fieldState.invalid && fieldState.isDirty
            ? "bg-green-50 border-green-500 text-green-900"
            : ""
        }
        `}
      />
      {fieldState.error && (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      )}
    </div>
  );
}
