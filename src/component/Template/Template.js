import React from 'react';
import styled from 'styled-components';
import Header from '../Header';

const Template = (props) => {
    return (
        <Container>
            <InnerContainer>
                <Header isLoggedIn={props.isLoggedIn} userId={props.userId} handleLogout={props.handleLogout} />
                <Contents>
                    {props.children}
                </Contents>
            </InnerContainer>
        </Container>
    );
}

export default Template;

const Container = styled.div`
    min-width: 1280px;
    text-align: center;
`

const InnerContainer = styled.div`
    display: inline-block;
    margin: auto;
`

const Contents = styled.div`
    min-height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px 0px;
    text-align: center;
`