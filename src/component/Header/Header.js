import React from 'react';
import styled from 'styled-components';

const Header = () => {
    const navigation = [
        {
            title: '등록된 일거리',
            path: '/'
        },
        {
            title: '일거리 등록',
            path: '/register/work'
        },
        {
            title: '진행 작업 관리',
            path: '/manage/work'
        },
        {
            title: '고객문의',
            path: '/service/customer'
        }
    ]
    return (
        <HeaderContainer>
            <LogoSection>
                티끌
            </LogoSection>
            <NavigationSection>
                {
                    navigation.map(item => 
                        <NavigationItem>
                            <NavigationTitle>
                                {item.title}
                            </NavigationTitle>
                        </NavigationItem>
                    )
                }    
            </NavigationSection>
            <LoginSection>
                <Login>
                    로그인
                </Login>
            </LoginSection>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
    width: 1080px;
    height: 100px;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 20px;
`

const LogoSection = styled.div`
    font-size: 48px;
    color: orange;
`

const LoginSection = styled.div``

const Login = styled.div`
    background-color: orange;
    color: white;
    font-size: 14px;
    text-align: center;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    cursor: pointer;
`

const NavigationSection = styled.div`
    display: flex;
    margin: 10px 50px;
`

const NavigationItem = styled.div`
    width: 150px;
`

const NavigationTitle = styled.span`
    font-size: 18px;
    cursor: pointer;
`