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
            alert('?????? ????????? ?????? ????????? ???????????????.');
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
                    alert('?????? ????????? ?????????????????????.');
                    window.history.pushState('', '', '/');
                    window.location.reload();
                } else {
                    alert('????????? ?????? ??? ????????? ??????????????????. ?????? ??? ?????? ?????????????????? ????????????.');
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
            alert('???????????? ???????????????.')
        } catch(e) {
            alert('???????????? ??? ????????? ??????????????????. ????????? ?????? ??? ?????? ??????????????????.')
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
                title="????????? ??????"
                isRegisterForm={true}
            >
                <WorkRegisterItem
                    title={`??????(${title.length}/?????? 30???)`}
                    placeholder="????????? 30??? ????????? ??????????????????"
                    kind="text"
                    description={title}
                    onChange={handleTitle}
                />
                <WorkRegisterItem
                    title={"????????????"}
                    category={category}
                    kind='category'
                    description={category}
                    onChange={handleCategory}
                />
                <WorkRegisterItem
                    title={"?????? ??????"}
                    placeholder="????????? ????????? ????????? ??????????????????"
                    kind='desc'
                    description={description}
                    onChange={handleDescription}
                />
                <WorkRegisterItem
                    title={'??????'}
                    placeholder="????????? ????????? ????????? ??????????????????"
                    kind='text'
                    description={pay}
                    onChange={handlePay}
                />
                <WorkRegisterItem
                    type={"checkList"}
                    title={'Todo CheckList'}
                    placeholder="1.??????????????? ?????????(20??? ??????)"
                    placeholderDetail="1.??????????????? ?????? ??????(40??? ??????)"
                    kind='text'
                    description={checkList[0].title}
                    descriptionDetail={checkList[0].description}
                    onChange={(event) => handleCheckList(1, true, 20, event)}
                    onChangeDetail={(event) => handleCheckList(1, false, 40, event)}
                />
                <WorkRegisterItem
                    type={"checkList"}
                    isTitle={false}
                    placeholder="2.??????????????? ?????????(20??? ??????)"
                    placeholderDetail="2.??????????????? ?????? ??????(40??? ??????)"
                    kind='text'
                    description={checkList[1].title}
                    descriptionDetail={checkList[1].description}
                    onChange={(event) => handleCheckList(2, true, 20, event)}
                    onChangeDetail={(event) => handleCheckList(2, false, 40, event)}
                />
                <WorkRegisterItem
                    type={"checkList"}
                    isTitle={false}
                    placeholder="3.??????????????? ?????????(20??? ??????)"
                    placeholderDetail="3.??????????????? ?????? ??????(40??? ??????)"
                    kind='text'
                    description={checkList[2].title}
                    descriptionDetail={checkList[2].description}
                    onChange={(event) => handleCheckList(3, true, 20, event)}
                    onChangeDetail={(event) => handleCheckList(3, false, 40,event)}
                />
                <WorkRegisterItem
                    title={'?????? ?????? ??????(YYYY-MM-DD)'}
                    placeholder="?????? ?????? ????????? YYYY-MM-DD ???????????? ??????????????????"
                    kind='text'
                    description={dueDate}
                    onChange={handleDueDate}
                />
                <Button onClick={registerForm}>
                    ?????? ??????
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