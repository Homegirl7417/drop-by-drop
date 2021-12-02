import React from 'react';
import styled from 'styled-components';

const WorkListItem = ({ title='', description='', pay=null, dueDate='', categoryName, onClick }) => {
    return (
        <Container onClick={onClick}>
            <CategorySection>
                <Category>
                    {categoryName}
                </Category>
            </CategorySection>
            <WorkInfoSection>
                <Title>
                    {title}
                </Title>
                <EmployerInfoSection>
                    <Pay>{pay}원</Pay>
                    <Pay>마감일: &nbsp;{dueDate}</Pay>
                </EmployerInfoSection>
                <Description outline={'none'} readOnly={true}>
                    {description}
                </Description>                
            </WorkInfoSection>
        </Container>
    );
}

export default WorkListItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 230px;
    height: 300px;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 20px 30px;
    text-align: left;
    cursor: pointer;
    margin-top: 20px;
`

const CategorySection = styled.div`
    width: 230px;
    height: 30px;
    display: flex;
    flex-directions: row;
    justify-content: flex-start;
    align-items: flex-start;
`

const WorkInfoSection = styled.div``

const EmployerInfoSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 230px;
    height: 20px;
    padding-top: 15px;
    border-bottom: 0.5px solid gray;
`

const Pay = styled.div`
    font-size: 12px;
`

const Title = styled.div`
    min-height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    color: orange;
`

const Description = styled.textarea`
    width: 240px;
    min-height: 100px;
    margin-top: 20px;
    font-size: 14px;
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
    background-color: gray;
    border-radius: 20px;
    color: black;
    text-align: center;
`