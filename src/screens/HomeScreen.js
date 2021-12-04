import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Template from '../component/Template';
import WorkListItem from '../component/common/WorkListItem';
import getAllWorkList from '../api/getAllWorkList';
import WorkTemplate from '../component/WorkTemplate';
import { actionCreators as userAction } from "../redux/modules/users";
import putRequestWork from '../api/putRequestWork';
import Modal from '../component/Modal';
import searchDueDate from '../utils/searchDueDate';
import searchCategoryName from '../utils/searchCategoryName';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
    const userId = useSelector((store) => store.users.id);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [applyWorkID, setApplyWorkID] = useState('');
    const [workList, setWorkList] = useState([]);
    const requestWork = async () => {
        console.log("step1")
        const result = await putRequestWork(applyWorkID);
        console.log("step2")
        if (result) {
            console.log("step3");
            setModalIsOpen(false);
            alert('작업이 신청되었습니다.');
        } else {
            console.log("step4");
            setModalIsOpen(false);
            alert('작업 신청 중 오류가 발생했습니다. \n잠시 후 다시 시도해주시기 바랍니다.');
        }
    }
    const applyWork = (workID, title) => {
        if (isLoggedIn && userId === 'employee1234') {
            setApplyWorkID(workID);
            setModalTitle(title);
            setModalIsOpen(true);
            // if(window.confirm('해당 작업을 신청하시겠습니까?') === true) {
            //     requestWork(workID);
            // } 여기부터 다시
        } else {
            alert("작업 상세정보는 준비중에 있습니다.\n작업 신청을 원하신다면 Employee로 로그인해주세요.")
        }
    }
    const handleLogout = () => {
        if (isLoggedIn) {
            try {
                dispatch(userAction.logout());
            } catch(e) {
                alert('로그아웃 중 오류가 발생했습니다. 화면을 종료 후 다시 실행해주세요.')
            }
            alert('로그아웃 되었습니다.');
        } else {
            window.history.pushState('', '', '/login');
            window.location.reload();
        }
    }
    useEffect(() => {
        const id = sessionStorage.getItem('id');
        const getAllList = async () => {
            console.log("step1 getAllList")
            const result = await getAllWorkList();
            console.log("step2 getAllList")
            if (result) {
                console.log("step3 getAllList")
                setWorkList(result);
                console.log(result);
                // 전체 목록 페이지로 이동 추가
            } else {
                console.log("step4 getAllList")
                alert('작업 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
            }
        }
        getAllList(); 
        if (id) {
            dispatch(userAction.isLogin(id));
        }
    }, []);
    return (
        <Template
            isLoggedIn={isLoggedIn}
            userId={userId}
            handleLogout={handleLogout}
        >
            <WorkTemplate
                title="등록된 일거리"
                isBorder={false}
            >
                <ListGrid>
                    {
                        workList.map(item => {
                            return (
                                <WorkListItem
                                    title={item.title}
                                    description={item.description}
                                    pay={item.pay}
                                    dueDate={searchDueDate(item.dueDate)} 
                                    categoryName={searchCategoryName(item.category)}
                                    onClick={() => applyWork(item.workID, item.title)}
                                />
                            )
                        })
                    }
                </ListGrid>
            </WorkTemplate>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                title={modalTitle}
                subtitle="작업을 신청하시겠습니까?"
                acceptText="신청"
                cancleHandler={() => setModalIsOpen(false)}
                acceptHandler={requestWork}
            />
        </Template>
    );
}

export default HomeScreen;

const ListGrid = styled.div`
    display: grid;
    flex-directions: row;
    grid-template-columns: repeat(3, 320px)};
`