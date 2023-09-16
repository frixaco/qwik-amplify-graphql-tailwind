import {
  $,
  component$,
  useTask$,
} from "@builder.io/qwik";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, zodForm$ } from "@modular-forms/qwik";
import { type RequestHandler, routeLoader$, useNavigate, z } from "@builder.io/qwik-city";
import amplifyInstance from "~/core/aws-amplify";

export const onGet: RequestHandler = async () => {
  console.log('onGet signin /')
}

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
      console.log("formAction", values);
      const response = await amplifyInstance.Auth.signIn(values.email, values.password);
      console.log("signIn response", response.username);
      return {
        status: "success",
        data: response.username,
        message: "Successfully signed in."
      };
    } catch (error) {
      console.log("signIn error", error);
      return {
        status: "error",
        data: undefined,
        message: "Failed to sign in."
      }
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

  const nav = useNavigate();

  useTask$(({ track }) => {
    track(() => signInForm.response);

    console.log('task')
    if (signInForm.response.status === "success") {
      nav("/dashboard");
    }
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
    </div>
  );
});
