const amplifyConfig = {
  // https://docs.amplify.aws/lib/ssr/q/platform/js/
  ssr: true,

  Auth: {
    // https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#set-up-backend-resources
    // identityPoolId: "us-east-1:1f80a179-6dc7-4336-aa77-f50796cbec29",
    identityPoolId: import.meta.AUTH_IDENTITY_POOL_ID,
    // region: "us-east-1",
    region: import.meta.AUTH_REGION,
    // identityPoolRegion: "us-east-1",
    identityPoolRegion: import.meta.AUTH_IDENTITY_REGION,
    // userPoolId: "us-east-1_cWVtfMMdH",
    userPoolId: import.meta.AUTH_USER_POOL_ID,
    // userPoolWebClientId: "4b640h46uom0fahvohdeea1skd",
    userPoolWebClientId: import.meta.AUTH_CLIENT_ID,
  },

  API: {
    // https://docs.amplify.aws/lib/graphqlapi/existing-resources/q/platform/js/#using-a-non-appsync-graphql-server
    // graphql_endpoint: "...",
    // graphql_headers: async () => ({
    //   "x-api-key": "...",
    // }),
  },
};

export { amplifyConfig };
