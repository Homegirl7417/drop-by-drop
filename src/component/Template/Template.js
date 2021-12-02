import React from 'react';
import styled from 'styled-components';
import Header from '../Header';

const Template = (props) => {
    return (
        <Container>
            <InnerContainer>
                <Header/>
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

`