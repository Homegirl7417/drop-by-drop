import React from 'react';
import styled from 'styled-components';

const WorkTemplate = ({title, children}) => {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <WorkForm>
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
    margin: 50px 20px;
    padding: 30px;
    border: 1px solid gray;
    border-radius: 10px;
`