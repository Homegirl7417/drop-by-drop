import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const WorkListItem = ({ isDisabled=false, isBorder=true, title='', description='', pay=null, dueDate='', categoryName, onClick=null, button="", isCheck, check, onClickCheck }) => {
    return (
        <Container isBorder={isBorder}>
            <CategorySection>
                <Category>
                    {categoryName}
                </Category>
            </CategorySection>
            <WorkInfoSection>
                <Title>
                    {title}
                </Title>
                <Description outline={'none'} readOnly={true}>
                    {description}
                </Description>
            </WorkInfoSection>
            <TodoSection>
                <Title>
                    Todo CheckList
                </Title> 
                <TodoItem
                    title={"1. 이미지 파일 수령"}
                    description={"hk7417로 연락주세요."}
                    isCheck={isCheck} 
                    check={check}
                    onClickCheck={onClickCheck}
                />
                <TodoItem
                    title={"1. 이미지 파일 수령"}
                    description={"hk7417로 연락주세요."}
                    isCheck={isCheck} 
                    check={check}
                    onClickCheck={onClickCheck}
                />
                <TodoItem
                    title={"1. 이미지 파일 수령"}
                    description={"hk7417로 연락주세요."}
                    isCheck={isCheck} 
                    check={check}
                    onClickCheck={onClickCheck}
                />      
            </TodoSection>
            <WorkSection>
                <DueDate>{dueDate}</DueDate>
                <Pay>{pay}원</Pay>
                {
                    button &&
                    <WorkButtonSection>
                        <Button onClick={isDisabled ? null : onClick} isDisabled={isDisabled}>{button}</Button>
                    </WorkButtonSection>
                }
            </WorkSection>               
        </Container>
    );
}

export default WorkListItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    height: 300px;
    border: ${props => props.isBorder ? '1px solid lightgray' : 'none'};
    border-radius: 10px;
    padding: 30px;
    text-align: left;
    cursor: ${props => props.onClick ? 'pointer': 'default'};
    margin-top: 20px;
`

const TodoSection = styled.div`
    width: 240px;
    text-align: left;
`

const CategorySection = styled.div`
    width: 240px;
    height: 30px;
    margin-bottom: 10px;
`

const WorkSection = styled.div`
    width: 240px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
`
const WorkInfoSection = styled.div`

`

const WorkDetailSection = styled.div`
    display: flex;
`

const WorkButtonSection = styled.div`

`
const DueDate = styled.div`
    width: 90px;
    font-size: 12px;
    font-weight: bold;
`

const Pay = styled.div`
    width: 60px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
`

const Title = styled.div`
    width: 240px;
    min-height: 30px;
    line-height: 25px;
    font-size: 18px;
    font-weight: bold;
    color: orange;
`

const Description = styled.textarea`
    width: 240px;
    min-height: 40px;
    font-size: 12px;
    line-height: 14px;
    color: black;
    resize: none;
    outline: none;
    border: none;
`

const Category = styled.div`
    width: 80px;
    height: 20px;
    font-size: 8px;
    line-height: 22px;
    background-color: #E1F5FE;
    border-radius: 20px;
    color: black;
    text-align: center;
`

const Button = styled.div`
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: ${props => props.isDisabled ? '#E1F5FE' : 'orange'};
    color: ${props => props.isDisabled ? 'black' : 'white'};
    border-radius: 10px;
    cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
`