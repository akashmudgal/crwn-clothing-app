import { initializeApp } from 'firebase/app';
import {
        getAuth,
        signInWithPopup,
        GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVAFtSAOPPCCX5RljmEivWAxwiJYBEcWI",
    authDomain: "crwn-clothing-c08cc.firebaseapp.com",
    projectId: "crwn-clothing-c08cc",
    storageBucket: "crwn-clothing-c08cc.appspot.com",
    messagingSenderId: "285825547325",
    appId: "1:285825547325:web:a0cccc700999735c2bfe54"
};


// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,"users",userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch(error){
            console.log("Error creating the user: ",error.message);
        }
    }
    
    return userDocRef;
}