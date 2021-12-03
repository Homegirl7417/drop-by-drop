import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import WorkRegisterItem from '../component/common/WorkRegisterItem';
import { Link } from 'react-router-dom';
import { actionCreators as userAction } from "../redux/modules/users";

const LoginScreen = ( ) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleId = event => {
        const {
          target: { value },
        } = event;
        setId(value);
    };
    const handlePassword = event => {
        const {
          target: { value },
        } = event;
        setPassword(value);
    };
    const handleLogin = () => {
        if (id === 'employer1234' && password === 'dkwneo1234') {
            try {
                dispatch(userAction.login(id));
            } catch(e) {
                alert('로그인 중 오류가 발생했습니다.\n다시 로그인해주시기 바랍니다.');
            }
            alert('employer1234님 로그인에 성공하셨습니다.');
            window.history.pushState('', '', '/');
            window.location.reload();
        }
        else if (id === 'employee1234' && password === 'dkwneo1234') {
            try {
                dispatch(userAction.login(id));
            } catch(e) {
                alert('로그인 중 오류가 발생했습니다.\n다시 로그인해주시기 바랍니다.');
            }
            alert('employee1234님 로그인에 성공하셨습니다.');
            window.history.pushState('', '', '/');
            window.location.reload();
        }
        else {
            alert('올바르지 않은 아이디 또는 패스워드입니다.\n로그인 정보를 다시 확인해주세요.');
        }
    }
    return (
        <Container>
            <InnerContainer>
                <LogoSection>
                    <Title>티끌</Title>
                    &nbsp;&nbsp;
                    <LoginText>로그인</LoginText>
                </LogoSection>
                <LoginSection>
                    <WorkRegisterItem 
                        isTitle={false} 
                        description={id} 
                        placeholder="아이디" 
                        kind="text" 
                        onChange={handleId}
                    />
                    <WorkRegisterItem 
                        isTitle={false} 
                        description={password} 
                        placeholder="비밀번호" 
                        kind="text" 
                        onChange={handlePassword}
                    />
                </LoginSection>
                <ButtonSection>
                    <LoginButtonSection>
                        <LoginButton onClick={handleLogin}>
                            로그인
                        </LoginButton>
                    </LoginButtonSection>
                    <HomeButtonSection>
                        <HomeButton
                            to='/'
                        >
                            홈으로
                        </HomeButton>
                    </HomeButtonSection>
                </ButtonSection>
            </InnerContainer>
        </Container>
    );
}

export default LoginScreen;

const Container = styled.div`
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    background-color: orange;
`

const InnerContainer = styled.div`
    min-width: 600px;
    height: 400px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    margin: auto;
    text-align: center;
    background-color: white;
    border-radius: 20px;
    padding: 30px;
`
const LogoSection = styled.div`
    height: 40px;
    justify-content: center;
    align-items: center;
    display: flex;
`
const LoginSection = styled.div``

const ButtonSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.div`
    font-size: 28px;
    font-weight: bold;
    color: orange;
    text-align: center;
`

const LoginText = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: gray;
    text-align: center;
`

const LoginButtonSection = styled.div`
    margin: auto;
`

const LoginButton = styled.div`
    width: 140px;
    height: 40px;
    line-height: 40px;
    background-color: orange;
    color: white;
    font-size: 24px;
    cursor: pointer;
    border-radius: 10px;
`

const HomeButtonSection = styled.div`
    padding-top: 20px;
    height: 30px;
`

const HomeButton = styled(Link)`
    color: gray;
    font-size: 16px;
    cursor: pointer;
`