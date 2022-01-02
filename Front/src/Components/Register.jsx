import React, {useContext, useState} from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./components";
import {Marginer} from "./marginer";
import {AccountContext} from "../utils/accountContext";
import {useHistory} from "react-router-dom";
import {API} from "../utils/API";

export function SignupForm() {
    const {switchToSignin} = useContext(AccountContext);
    const [user, setUser] = useState({
        name: '',
        numTel: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [passError,setPassError] = useState(false)
    let history = useHistory()
    const handleSubmit = async () => {
        if(user.password === user.confirmPassword) {
            try {
                const response = await API.post('/register', user);
                localStorage.setItem('profile', JSON.stringify(response.data))
                await history.push('/home')
            } catch (error) {
                console.log("here")
                console.log(error);
            }
        } else {
            setPassError(true)
        }
    }

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                <Input type="text" placeholder="Full Name" onChange={(e) => {
                    setUser({...user, name: e.target.value})
                }}/>
                <Input type="email" placeholder="Email" onChange={(e) => {
                    setUser({...user, email: e.target.value})
                }}/>
                <Input type="number" placeholder="Phone number" onChange={(e) => {
                    setUser({...user, numTel: e.target.value})
                }}/>
                <Input type="password" placeholder="Password" onChange={(e) => {
                    setUser({...user, password: e.target.value})
                }}/>
                <Input type="password" placeholder="Confirm Password" onChange={(e) => {
                    setUser({...user, confirmPassword: e.target.value})
                }}/>
                {passError && <p style={{color:"red"}}>passwords don't match</p>}
                <Marginer direction="vertical" margin={10}/>
                <SubmitButton type="submit">Signup</SubmitButton>
            </FormContainer>

            <Marginer direction="vertical" margin="1em"/>
            <MutedLink href="#">
                Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>
                    Signin
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}