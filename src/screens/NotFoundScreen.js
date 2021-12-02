import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
    return (
        <Container>
            <InnerContainer>
                <Title>
                    티끌
                </Title>
                <Description>
                    이용에 불편을 드려 죄송합니다.
                    <br/>입력하신 페이지의 URL이 변경되었거나 존재하지 않는 페이지입니다.
                    <br/>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
                </Description>
                <HomeButton
                    to='/'
                >
                    홈으로
                </HomeButton>
            </InnerContainer>
        </Container>
    );
}

export default NotFoundScreen;

const Container = styled.div`
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    background-color: white;
`

const InnerContainer = styled.div`
    min-width: 500px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    margin: auto;
    color: orange;
    text-align: center;
`

const Title = styled.div`
    font-size: 48px;
    line-height: 60px;
`

const Description = styled.div`
    font-size: 16px;
    line-height: 24px;
    margin: 20px 0px;
`

const HomeButton = styled(Link)`
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin: auto;
    border-radius: 20px;
    background-color: orange;
    font-size: 16px;
    color: white;
    cursor: pointer;
`
