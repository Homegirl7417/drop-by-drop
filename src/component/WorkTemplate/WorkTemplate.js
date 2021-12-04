import React from 'react';
import styled from 'styled-components';

const WorkTemplate = ({isRegisterForm = false, title, children, isBorder=true, isLoggedIn=false, userId=''}) => {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <WorkForm isBorder={isBorder} isRegisterForm={isRegisterForm}>
                {children}
            </WorkForm>
        </Container>
    );
}

export default WorkTemplate;

const Container = styled.div`
    padding: 10px 20px;
`

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: orange;
    text-align: left;
`

const WorkForm = styled.div`
    width: 800px;
    margin: ${props => props.isRegisterForm ? '50px' : '20px'};
    padding: 30px;
    border: ${props => props.isBorder ? '1px solid gray' : 'none'};
    border-radius: 10px;
`