import { Label, Select } from "flowbite-react";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  showLabel?: boolean;
  id?: string;
  options?: Option[];
} & UseControllerProps;

export default function SelectInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: "",
  });

  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name} value={props.label} />
        </div>
      )}
      <Select
        {...props}
        {...field}
        color={
          fieldState.error ? "failure" : !fieldState.isDirty ? "" : "success"
        }
        helperText={fieldState.error?.message}
      >
        {props.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
