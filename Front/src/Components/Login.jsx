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

export function LoginForm(props) {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const history = useHistory()
    const {switchToSignup} = useContext(AccountContext);
    const [passError, setPassError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await API.post('/login', user);
            console.log(response)
            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('profile', JSON.stringify(response.data))
                await history.push('/home')
            } else {
                setPassError(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                <Input type="text" placeholder="Email" onChange={(e) => {
                    setUser({...user, email: e.target.value})
                }}/>
                <Input type="password" placeholder="Password" onChange={(e) => {
                    setUser({...user, password: e.target.value})
                }}/>
                <SubmitButton type="submit">Signin</SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin={10}/>
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em"/>
            <Marginer direction="vertical" margin="1em"/>
            {passError && <p>{passError}</p>}
            <MutedLink href="#">
                Don't have an account?{" "}
                <BoldLink onClick={switchToSignup}>
                    Signup
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}