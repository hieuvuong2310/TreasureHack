import { account, ID, storage } from './appwrite';
import { Permission, Role } from 'appwrite';

const baseURL = "http://localhost:5000";
const fileNameField = document.querySelector(".fileName");
const ids = {
    "whitepaper.pdf": "644cbcc58351e6225d30"
};

const fileInput = document.querySelector("input[type=file]");
fileInput?.addEventListener("change", function () {
    if (this.files && this.files[0] && fileNameField) {
        fileNameField.innerHTML = this.files[0].name;
    }
});

document.querySelector("form.up")?.addEventListener("submit", (e) => {
    e.preventDefault();
});

document.querySelector("#summary")?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (fileInput?.files.length > 0) {
        const fileName = fileInput.files[0].name;
        if (!ids[fileName]) {
        const response = await storage.createFile(
            "644c98b56b824cdc5879",
            ID.unique(),
            fileInput.files[0],
            [
                Permission.write(Role.any()),
                Permission.read(Role.any()),
                Permission.update(Role.any()),
                Permission.delete(Role.any()),
            ]);
            ids[fileName] = response.$id;
        }
        const id = ids[fileName];
        console.log(id);
        const response = await fetch(`${baseURL}/getSummary`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id
            })
        });
        const data = await response.json();
        console.log(data);
    } else {
        console.log("No file selected")
    }
    return false;
});

function uploadFile(file, fileName) {


}

function registerUser(email, password, userName) {
    let promise = account.create(ID.unique(), email, password, userName);
    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
}

function loginUser(email, password) {
    let promise = account.createEmailSession(email, password);
    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
}

