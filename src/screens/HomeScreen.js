import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Template from '../component/Template';
import WorkListItem from '../component/common/WorkListItem';
import getAllWorkList from '../api/getAllWorkList';
import WorkTemplate from '../component/WorkTemplate';

const HomeScreen = () => {
    const isLoggedIn = useSelector((store) => store.isLoggedIn);
    const userId = useSelector((store) => store.id);
    const store = useSelector((store) => store);
    console.log('ooo'+JSON.stringify(store));
    const searchCategoryName = (input) => {
        let currentCategory = '기타';
        switch (input){
            case 0: 
                currentCategory = '라벨링';
                break; 
            case 1:
                currentCategory = '설문조사';
                break;
            case 2:
                currentCategory = '심부름';
                break;
            case 3:
                currentCategory = '초안 번역';
                break; 
            case 4:
                currentCategory = '블로그 포스팅';
                break;                                   
            default:
                currentCategory = '기타';
                break; 
        }
        return currentCategory; 
    }
    const searchDueDate = (input) => {
        let currentDueDate = '상시모집';
        switch (input){
            case null: 
                currentDueDate = '상시모집';
                break;                                  
            default:
                currentDueDate = input;
                break; 
        }
        return currentDueDate; 
    }
    const [workList, setWorkList] = useState([]);
    const [testWorkList, setTestWorkList] = useState([
        {
            title: '강아지 산책',
            description: '강아지를 1시간동안 산책시켜주세요',
            pay: 100000, 
            dueDate: '2021-12-27',
            category: 0
        },
        {
            title: '강아지 산책',
            description: '강아지를 1시간동안 산책시켜주세요',
            pay: 100000, 
            dueDate: '2021-12-27',
            category: 0
        },
        {
            title: '강아지 산책',
            description: '강아지를 1시간동안 산책시켜주세요',
            pay: 100000, 
            dueDate: '2021-12-27',
            category: 0
        },
        {
            title: '강아지 산책',
            description: '강아지를 1시간동안 산책시켜주세요',
            pay: 100000, 
            dueDate: '2021-12-27',
            category: 0
        },
        {
            title: '강아지 산책',
            description: '강아지를 1시간동안 산책시켜주세요',
            pay: 100000, 
            dueDate: '2021-12-27',
            category: 0
        },
    ]);
    const applyWork = () => {
        if(window.confirm('해당 작업을 신청하시겠습니까?') === true) {
            alert("작업이 신청되었습니다.")
        }
    }
    // useEffect(() => {
    //     const getAllList = async () => {
    //         console.log("step1")
    //         const result = await getAllWorkList();
    //         console.log("step2")
    //         if (result) {
    //             console.log("step3")
    //             setWorkList(result);
    //             alert('작업 목록 성공');
    //             // 전체 목록 페이지로 이동 추가
    //         } else {
    //             console.log("step4")
    //             alert('작업 목록을 불러오지 못했습니다.');
    //         }
    //     }
    //     getAllList();
    // }, []);

    return (
        <Template>
            <WorkTemplate
                title="등록된 일거리"
                isBorder={false}
                isLoggedIn={isLoggedIn}
                userId={userId}
            >
                <ListGrid>
                    {/* {
                        workList.map(item => {
                            return (
                                <WorkListItem
                                    title={item.title}
                                    description={item.description}
                                    pay={item.pay}
                                    dueDate={searchDueDate(item.dueDate)} 
                                    categoryName={searchCategoryName(item.category)}
                                    onClick={applyWork}
                                />
                            )
                        })
                    } */}
                    {
                        testWorkList.map(item => {
                            return (
                                <WorkListItem
                                    title={item.title}
                                    description={item.description}
                                    pay={item.pay}
                                    dueDate={searchDueDate(item.dueDate)} 
                                    categoryName={searchCategoryName(item.category)}
                                    onClick={applyWork}
                                />
                            )
                        })
                    }
                </ListGrid>
            </WorkTemplate>
        </Template>
    );
}

export default HomeScreen;

const ListGrid = styled.div`
    display: grid;
    flex-directions: row;
    grid-template-columns: repeat(3, 320px)};
`