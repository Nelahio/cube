import { Label, Textarea } from "flowbite-react";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
  id: string;
} & UseControllerProps;

export default function TextareaInput(props: Props) {
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
      <Textarea
        {...props}
        {...field}
        id={props.id}
        placeholder={props.label}
        color={
          fieldState.error ? "failure" : !fieldState.isDirty ? "" : "success"
        }
        helperText={fieldState.error?.message}
        rows={3}
      />
    </div>
  );
}
