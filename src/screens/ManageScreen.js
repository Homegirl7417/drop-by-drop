import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Template from '../component/Template';
import { actionCreators as userAction } from "../redux/modules/users";
import WorkTemplate from '../component/WorkTemplate';
import RequestWorkItem from '../component/common/RequestWorkItem';
import getEmployerWorkList from '../api/getEmployerWorkList';
import getEmployeeWorkList from '../api/getEmployeeWorkList';
import searchDueDate from '../utils/searchDueDate';
import searchCategoryName from '../utils/searchCategoryName';
import Modal from '../component/Modal';
import SimpleSlider from '../component/common/SimpleSlider';
import MultiSlider from '../component/common/MultiSlider';
import putRejectWork from '../api/putRejectWork';
import putAcceptWork from '../api/putAcceptWork';
import WorkListItem from '../component/common/WorkListItem';
import putLookOverRequest from '../api/putLookOverRequest';
import putLookOverAccept from '../api/putLookOverAccept';
import putLookOverReject from '../api/putLookOverReject';
import putPayment from  '../api/putPayment';
import getCheckList from '../api/getCheckList';
import putCheckStep from '../api/putCheckStep';

const ManageScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
    const userId = useSelector((store) => store.users.id);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false); // 지원수락 모달
    const [requestModalIsOpen, setRequestModalIsOpen] = useState(false); // 작업검토신청 모달
    const [acceptModalIsOpen, setAcceptModalIsOpen] = useState(false); // 작업검토완료 모달
    const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false); // 보수지급완료 모달
    const [modalTitle, setModalTitle] = useState('');
    const [applyWorkID, setApplyWorkID] = useState('');
    const [registeredList, setRegisteredList] = useState([]); //work status 0(작업 진행전)의 작업 목록
    const [workingList, setWorkingList] = useState([]); //work status 1(작업 진행중)의 작업 목록 + work status 4(작업 완료 검토 요청)의 작업 목록
    const [workedList, setWorkedList] = useState([]); //work status 2(작업 완료)의 작업 목록
    const [requestList, setRequesetList] = useState([]); //work status 3(작업 신청 들어온 상태)의 작업 목록
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
    const handleAcceptButton = (workID, title) => {
        if (!isSubmit) {
            setIsSubmit(true);
            setApplyWorkID(workID);
            setModalTitle(title);
            setModalIsOpen(true);
            setIsSubmit(false);
        }
    };
    const handleRejectButton = async (workID, title) => {
        if (!isSubmit) {
            setIsSubmit(true);
            const result = await putRejectWork(workID);
            if (result) {
                alert(`작업: ${title}\n작업 진행 거절이 완료되었습니다.`);
                window.location.reload();
            } else {
                alert(`작업: ${title}\n작업 진행 거절 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                window.location.reload();
            }
            setIsSubmit(false);
        }
    }
    const handleAcceptApplication = async () => {
        if (!isSubmit) {
            setIsSubmit(true);
            const result = await putAcceptWork(applyWorkID);
            if (result) {
                alert(`작업: ${modalTitle}\n작업 진행 수락과 보수 결제가 완료되었습니다.`);
                window.location.reload();
            } else {
                alert(`작업: ${modalTitle}\n작업 진행 수락 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                window.location.reload();
            }
            setModalIsOpen(false);
            setIsSubmit(false);
        }
    }
    const handleWorkingItem = async () => {
        if (!isSubmit) {
            setIsSubmit(true);
            if (userId==="employee1234") {
                const result = await putLookOverRequest(applyWorkID);
                if (result) {
                    alert(`작업: ${modalTitle}\n작업 완료 신청이 완료되었습니다.`);
                    window.location.reload();
                } else {
                    alert(`작업: ${modalTitle}\n작업 완료 신청 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                    window.location.reload();
                }
                setRequestModalIsOpen(false);
            } else {
                const result = await putLookOverAccept(applyWorkID);
                if (result) {
                    alert(`작업: ${modalTitle}\n작업 검토가 완료되었습니다.`);
                    window.location.reload();
                } else {
                    alert(`작업: ${modalTitle}\n작업 검토 완료 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                    window.location.reload();
                }
                setAcceptModalIsOpen(false);
            }
            setIsSubmit(false);
        }        
    }
    const handleRejectWorkingItem = async () => {
        if (!isSubmit) {
            setIsSubmit(true);
            const result = await putLookOverReject(applyWorkID);
            if (result) {
                alert(`작업: ${modalTitle}\n작업 완료 신청이 거절되었습니다.`);
                window.location.reload();
            } else {
                alert(`작업: ${modalTitle}\n신청 거절 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                window.location.reload();
            }
            setAcceptModalIsOpen(false);
            setIsSubmit(false);
        }        
    }
    const handleLookOverModal = (workID, title) => {
        if (!isSubmit) {
            setIsSubmit(true);
            setApplyWorkID(workID);
            setModalTitle(title);
            if (userId==="employee1234") {
                setRequestModalIsOpen(true);
            } else {
                setAcceptModalIsOpen(true);
            }
            setIsSubmit(false);
        } 
    }
    const handlePayment = async (workID, title) => {
        if (!isSubmit) {
            setIsSubmit(true);
            setModalTitle(title);
            const result = await putPayment(workID);
            if (result) {
                setPaymentModalIsOpen(true);
            } else {
                alert(`작업: ${modalTitle}\n보수 지급 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                window.location.reload();
            }
            setIsSubmit(false);
        }
    }
    const handleClosePaymentModal = () => {
        if (!isSubmit) {
            setIsSubmit(true);
            setPaymentModalIsOpen(false);
            window.location.reload();
            setIsSubmit(false);
        }
    }
    const handleCheckStep = async (stepID) => {
        if (!isSubmit) {
            setIsSubmit(true);
            const result = await putCheckStep(stepID);
            if (result) {
                alert(`체크리스트가 업데이트되었습니다.`);
                window.location.reload();
            } else {
                alert(`체크리스트 업데이트 중 오류가 발생했습니다.\n해당 탭을 닫고 다시 시도해주세요.`);
                window.location.reload();
            }
            setIsSubmit(false);
        }
    }
    useEffect(() => {
        const id = sessionStorage.getItem('id');
        const getEmployerList = async () => {
            setIsLoading(false);  
            await Promise.all([getEmployerWorkList()]).then(async (value) => {
                const [json] = value;
                await Promise.all(
                    json.map(async item => {
                    const checkList = await getCheckList(item.workID);
                    return { ...item, checklist: checkList } 
                })).then((response) => {
                    setRegisteredList(response.filter(item => item.workStatus === 0));
                    setWorkingList(response.filter(item => item.workStatus === 1 || item.workStatus === 4));
                    setWorkedList(response.filter(item => item.workStatus === 2));
                    setRequesetList(response.filter(item => item.workStatus === 3));
                    setCompletedList(response.filter(item => item.workStatus === 5));
                    setIsLoading(true);       
                }).catch((e) => {
                    alert('등록한 일거리 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
                    setIsLoading(true);
                })
            })
        }
        const getEmployeeList = async () => {
            setIsLoading(false);  
            await Promise.all([getEmployeeWorkList()]).then(async (value) => {
                const [json] = value;
                await Promise.all(
                    json.map(async item => {
                    const checkList = await getCheckList(item.workID);
                    return { ...item, checklist: checkList } 
                })).then((response) => {
                    setWorkingList(response.filter(item => item.workStatus === 1 || item.workStatus === 4));
                    setWorkedList(response.filter(item => item.workStatus === 2));
                    setRequesetList(response.filter(item => item.workStatus === 3));
                    setCompletedList(response.filter(item => item.workStatus === 5));
                    setIsLoading(true);       
                }).catch((e) => {
                    alert('등록한 일거리 목록을 불러오지 못했습니다.\n해당 탭을 닫은 후 다시 시도해주세요.');
                    setIsLoading(true);
                })
            })
        }
        if (id) {
            dispatch(userAction.isLogin(id));
            if (id === 'employer1234') {
                getEmployerList();
            } else {
                getEmployeeList();
            }
        }
    }, []);
    return (
        isLoading &&
        <Template
            isLoggedIn={isLoggedIn}
            userId={userId}
            handleLogout={handleLogout}
        >
            {
                isLoggedIn && userId==="employer1234" &&
                <WorkTemplate
                    title="수락대기 일거리 Check"
                    isBorder={false}       
                >
                    <SimpleSlider>
                        {requestList.map(item => {
                            return (
                                <RequestWorkItem
                                    isCheck={false}
                                    title={item.title}
                                    description={item.description}
                                    pay={item.pay}
                                    dueDate={searchDueDate(item.dueDate)} 
                                    categoryName={searchCategoryName(item.category)}
                                    nickName={'노동자'}
                                    checkList={item.checklist}
                                    rejectHandler={() => handleRejectButton(item.workID, item.title)}
                                    acceptHandler={() => handleAcceptButton(item.workID, item.title)}
                                />                        
                            )
                        })}
                    </SimpleSlider>
                </WorkTemplate>
            }
            {
                isLoggedIn && userId==="employee1234" &&
                <WorkTemplate
                    title="신청한 일거리"
                    isBorder={false}       
                >
                    <MultiSlider>
                        {requestList.map(item => {
                            return (
                                <WorkListItem
                                    isCheck={false}
                                    title={item.title}
                                    description={item.description}
                                    pay={item.pay}
                                    dueDate={searchDueDate(item.dueDate)} 
                                    categoryName={searchCategoryName(item.category)}
                                    nickName={'노동자'}
                                    checkList={item.checklist}
                                />                        
                            )
                        })}
                    </MultiSlider>
                </WorkTemplate>
            }
            {
                isLoggedIn && userId==="employer1234" &&
                <WorkTemplate
                    title="등록한 일거리"
                    isBorder={false}       
                >
                    <MultiSlider>
                        {registeredList.map(item => {
                            return (
                                <WorkListItem
                                    title={item.title}
                                    description={item.description}
                                    pay={item.pay}
                                    dueDate={searchDueDate(item.dueDate)} 
                                    categoryName={searchCategoryName(item.category)}
                                    nickName={'노동자'}
                                />                        
                            )
                        })}
                    </MultiSlider>
                </WorkTemplate>
            }            
            <WorkTemplate
                title="진행중인 일거리 Check"
                isBorder={false}       
            >
                <MultiSlider>
                    {workingList.map(item => {
                        return (
                            <WorkListItem
                                workID={item.workID}
                                isCheck={true}
                                isDisabled={
                                    userId === "employee1234"
                                    ? item.workStatus === 1
                                        ? false
                                        : true
                                    : item.workStatus === 1
                                        ? true
                                        : false
                                }
                                isCheckDisabled={
                                    userId === "employee1234"
                                    ? false
                                    : true
                                }
                                title={item.title}
                                description={item.description}
                                pay={item.pay}
                                dueDate={searchDueDate(item.dueDate)} 
                                categoryName={searchCategoryName(item.category)}
                                nickName={'노동자'}
                                checkList={item.checklist}
                                onClick={() => handleLookOverModal(item.workID, item.title)}
                                onClickCheck={handleCheckStep}
                                button={
                                    userId === "employee1234" 
                                    ? item.workStatus === 1
                                        ? "작업 완료"
                                        : "검토중"
                                    : item.workStatus === 1
                                        ? "진행중"
                                        : "검토 완료"
                                }
                            />                        
                        )
                    })}
                </MultiSlider>
            </WorkTemplate>
            <WorkTemplate
                title="보수지급대기 일거리"
                isBorder={false}       
            >
                <MultiSlider>
                    {workedList.map(item => {
                        return (
                            <WorkListItem
                                isCheck={false}
                                title={item.title}
                                description={item.description}
                                pay={item.pay}
                                dueDate={searchDueDate(item.dueDate)} 
                                categoryName={searchCategoryName(item.category)}
                                nickName={'노동자'}
                                checkList={item.checklist}
                                onClick={() => handlePayment(item.workID, item.title)}
                                button={
                                    userId === "employer1234"
                                    ? "보수 지급"
                                    : null
                                }
                            />                        
                        )
                    })}
                </MultiSlider>
            </WorkTemplate>
            <WorkTemplate
                title="완료된 일거리"
                isBorder={false}       
            >
                <MultiSlider>
                    {completedList.map(item => {
                        return (
                            <WorkListItem
                                isCheck={false}
                                title={item.title}
                                description={item.description}
                                pay={item.pay}
                                dueDate={searchDueDate(item.dueDate)} 
                                categoryName={searchCategoryName(item.category)}
                                nickName={'노동자'}
                                checkList={item.checklist}
                                onClick={() => alert('작업 검토 완료 API 연결하고 WorkListItem 디자인 변경하기')}
                            />                        
                        )
                    })}
                </MultiSlider>
            </WorkTemplate>
            <Modal
                isOpen={modalIsOpen}
                title={modalTitle}
                subtitle={`에 대한 노동자님 지원을 수락하시겠습니까?`}
                description="수락시 보수 지급을 위한 결제가 진행됩니다."
                acceptText="수락"
                cancleHandler={() => setModalIsOpen(false)}
                acceptHandler={handleAcceptApplication}
            />
            <Modal
                isOpen={requestModalIsOpen}
                title={modalTitle}
                subtitle={`에 대한 작업 완료 신청을 하시겠습니까?`}
                description={`작업 완료 신청 후 취소가 되지 않으니\n체크리스트가 모두 완료되었는지 확인해주세요.`}
                acceptText="신청"
                cancleHandler={() => setRequestModalIsOpen(false)}
                acceptHandler={handleWorkingItem}
            />
            <Modal
                isOpen={acceptModalIsOpen}
                title={modalTitle}
                subtitle={`에 대한 작업 검토를 완료하시겠습니까?`}
                description={`수락 시 일이 종료되어 추가적인 검토는 불가합니다.\n보수 지급 버튼을 눌러주셔야 보수가 지급됩니다.`}
                cancleText="거절"
                acceptText="수락"
                cancleHandler={handleRejectWorkingItem}
                acceptHandler={handleWorkingItem}
            />
            <Modal
                isOpen={paymentModalIsOpen}
                title={modalTitle}
                subtitle={`보수 지급이 완료되었습니다.`}
                description={`티끌 서비스를 이용해주셔서 감사합니다!\n문의: hk7417@ajou.ac.kr`}
                isCancleText={false}
                acceptText="확인"
                acceptHandler={handleClosePaymentModal}
            />
        </Template>
    );
}

export default ManageScreen;

