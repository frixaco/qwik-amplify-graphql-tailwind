import { $, component$ } from "@builder.io/qwik";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, zodForm$ } from "@modular-forms/qwik";
import { routeLoader$, z } from "@builder.io/qwik-city";
import { Auth } from "aws-amplify";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("The email address is badly formatted."),
  password: z
    .string()
    .min(1, "Please enter your password.")
    .min(8, "You password must have 8 characters or more."),
});

export type SignInForm = z.infer<typeof signInSchema>;
export type SignInResponse = {
  data: any;
  message: string;
  status: "success" | "error";
};

export const useFormLoader = routeLoader$<InitialValues<SignInForm>>(() => ({
  email: "rashurmatov@vbrato.io",
  password: "1234567aA+",
}));

export const useFormAction = formAction$<SignInForm, Promise<SignInResponse>>(
  async (values) => {
    try {
      const response = await Auth.signIn(values.email, values.password);
      return {
        message: "Success",
        data: response.username,
        status: "success",
      };
    } catch (error: any) {
      return {
        message: error?.message || "",
        data: error,
        status: "error",
      };
    }
  },
  zodForm$(signInSchema)
);

export default component$(() => {
  const [signInForm, { Form, Field }] = useForm<
    SignInForm,
    Promise<SignInResponse>
  >({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(signInSchema),
  });

  const handleSubmit = $<SubmitHandler<SignInForm>>(async (values) => {
    console.log("handleSubmit", values);
  });

  return (
    <div class="flex flex-col h-screen w-screen items-center justify-center">
      <h1>SIGN IN</h1>

      <Form
        onSubmit$={handleSubmit}
        class="bg-block-gradient rounded-md p-10 flex flex-col items-center gap-4"
      >
        <Field name="email">
          {(field, props) => (
            <div>
              <input
                class="bg-primary border text-primary-foreground rounded-md px-8 py-4"
                type="email"
                value={field.value}
                {...props}
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <div>
              <input
                class="bg-primary border text-primary-foreground rounded-md px-8 py-4"
                type="password"
                value={field.value}
                {...props}
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <button
          class="bg-primary text-primary-foreground rounded-md px-8 py-4"
          type="submit"
        >
          Sign In
        </button>
      </Form>

      {signInForm.submitting && <div>Submitting...</div>}
      <div>{JSON.stringify(signInForm.response)}</div>
    </div>
  );
});
