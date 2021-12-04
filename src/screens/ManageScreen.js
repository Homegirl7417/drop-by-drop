import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Template from '../component/Template';
import { actionCreators as userAction } from "../redux/modules/users";
import WorkTemplate from '../component/WorkTemplate';
import RegisteredWorkItem from '../component/common/RegisteredWorkItem';
import getEmployerWorkList from '../api/getEmployerWorkList';
import searchDueDate from '../utils/searchDueDate';
import searchCategoryName from '../utils/searchCategoryName';

const ManageScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
    const userId = useSelector((store) => store.users.id);
    const [registeredList, setRegisteredList] = useState([]);
    const [workingList, setWorkingList] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const handleLogout = async () => {
        try {
            await dispatch(userAction.logout());
            window.history.pushState('', '', '/');
            window.location.reload();
            alert('로그아웃 되었습니다.')
        } catch(e) {
            alert('로그아웃 중 오류가 발생했습니다. 화면을 종료 후 다시 실행해주세요.')
        }
    }
    useEffect(() => {
        const id = sessionStorage.getItem('id');
        const getRegisteredWork = async () => {
            console.log("step1 getRegisteredWork")
            const result = await getEmployerWorkList();
            console.log("step2 getRegisteredWork")
            if (result) {
                console.log("step3 getRegisteredWork")
                setRegisteredList(result.filter(item => item.workStatus === 0 || item.workStatus === 3));
                setWorkingList(result.filter(item => item.workStatus === 1));
                setCompletedList(result.filter(item => item.workStatus === 2));
                console.log(result);
                // 전체 목록 페이지로 이동 추가
            } else {
                console.log("step4 getRegisteredWork")
                alert('등록한 일거리 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
            }
        }
        if (id) {
            dispatch(userAction.isLogin(id));
            // id === 'employer1234' && getRegisteredWork();
        }
    }, []);
    return (
        <Template
            isLoggedIn={isLoggedIn}
            userId={userId}
            handleLogout={handleLogout}
        >
            <WorkTemplate
                title="등록한 일거리"
                isBorder={false}       
            >
                <RegisteredWorkItem
                    title={'테스트 작업'}
                    description={'테스트 작업 설명'}
                    pay={44444}
                    dueDate={'2021-12-28'} 
                    categoryName={'라벨링'}
                    nickName={'김철수'}
                />   
                {/* {registeredList.map(item => {
                    return (
                        <RegisteredWorkItem
                            title={item.title}
                            description={item.description}
                            pay={item.pay}
                            dueDate={searchDueDate(item.dueDate)} 
                            categoryName={searchCategoryName(item.category)}
                            nickName={'김철수'}
                        />                        
                    )
                })} */}
            </WorkTemplate>
        </Template>
    );
}

export default ManageScreen;

