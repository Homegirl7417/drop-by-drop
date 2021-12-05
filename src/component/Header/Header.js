import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn=false, userId='', handleLogout }) => {
    const navigation = [
        {   
            index: 0,
            title: '등록된 일거리',
            path: '/'
        },
        {
            index: 1,
            title: '일거리 등록',
            path: '/register/work',
            func: () => alert('일거리 등록은 Employer만 이용할 수 있습니다.\nEmployer로 로그인 후 이용해주세요.')
        },
        {
            index: 2,
            title: '진행 작업 관리',
            path: '/manage/work',
            func: () => alert('진행 작업 관리는 로그인 후 이용하실 수 있습니다.')
        },
        {
            index: 3,
            title: '고객문의',
            func: () => alert('티끌 시스템 및 서비스 이용에 관련해서 문의사항이 있으신가요?\n문의사항은 hk7417@ajou.ac.kr로 부탁드립니다.')
        }
    ];
    return (
        <HeaderContainer>
            <LogoSection>
                <LogoTitle>
                    티끌
                </LogoTitle>
            </LogoSection>
            <NavigationSection>
                {
                    navigation.map(item => 
                        item.title === '고객문의' || (item.title === '진행 작업 관리' && !isLoggedIn)
                        ?  <NavigationAlert onClick={item.func}>
                            {item.title}
                        </NavigationAlert>
                        : item.title === '일거리 등록' && userId !== 'employer1234'
                          ? <NavigationAlert onClick={item.func}>
                              {item.title}
                          </NavigationAlert>
                          : <NavigationItem>
                            <NavigationTitle
                                to={item.path}
                                index={item.index}
                            >
                                {item.title}
                            </NavigationTitle>
                        </NavigationItem>
                        
                    )
                }   
            </NavigationSection>
            <LoginSection isLoggedIn={isLoggedIn} onClick={handleLogout}>
                {
                    isLoggedIn
                    ? <userIdLogin>
                        {userId}님 | 로그아웃
                    </userIdLogin>
                    : <Login to='/login'>
                        로그인
                    </Login>
                }
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
    padding: 20px 20px;
`

const LogoSection = styled.div``

const LogoTitle = styled.span`
    font-size: 36px;
    color: orange;
`

const LoginSection = styled.div`
    width: ${props => props.isLoggedIn ? '200px' : '100px'};
    height: 30px;
    background-color: orange;
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    cursor: pointer;
`

const userIdLogin = styled.div``

const Login = styled.div``

const NavigationSection = styled.div`
    display: flex;
    margin: 0px 50px;
`

const NavigationItem = styled.div`
    width: 150px;
`

const NavigationAlert = styled.div`
    width: 150px;
    font-size: 18px;
    cursor: pointer;
`

const NavigationTitle = styled(Link)`
    font-size: 18px;
    cursor: pointer;
`