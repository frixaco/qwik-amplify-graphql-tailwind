import { component$, useTask$ } from "@builder.io/qwik";
import { routeAction$, server$, useNavigate } from "@builder.io/qwik-city";
import { Amplify, Auth, Hub } from "aws-amplify";
import { amplifyConfig } from "~/core/aws-amplify";

export const useSignOut = routeAction$(async ({}) => {});
const signOut = server$(async () => {
  await Auth.signOut();
});

export default component$(() => {
  // const signOut = useSignOut();
  // const nav = useNavigate();

  // useTask$(({ cleanup }) => {
  //   const hubListener = async (data: any) => {
  //     console.log("Hub listener", data.payload.event);

  //     switch (data.payload.event) {
  //       case "tokenRefresh_failure":
  //       case "signOut":
  //         await nav("/signin");
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //   const unsub = Hub.listen("auth", hubListener);
  //   console.log("Hub listener added", unsub);

  //   cleanup(() => {
  //     unsub();
  //   });
  // });

  return (
    <div class="flex flex-col h-screen w-screen items-center justify-center">
      <h1>DASHBOARD</h1>

      <button onClick$={signOut}>SIGN OUT</button>
    </div>
  );
});
