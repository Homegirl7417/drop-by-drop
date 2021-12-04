import React from "react";
import styled from 'styled-components';
import Slider from "react-slick";

const Button = styled.div`
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: contain;
    background-color: orange;
`
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <Button />,
    prevArrow: <Button />
};

export default ({ children }) => {
    return (
        <Slider {...settings}>
            {children} 
        </Slider>
    );
}