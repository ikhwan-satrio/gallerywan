import { formOptions } from "@tanstack/react-form-nextjs";
import { createUploadsFileSchema } from "../schemas/uploads";

export function getFormOpts(language: "en" | "id") {
  const schema = createUploadsFileSchema(language);

  return formOptions({
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    defaultValues: {
      files: null as unknown as File,
    },
  });
}
