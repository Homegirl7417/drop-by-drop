import React from 'react';
import styled from 'styled-components';

const CategoryList = ({onChange, category}) => {
    return (
        <CategorySection>
            <Category category={category===0} onClick={() => onChange(0)}>라벨링</Category>
            <Category category={category===1} onClick={() => onChange(1)}>설문조사</Category>
            <Category category={category===2} onClick={() => onChange(2)}>심부름</Category>
            <Category category={category===3} onClick={() => onChange(3)}>초안 번역</Category>
            <Category category={category===4} onClick={() => onChange(4)}>블로그 포스팅</Category>
            <Category category={category===5} onClick={() => onChange(5)}>기타</Category>
        </CategorySection>
    );
}
const WorkRegisterItem = (
    {
        type="normal", 
        isTitle=true, 
        title, 
        description=null, 
        descriptionDetail=null, 
        kind = 'text', 
        onChange=null, 
        onChangeDetail=null, 
        category, 
        placeholder="", 
        placeholderDetail=""
    }) => {
    return (
        <Container type={type}>
            {
                isTitle && 
                <Title>
                    {title}
                </Title>
            }
            {
                kind === 'category'
                ? <CategoryList
                    category={category}
                    onChange={onChange}
                />
                : type === 'checkList'
                    ? <div>
                        <Description 
                            type="text" 
                            kind={kind}
                            value={description} 
                            onChange={onChange}
                            placeholder={placeholder}
                        />
                        <Description 
                            type="text" 
                            kind={kind}
                            value={descriptionDetail} 
                            onChange={onChangeDetail}
                            placeholder={placeholderDetail}
                        />
                    </div>
                    : <Description 
                        type="text" 
                        kind={kind}
                        value={description} 
                        onChange={onChange}
                        placeholder={placeholder}
                    />
            }
        </Container>
    );
}

export default WorkRegisterItem;

const Container = styled.div`
    margin: ${props => props.type === 'login' ? '10px 0px' : '40px 0px'};
`

const Title = styled.div`
    width: 600px;
    height: 30px;
    padding: 0px 20px;
    font-size: 18px;
    font-weight: bold;
    color: orange;
    text-align: left;
`

const Description = styled.textarea`
    width: 600px;
    height: ${props => props.kind === 'desc' ? '100px' : '30px'};
    padding: 10px;
    text-align: left;
    border: 1px solid #E1F5FE;
    border-radius: 20px;
    background-color: #E1F5FE;
    font-size: 16px;
    line-height: 30px;
    color: black;
    resize: none;
    margin-bottom: 10px;
`

const CategorySection = styled.div`
    width: 600px;
    padding: 20px;
    display: flex;
    margin: auto;
`

const Category = styled.div`
    width: 80px;
    height: 30px;
    font-size: 12px;
    line-height: 33px;
    background-color: ${props => props.category ? 'orange' : '#E1F5FE'};
    margin-right: 20px;
    border-radius: 20px;
    cursor: pointer;
    color: ${props => props.category ? 'white' : 'black'};
`