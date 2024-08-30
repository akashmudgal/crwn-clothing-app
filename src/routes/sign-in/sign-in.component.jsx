import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase.utils";

const SignIn = ()=>{
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>Signin with Google Popup</button>
        </div>
    )
}

export default SignIn;