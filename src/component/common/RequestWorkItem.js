import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WorkListItem from './WorkListItem';
import ProfileImage from '../../image/profileImage1.png';

const RequestWorkItem = ({ title, description, pay, dueDate, categoryName, nickName, rejectHandler, acceptHandler }) => {
    return (
        <Container>
            <WorkSection>
                <WorkListItem
                    title={title}
                    description={description}
                    pay={pay}
                    dueDate={dueDate} 
                    categoryName={categoryName}                 
                />
            </WorkSection>
            <ApplySection>
                <ApplyTitle>지원자</ApplyTitle>
                <ApplyList>
                    <ApplyItem>
                        <ProfileSection>
                            <Photo src={ProfileImage} alt="Profile Image"></Photo>
                            <UserName>{nickName}</UserName>
                        </ProfileSection>
                        <ButtonSection>
                            <AcceptButton onClick={acceptHandler}>수락</AcceptButton>
                            <RejectButton onClick={rejectHandler}>거절</RejectButton>                                
                        </ButtonSection>
                    </ApplyItem>
                </ApplyList>
            </ApplySection>
        </Container>
    );
}

export default RequestWorkItem;

const Container = styled.div`
    display: flex;
    flex: 1 2;
    min-height: 300px;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 20px;
`

const WorkSection = styled.div`
`

const ApplySection = styled.div`
    width: 90%;
    margin-left: 10px;
    margin-top: 20px;
`
const ApplyTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    line-height: 28px;
    color: orange;
    text-align: left;
    margin-bottom: 10px;
`
const ApplyList = styled.div`

`

const ApplyItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 20px;
`

const ProfileSection = styled.div`
    display: flex;
`
const ButtonSection = styled.div`
    display: flex;
`

const Photo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
`

const UserName = styled.div`
    margin-left: 10px;
    font-size: 16px;
    line-height: 30px;
    font-weight: bold;
    color: orange;
`

const ButtonStyle = styled.div`
    width: 50px;
    height: 28px;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    border-radius: 20px;
    margin-left: 10px;
    cursor: pointer;
`

const RejectButton = styled(ButtonStyle)`
    background-color: lightgray;
    color: black;
`

const AcceptButton = styled(ButtonStyle)`
    background-color: orange;
    color: white;
`