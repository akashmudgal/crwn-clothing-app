import { useState } from "react";
import { signInUserWithEmailAndPassword,signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
    email: "",
    password: ""
}


const SignInForm = ()=> {
    const navigate = useNavigate();
    const [formFields,setFormFields] = useState(defaultFormFields);

    const {email,password} = formFields;

    const redirectToHomePage = ()=>{
        navigate("/");
    }
    const signInWithGoogle = async ()=> {
        try{
            const {user} = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
            redirectToHomePage();
        }
        catch{
            alert("Failed signing in with Google.");
        }
    }
    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInUserWithEmailAndPassword(email,password);
            redirectToHomePage();
        }
        catch{
            alert("Failed signing in: Email or Password is Incorrect."); 
            resetFormFields();
        }
        
        
    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button 
                        type="submit"
                    >
                        Sign In
                    </Button>

                    <Button
                        type="button" 
                        buttonType="google" 
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;