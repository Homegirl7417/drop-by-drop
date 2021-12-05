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
import getCheckList from '../api/getCheckList';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
    const userId = useSelector((store) => store.users.id);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [applyWorkID, setApplyWorkID] = useState('');
    const [workList, setWorkList] = useState([]);
    const requestWork = async () => {
        const result = await putRequestWork(applyWorkID);
        if (result) {
            setModalIsOpen(false);
            alert('작업이 신청되었습니다.');
            window.history.pushState('', '', '/');
            window.location.reload();
        } else {
            setModalIsOpen(false);
            alert('작업 신청 중 오류가 발생했습니다. \n잠시 후 다시 시도해주시기 바랍니다.');
        }
    }
    const applyWork = (workID, title) => {
        if (isLoggedIn && userId === 'employee1234') {
            setApplyWorkID(workID);
            setModalTitle(title);
            setModalIsOpen(true);
        } else {
            alert("작업 신청을 원하신다면 Employee로 로그인해주세요.")
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
            const result = await getAllWorkList();
            if (result) {
                return result.filter(item => item.workStatus === 0);
            } else {
                alert('작업 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
                return false;
            }
        }
        const getAllWorkWithCheckList = async () => {
            setIsLoading(false);      
            await Promise.all([getAllList()]).then(async (value) => {
                const [json] = value;
                await Promise.all(
                    json.map(async item => {
                    const checkList = await getCheckList(item.workID);
                    return { ...item, checklist: checkList } 
                })).then((response) => {
                    setWorkList(response);
                    setIsLoading(true);       
                }).catch((e) => {
                    alert('등록된 일거리 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
                    setIsLoading(true);                    
                })
            })
        }
        if (id) {
            dispatch(userAction.isLogin(id));
        }
        getAllWorkWithCheckList();
    }, []);
    return (
        isLoading &&
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
                                        isCheck={false}
                                        title={item.title}
                                        description={item.description}
                                        pay={item.pay}
                                        dueDate={searchDueDate(item.dueDate)} 
                                        categoryName={searchCategoryName(item.category)}
                                        checkList={item.checklist}
                                        onClick={() => applyWork(item.workID, item.title)}
                                        button="작업 신청"
                                    />
                                )
                            })
                        }
                    </ListGrid>
                </WorkTemplate>
            <Modal
                isOpen={modalIsOpen}
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