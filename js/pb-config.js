// pb-config.js
const PB_URL = "https://spheroidal-jimmy-nonrepressible.ngrok-free.dev";
const pb = new PocketBase(PB_URL);
//This is for the CORS blocking issues, and why are there so many ways for local profile hosting to fail?
pb.beforeSend = (url, options) => {
    options.headers = options.headers || {};
    options.headers['ngrok-skip-browser-warning'] = 'true';
    return { url, options };
};

console.log('PocketBase URL set to:', PB_URL);
pb.authStore.onChange(() => {
    console.log('Auth changed →', pb.authStore.isValid ? 'logged in' : 'logged out');
});
if (!pb.authStore.isValid) {
    // The SDK normally does this automatically, but forcing helps in race conditions
    const saved = localStorage.getItem('pocketbase_auth');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            pb.authStore.save(data.token, data.record);
        } catch (e) { }
    }
}
console.log('PocketBase config loading...');
