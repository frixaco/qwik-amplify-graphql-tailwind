import { component$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { routeAction$, server$, useNavigate } from "@builder.io/qwik-city";
import { Amplify, Auth, Hub } from "aws-amplify";
import { amplifyConfig } from "~/core/aws-amplify";

const signOut = server$(async () => {
  await Auth.signOut();
});

export default component$(() => {
  const nav = useNavigate();

  useVisibleTask$(({ cleanup }) => {
    const hubListener = (data: any) => {
      switch (data.payload.event) {
        case "signOut":
          nav("/");
          break;
      }
    };

    const unsub = Hub.listen("auth", hubListener);
    cleanup(() => unsub());
  });

  return (
    <div class="flex flex-col h-screen w-screen items-center justify-center">
      <h1>DASHBOARD</h1>

      <button onClick$={signOut}>SIGN OUT</button>
    </div>
  );
});
