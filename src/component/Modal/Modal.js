import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const Modal = ({ isOpen, onRequestClose, title='', subtitle='', description='', isCancleText=true, cancleText='취소', acceptText='수락', cancleHandler, acceptHandler }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={ModalStyles}
      >
        <ModalContent>
            <TitleSection>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </TitleSection>
            <DescriptionSection>
                {description}
            </DescriptionSection>
            <ButtonSection>
                {
                    isCancleText && 
                    <CancleButton onClick={cancleHandler}>{cancleText}</CancleButton>
                }
                <AcceptButton onClick={acceptHandler}>{acceptText}</AcceptButton>
            </ButtonSection>
        </ModalContent>
      </ReactModal>
    );
};

const ModalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      borderRadius: '15px',
      width: '350px',
      padding : "30px"
    },
    overlay: {
      height: "100%",
      width: "100%",
      margin: "0",
      padding: "0",
      backgroundColor: 'rgb(163, 163, 163, 0.7)',
      zIndex: "999"
    },
};

export default Modal;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    line-height: 18px;
    color: orange;
`

const TitleSection = styled.div`
    font-weight: bold;
`
const Title = styled.div`
    font-size: 18px;
    line-height: 18px;
`

const Subtitle = styled.div`
    margin-top: 10px;
`

const DescriptionSection = styled.div`
    margin: 30px 0px;
`

const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
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
const CancleButton = styled(ButtonStyle)`
    background-color: lightgray;
    color: black;
`

const AcceptButton = styled(ButtonStyle)`
    background-color: orange;
    color: white;
`