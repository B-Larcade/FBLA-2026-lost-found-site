// pb-config.js
const PB_URL = "https://spheroidal-jimmy-nonrepressible.ngrok-free.dev";
const pb = new PocketBase(PB_URL);

console.log('PocketBase URL set to:', PB_URL);  // add this temporarily

pb.authStore.onChange(() => {
    console.log('Auth changed →', pb.authStore.isValid ? 'logged in' : 'logged out');
});