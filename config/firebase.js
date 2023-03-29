import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_Firebase_API_Key}`,
	authDomain: `${process.env.NEXT_PUBLIC_Auth_Domain}`,
	databaseURL: `${process.env.NEXT_PUBLIC_Database_URL}`,
	projectId: `${process.env.NEXT_PUBLIC_Project_Id}`,
	storageBucket: `${process.env.NEXT_PUBLIC_Storage_Bucket}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_Message_Sender_Id}`,
	appId: `${process.env.NEXT_PUBLIC_App_Id}`,
	measurementId: `${process.env.NEXT_PUBLIC_Measurement_Id}`
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };