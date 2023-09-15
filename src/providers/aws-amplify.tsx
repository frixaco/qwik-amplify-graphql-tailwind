import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  // https://docs.amplify.aws/lib/ssr/q/platform/js/
  ssr: true,

  Auth: {
    // https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#set-up-backend-resources
    identityPoolId: 'us-east-1:1f80a179-6dc7-4336-aa77-f50796cbec29',
    region: 'us-east-1',
    identityPoolRegion: 'us-east-1',
    userPoolId: 'us-east-1_cWVtfMMdH',
    userPoolWebClientId: '4b640h46uom0fahvohdeea1skd',
  },

  API: {
    // https://docs.amplify.aws/lib/graphqlapi/existing-resources/q/platform/js/#using-a-non-appsync-graphql-server
    // graphql_endpoint: "...",
    // graphql_headers: async () => ({
    //   "x-api-key": "...",
    // }),
  },
};

Amplify.configure(amplifyConfig);
