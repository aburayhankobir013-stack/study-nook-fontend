import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("study-nook-userDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  // Email and password authentication
  emailAndPassword: {
    enabled: true,
  },
  // Google authentication
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
});
