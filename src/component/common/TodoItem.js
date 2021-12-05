import React from 'react';
import styled from 'styled-components';

const TodoItem = ({ 
    isCheck=false, 
    isCheckDisabled=false,
    title="", 
    description="", 
    checked, 
    onClickCheck=null 
}) => {
    return (
        <TodoItemSection>
            <TitleSection>
                <TodoItemTitle>
                    {title}
                </TodoItemTitle>
                {
                    isCheck &&
                    <TodoItemCheck type="radio" checked={checked} disabled={isCheckDisabled} onClick={onClickCheck}/>
                }
            </TitleSection>
            <TodoItemDescription>
                {description}
            </TodoItemDescription>
        </TodoItemSection>  
    );
}

export default TodoItem;

const TodoItemSection = styled.div``

const TitleSection = styled.div`
    display: flex;
`

const TodoItemTitle = styled.div`
    display: inline-block;
    width: 220px;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    vertical-align: text-bottom;
`
const TodoItemCheck = styled.input`
    width: 18px;
    height: 20px;
`
const TodoItemDescription = styled.div`
    font-size: 12px;
    line-height: 14px;
`