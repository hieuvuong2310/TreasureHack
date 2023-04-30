import { Client, Account, ID, Storage } from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('TreasureHacks');

export {client, ID};
export const account = new Account(client);
export const storage = new Storage(client);
