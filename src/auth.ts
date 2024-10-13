import { SvelteKitAuth } from "@auth/sveltekit";
 import GitHub from '@auth/sveltekit/providers/github';
 import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/static/private';

 export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {

     const getEnv = (key) => {
         if (event.platform?.env.CF_PAGES === 'true') {
             return event.platform?.env[key];
         } else {
             switch(key) {
                 case 'GITHUB_ID': return GITHUB_ID;
                 case 'GITHUB_SECRET': return GITHUB_SECRET;
                 case 'AUTH_SECRET': return AUTH_SECRET;
                 default: return undefined;
             }
         }
     };

     const authOptions = {
         providers: [
             GitHub({
                 clientId: getEnv('GITHUB_ID'),
                 clientSecret: getEnv('GITHUB_SECRET')
             })
         ],
         secret: getEnv('AUTH_SECRET'),
         trustHost: true,
     };

     return authOptions;
 });