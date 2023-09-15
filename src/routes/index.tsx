import { component$, useTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Amplify, Auth } from "aws-amplify";
import { amplifyConfig } from "~/core/aws-amplify";

import VbratoLogoWithText from "~/media/logo/logo-with-text.png?jsx";

const checkAuth = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const userAttributes = await Auth.userAttributes(user);
    const userId = userAttributes.find((attr) => attr.Name === "sub")?.Value;

    if (!userId) {
      return null;
    }

    return userId;
  } catch (error) {
    return null;
  }
};

// export const onGet: RequestHandler = async ({ redirect }) => {
//   const userId = await checkAuth();
//   if (userId) {
//     throw redirect(308, "/dashboard");
//   }
//   throw redirect(308, "/signin");
// };

export default component$(() => {
  useTask$(() => {
    Amplify.configure(amplifyConfig);
    console.log("Amplify configured");
  });

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
