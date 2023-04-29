import { account } from './appwrite';

document.querySelector("form#login")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("input#email")?.value;
    const password = document.querySelector("input#password")?.value;
    try {
        const response = await account.createEmailSession(email, password);
        console.log(response);
    } catch (error) {
        console.error(error)
    }
})
