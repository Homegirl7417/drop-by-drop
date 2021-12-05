import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '../HomeScreen';
import ManageScreen from '../ManageScreen';
import RegisterScreen from '../RegisterScreen';
import LoginScreen from '../LoginScreen';

const App = () => {
    return (
        <Container>
            <GlobalStyle/>
            <Routes>
                <Route path='*' element={<HomeScreen/>} />
                <Route exact path='/register/work' element={<RegisterScreen/>} />
                <Route exact path='/manage/work' element={<ManageScreen/>} />
                <Route exact path='/login' element={<LoginScreen/>} />
            </Routes>
        </Container>
    );
}

export default App;

const GlobalStyle = createGlobalStyle`
    *, input, button {
        font-family: 'Noto Sans KR', sans-serif;
        font-style: normal;
        font-size: 16px;
    }
	body {
        font-family: 'Noto Sans KR', sans-serif;
        font-style: normal;
        font-size: 16px;
        line-height: 0px;
		padding: 0;
        margin: 0;
        white-space: pre-line;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    li {
        list-style-type : none
    }
    ul {
        margin-block-start: 0px;
        margin-block-end: 0px;
        padding-inline-start: 0px;
    }
`;

const Container = styled.div``;