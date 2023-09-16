import { component$, useTask$ } from "@builder.io/qwik";
import { type RequestHandler, routeAction$, useNavigate } from "@builder.io/qwik-city";
import amplifyInstance from "~/core/aws-amplify";

export const onGet: RequestHandler = async ({redirect}) => {
  console.log('onGet dashboard /')
  try {
    const user = await amplifyInstance.Auth.currentAuthenticatedUser() as any;
    console.log('user', user)
    const userAttributes = await amplifyInstance.Auth.userAttributes(user);
    const userId = userAttributes.find((attr: any) => attr.Name === "sub")?.Value;

    if (!userId) {
      throw redirect(308, "/signin");
    }
  } catch (error) {
    console.log('error', error)
    throw redirect(308, "/signin");
  }
}

export const useSignOut = routeAction$(async () => {
  try {
    console.log("sign out");
    await amplifyInstance.Auth.signOut();
    return {
      status: "success"
    }
  } catch (error) {
    return {
      status: "error"
    }
  }
})

export default component$(() => {
  const nav = useNavigate();
  const signOut = useSignOut();

  useTask$(({ track }) => {
    track(() => signOut.value);

    if (signOut.value?.status === "success") {
      nav("/signin");
    }
  });

  return (
    <div class="flex flex-col h-screen w-screen items-center justify-center">
      <h1>DASHBOARD</h1>

      <button onClick$={() => signOut.submit()}>SIGN OUT</button>
    </div>
  );
});
