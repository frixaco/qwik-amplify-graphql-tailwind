import { component$ } from "@builder.io/qwik";
import { type RequestHandler, type DocumentHead } from "@builder.io/qwik-city";
import amplifyInstance from "~/core/aws-amplify";

import VbratoLogoWithText from "~/media/logo/logo-with-text.png?jsx";

export const onGet: RequestHandler = async ({redirect}) => {
  console.log('onGet /')
  try {
    const user = amplifyInstance.currentAuthenticatedUser() as any;
    const userAttributes = await amplifyInstance.userAttributes(user);
    const userId = userAttributes.find((attr: any) => attr.Name === "sub")?.Value;

    if (userId) {
      throw redirect(308, "/dashboard");
    }
  } catch (error) {
    throw redirect(308, "/signin");
  }
}

export default component$(() => {
  return (
    <div class="flex h-screen w-screen items-center justify-center">
      <VbratoLogoWithText class="w-[400px] h-[100px]" />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
