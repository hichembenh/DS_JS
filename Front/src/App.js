import styled from "styled-components";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const isLogin = () => {
    return !!localStorage.getItem('profile');
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
    return (
        <AppContainer>
            <Router>
                <Switch>
                    <Route path={'/' || '/home'} render={() => (
                        isLogin() ?
                            <Home/>
                            : <Auth/>
                    )}/> </Switch>
            </Router>
        </AppContainer>
    );
}

export default App;

