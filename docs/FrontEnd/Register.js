import { account, ID } from './appwrite';

document.querySelector("form#register")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.querySelector("input#fname")?.value;
    const lastName = document.querySelector("input#lname")?.value;
    const name = firstName + " " + lastName;
    const email = document.querySelector("input#email")?.value;
    const password = document.querySelector("input#password")?.value;
    try {
        const response = await account.create(ID.unique(), email, password, (firstName || lastName) ? name : undefined);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
});
