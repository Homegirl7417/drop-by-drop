import React, {useState} from 'react';
import Template from '../component/Template';
import WorkTemplate from '../component/WorkTemplate';
import WorkRegisterItem from '../component/common/WorkRegisterItem';
import styled from 'styled-components';
import postWorkForm from '../api/postWorkForm';

const RegisterScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [pay, setPay] = useState('');
    const [dueDate, setDueDate] = useState('');
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
    const registerForm = async () => {
        console.log("step1")
        const result = await postWorkForm(title, description, pay, category, dueDate);
        console.log("step2")
        if (result) {
            console.log("step3")
            alert('작업 등록이 완료되었습니다.');
            // 전체 목록 페이지로 이동 추가
        } else {
            console.log("step4")
            alert('작업이 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주시길 바랍니다.');
        }
    }
    return (
        <Template>
            <WorkTemplate
                title="일거리 등록"
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