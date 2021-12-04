import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Template from '../component/Template';
import { actionCreators as userAction } from "../redux/modules/users";
import WorkTemplate from '../component/WorkTemplate';
import RequestWorkItem from '../component/common/RequestWorkItem';
import getEmployerWorkList from '../api/getEmployerWorkList';
import searchDueDate from '../utils/searchDueDate';
import searchCategoryName from '../utils/searchCategoryName';
import Modal from '../component/Modal';
import SimpleSlider from '../component/common/SimpleSlider';

const ManageScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
    const userId = useSelector((store) => store.users.id);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [applyWorkID, setApplyWorkID] = useState('');
    const [registeredList, setRegisteredList] = useState([]); //work status 0(작업 진행전)의 작업 목록
    const [workingList, setWorkingList] = useState([]); //work status 1(작업 진행중)의 작업 목록
    const [workedList, setWorkedList] = useState([]); //work status 2(작업 완료)의 작업 목록
    const [requestList, setRequesetList] = useState([]); //work status 3(작업 신청 들어온 상태)의 작업 목록
    const [evaluationList, setEvaluationList] = useState([]); //work status 4(작업 완료 검토 요청)의 작업 목록
    const [completedList, setCompletedList] = useState([]); //work status 5(보수지급완료)의 작업 목록
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
    const handleAccept = (workID, title) => {
        setModalIsOpen(true);
        setApplyWorkID(workID);
        setModalTitle(title);
    };
    useEffect(() => {
        const id = sessionStorage.getItem('id');
        const getRegisteredWork = async () => {
            console.log("step1 getRegisteredWork")
            const result = await getEmployerWorkList();
            console.log("step2 getRegisteredWork")
            if (result) {
                console.log("step3 getRegisteredWork")
                setRegisteredList(result.filter(item => item.workStatus === 0));
                setWorkingList(result.filter(item => item.workStatus === 1));
                setWorkedList(result.filter(item => item.workStatus === 2));
                setRequesetList(result.filter(item => item.workStatus === 3));
                setEvaluationList(result.filter(item => item.workStatus === 4));
                setCompletedList(result.filter(item => item.workStatus === 5));
                // 전체 목록 페이지로 이동 추가
            } else {
                console.log("step4 getRegisteredWork")
                alert('등록한 일거리 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
            }
        }
        if (id) {
            dispatch(userAction.isLogin(id));
            id === 'employer1234' && getRegisteredWork();
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
                <SimpleSlider>
                    {requestList.map(item => {
                        return (
                            <RequestWorkItem
                                title={item.title}
                                description={item.description}
                                pay={item.pay}
                                dueDate={searchDueDate(item.dueDate)} 
                                categoryName={searchCategoryName(item.category)}
                                nickName={'김철수'}
                                rejectHandler={() => alert('신청 거절 API 연결')}
                                acceptHandler={() => handleAccept(item.workID, item.title)}
                            />                        
                        )
                    })}
                </SimpleSlider>
            </WorkTemplate>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                title={modalTitle}
                subtitle={`에 대한 김철수님 지원을 수락하시겠습니까?`}
                description="수락시 보수 지급을 위한 결제가 진행됩니다."
                acceptText="수락"
                cancleHandler={() => setModalIsOpen(false)}
                acceptHandler={() => alert('작업 신청 수락API 연결하기')}
            />
        </Template>
    );
}

export default ManageScreen;

