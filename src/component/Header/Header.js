import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [currentRoute, setCurrentRoute] = useState(0);
    const [path, setPath] = useState('/'); 
    // const { pathname } = useLocation();
    // console.log("hell" + pathname);
    // setPath(pathname);
    const navigation = [
        {   
            index: 0,
            title: '등록된 일거리',
            path: '/'
        },
        {
            index: 1,
            title: '일거리 등록',
            path: '/register/work'
        },
        {
            index: 2,
            title: '진행 작업 관리',
            path: '/manage/work',
            func: () => alert('시스템 준비중입니다.')
        },
        {
            index: 3,
            title: '고객문의',
            func: () => alert('티끌 시스템 및 서비스 이용에 관련해서 문의사항이 있으신가요?\n문의사항은 hk7417@ajou.ac.kr로 부탁드립니다.')
        }
    ];
    useEffect(() => {
        // console.log('hi2222'+path);
        // const detectIndex = (index) => {
        //     let currentIndex = 0;
        //     switch (index){
        //         case '/': 
        //             currentIndex = 0;
        //             break; 
        //         case '/register/work':
        //             currentIndex = 1;
        //             break;
        //         case '/manage/work':
        //             currentIndex = 2;
        //             break;
        //         default:
        //             currentIndex = 100;
        //             break; 
        //     }
        //     setCurrentRoute(currentIndex);
        // }
        // console.log('hi2222'+path);
        // detectIndex(path);
    }, []);
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
                        item.title === '고객문의' || item.title === '진행 작업 관리' 
                        ?  <NavigationAlert onClick={item.func}>
                            {item.title}
                        </NavigationAlert>
                        : <NavigationItem>
                            <NavigationTitle
                                to={item.path}
                                index={item.index}
                                current={currentRoute}
                            >
                                {item.title}
                            </NavigationTitle>
                        </NavigationItem>
                    )
                }   
            </NavigationSection>
            <LoginSection>
                <Login
                    to='/login'
                >
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
    padding: 20px 20px;
`

const LogoSection = styled.div``

const LogoTitle = styled.span`
    font-size: 36px;
    color: orange;
`

const LoginSection = styled.div``

const Login = styled(Link)`
    display: block;
    background-color: orange;
    color: white;
    font-size: 14px;
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    cursor: pointer;
`

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

// border-bottom: ${props => props.index === props.current ? '3px solid orange' : 'none'};
// color: ${props => props.index === props.current ? 'orange' : 'black'};
const NavigationTitle = styled(Link)`
    font-size: 18px;
    cursor: pointer;
`