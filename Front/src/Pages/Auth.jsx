import React, {useState} from "react";
import {LoginForm} from "../Components/Login";
import {AccountContext} from "../utils/accountContext";
import {SignupForm} from "../Components/Register";
import {
    BackDrop, backdropVariants,
    BoxContainer,
    expandingTransition,
    HeaderContainer,
    HeaderText, InnerContainer,
    SmallText,
    TopContainer
} from "./components";

const Auth = () => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState(1);

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive(0);
        }, 400);
    };

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive(1);
        }, 400);
    };

    const contextValue = {switchToSignup, switchToSignin};


    return (
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>
                    <BackDrop
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={backdropVariants}
                        transition={expandingTransition}
                    />
                    <HeaderContainer>
                        <HeaderText>{active ? 'Welcome' : 'Create'}</HeaderText>
                        <HeaderText>{active ? 'Back' : 'Account'}</HeaderText>
                        <SmallText>{active ? 'Please sign-in to continue!' : 'Please sign-up to continue!'}</SmallText>
                    </HeaderContainer>
                </TopContainer>
                <InnerContainer>
                    {active ? <LoginForm/> : <SignupForm/>}
                </InnerContainer>
            </BoxContainer>
        </AccountContext.Provider>
    )
}

export default Auth
