import { Amplify } from "aws-amplify";

const amplifyConfig = {
  // https://docs.amplify.aws/lib/ssr/q/platform/js/
  ssr: true,

  Auth: {
    // https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#set-up-backend-resources
    // identityPoolId: "us-east-1:1f80a179-6dc7-4336-aa77-f50796cbec29",
    identityPoolId: process.env.AUTH_IDENTITY_POOL_ID,
    // identityPoolId: import.meta.env.AUTH_IDENTITY_POOL_ID,
    // region: "us-east-1",
    region: process.env.AUTH_REGION,
    // region: import.meta.env.AUTH_REGION,
    // identityPoolRegion: "us-east-1",
    identityPoolRegion: process.env.AUTH_IDENTITY_REGION,
    // identityPoolRegion: import.meta.env.AUTH_IDENTITY_REGION,
    // userPoolId: "us-east-1_cWVtfMMdH",
    userPoolId: process.env.AUTH_USER_POOL_ID,
    // userPoolId: import.meta.env.AUTH_USER_POOL_ID,
    // userPoolWebClientId: "4b640h46uom0fahvohdeea1skd",
    userPoolWebClientId: process.env.AUTH_CLIENT_ID,
    // userPoolWebClientId: import.meta.env.AUTH_CLIENT_ID,
  },

  API: {
    // https://docs.amplify.aws/lib/graphqlapi/existing-resources/q/platform/js/#using-a-non-appsync-graphql-server
    // graphql_endpoint: "...",
    // graphql_headers: async () => ({
    //   "x-api-key": "...",
    // }),
  },
};

let a: any = null;
function getAmplify() {
  if (a != null) {
    console.log("Amplify already configured");
    return a;
  }

  Amplify.configure(amplifyConfig);
  console.log("Amplify configured");
  a = Amplify;
  return a;
}
  
const amplifyInstance = getAmplify();

export default amplifyInstance;

