import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Template from '../component/Template';
import WorkTemplate from '../component/WorkTemplate';
import WorkRegisterItem from '../component/common/WorkRegisterItem';
import styled from 'styled-components';
import postWorkForm from '../api/postWorkForm';
import { actionCreators as userAction } from "../redux/modules/users";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.users.isLoggedIn);
    const userId = useSelector((store) => store.users.id);
    const [isSubmit, setIsSubmit] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [pay, setPay] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [checkList, setCheckList] = useState([
        {
            checkIndex: 1, 
            title: "",
            description: ""
        },
        {
            checkIndex: 2, 
            title: "",
            description: ""
        },
        {
            checkIndex: 3, 
            title: "",
            description: ""
        }
    ]);
    const handleTitle = event => {
        const {
          target: { value },
        } = event;
        value.length <= 30 && setTitle(value);
    };
    const handleDescription = event => {
        const {
          target: { value },
        } = event;
        setDescription(value);
    };
    const handlePay = event => {
        const {
          target: { value },
        } = event;
        setPay(value);
    };
    const handleCategory = (input = 0) => {
        setCategory(input);
    };
    const handleDueDate = event => {
        const {
          target: { value },
        } = event;
        setDueDate(value);
    };
    const handleCheckList = (checkIndex, isTitle, limit, event) => {
        const {
          target: { value },
        } = event;
        value.length <= limit && setCheckList(
            checkList.map(checkitem =>
                checkitem.checkIndex === checkIndex 
                ? isTitle
                  ? { ...checkitem, title: value } 
                  : { ...checkitem, description: value } 
                : checkitem
            )
        );
    };
    const checkValid = () => {
        if (
            title.length === 0 || 
            description.length === 0 || 
            pay.length === 0 || 
            dueDate.length === 0 ||
            checkList[0].title.length === 0 || 
            checkList[1].title.length === 0 || 
            checkList[2].title.length === 0 ||        
            checkList[0].description.length === 0 ||        
            checkList[1].description.length === 0 ||        
            checkList[2].description.length === 0             
        ) {
            alert('작업 등록의 모든 항목을 채워주세요.');
            return false;
        } else {
            return true;
        }
    }
    const registerForm = async () => {
        if (!isSubmit) {
            setIsSubmit(true);
            const valid = checkValid();
            if (valid) {
                const result = await postWorkForm(title, description, pay*1, category, dueDate, checkList);
                if (result) {
                    alert('작업 등록이 완료되었습니다.');
                    window.history.pushState('', '', '/');
                    window.location.reload();
                } else {
                    alert('작업이 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주시길 바랍니다.');
                }
            }
            setIsSubmit(false);
        }
    }
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
                title="일거리 등록"
                isRegisterForm={true}
            >
                <WorkRegisterItem
                    title={`제목(${title.length}/최대 30자)`}
                    placeholder="제목은 30자 이내로 입력해주세요"
                    kind="text"
                    description={title}
                    onChange={handleTitle}
                />
                <WorkRegisterItem
                    title={"카테고리"}
                    category={category}
                    kind='category'
                    description={category}
                    onChange={handleCategory}
                />
                <WorkRegisterItem
                    title={"작업 설명"}
                    placeholder="작업의 상세한 설명을 입력해주세요"
                    kind='desc'
                    description={description}
                    onChange={handleDescription}
                />
                <WorkRegisterItem
                    title={'보수'}
                    placeholder="작업의 보수를 숫자로 입력해주세요"
                    kind='text'
                    description={pay}
                    onChange={handlePay}
                />
                <WorkRegisterItem
                    type={"checkList"}
                    title={'Todo CheckList'}
                    placeholder="1.체크리스트 타이틀(20자 이내)"
                    placeholderDetail="1.체크리스트 상세 설명(40자 이내)"
                    kind='text'
                    description={checkList[0].title}
                    descriptionDetail={checkList[0].description}
                    onChange={(event) => handleCheckList(1, true, 20, event)}
                    onChangeDetail={(event) => handleCheckList(1, false, 40, event)}
                />
                <WorkRegisterItem
                    type={"checkList"}
                    isTitle={false}
                    placeholder="2.체크리스트 타이틀(20자 이내)"
                    placeholderDetail="2.체크리스트 상세 설명(40자 이내)"
                    kind='text'
                    description={checkList[1].title}
                    descriptionDetail={checkList[1].description}
                    onChange={(event) => handleCheckList(2, true, 20, event)}
                    onChangeDetail={(event) => handleCheckList(2, false, 40, event)}
                />
                <WorkRegisterItem
                    type={"checkList"}
                    isTitle={false}
                    placeholder="3.체크리스트 타이틀(20자 이내)"
                    placeholderDetail="3.체크리스트 상세 설명(40자 이내)"
                    kind='text'
                    description={checkList[2].title}
                    descriptionDetail={checkList[2].description}
                    onChange={(event) => handleCheckList(3, true, 20, event)}
                    onChangeDetail={(event) => handleCheckList(3, false, 40,event)}
                />
                <WorkRegisterItem
                    title={'작업 완료 기간(YYYY-MM-DD)'}
                    placeholder="작업 완료 기간은 YYYY-MM-DD 형식으로 입력해주세요"
                    kind='text'
                    description={dueDate}
                    onChange={handleDueDate}
                />
                <Button onClick={registerForm}>
                    등록 완료
                </Button>
            </WorkTemplate>
        </Template>
    );
}

export default RegisterScreen;

const Button = styled.div`
    width: 642px;
    height: 60px;
    line-height: 60px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    background-color: orange;
    border-radius: 20px;
    cursor: pointer;
    margin: auto;
    margin-top: 50px;
`