import React from 'react';
import styled from 'styled-components';

const TodoItem = ({ title, description }) => {
    return (
        <TodoItemSection>
            <TodoItemTitle>
                {title}
            </TodoItemTitle>
            <TodoItemDescription>
                {description}
            </TodoItemDescription>
        </TodoItemSection>  
    );
}

export default TodoItem;

const TodoItemSection = styled.div`
    margin-top: 10px;
`

const TodoItemTitle = styled.div`
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
`
const TodoItemDescription = styled.div`
    font-size: 12px;
    line-height: 14px;
`