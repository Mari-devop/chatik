import styled from "styled-components";
import { Link } from 'react-router-dom';

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    position: relative;
`;

export const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: linear-gradient(45deg, rgba(4,4,16,1) 0%, rgba(15,3,6,1) 100%);
    width: 721px;
    height: 640px;
    box-sizing: border-box;
    position: relative;
    border-radius: 32px;
    padding: 48px;
    margin-top: auto;
    margin-bottom: auto;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 1px; 
        background: linear-gradient(45deg, #5833EF, #F82D98);
        -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
                mask-composite: exclude;
        z-index: -1;
    }

    @media (max-width: 767px) {
        width: calc(100% - 48px); 
        margin-left: 16px;
        margin-right: 16px;
        padding: 32px;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    width: 100%;

    label {
        font-family: 'Avenir';
        font-weight: 800;
        font-size: 18px;
        line-height: 27px;
        letter-spacing: -1%;
        color: var(--white-color);
        margin-top: 0;
        margin-bottom: 8px;

        @media (max-width: 500px) {
            font-size: 14px;
            line-height: 21px;
        }
    }

    input {
        max-width: 100%;
        height: 27px;
        background-color: #000000;
        border-radius: 16px;
        border: 1px solid var(--border-color);
        font-family: 'Avenir';
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        letter-spacing: -1%;
        color: #FFFFFF80;
        padding: 15px 16px;
    }

    input:focus {
        outline: none
    }
   
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 32px;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

export const Button = styled.button`
    width: 48%;
    height: 56px;
    background: var(--primary-gradient);
    cursor: pointer;
    border-radius: 120px;
    border: none;
    cursor: pointer;
    font-family: 'Arquitecta';
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.3em;
    color: #fffffF;       

    &:hover {
        background: var(--primary-gradient-hover);
    }

    @media (max-width: 500px) {
        width: 100%;
        margin-top: 16px;
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--border-color);
    margin-top: 32px;
`;

export const TextCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Text = styled.p`
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    color: var(--white-color);
    text-align: center;
    padding: 0;
    margin-bottom: 0;

        span {
            color: var(--pink-color);
            cursor: pointer;
        }

    @media (max-width: 500px) {
        font-size: 14px;
        line-height: 21px;
        letter-spacing: -0.01em;
    }
`;

export const LinkStyled = styled(Link)`
    text-decoration: none;
    font-family: 'Avenir';
    font-weight: 800;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
    cursor: pointer;
    padding: 0;
    margin-bottom: 0;

    span {
        color: #F82D98;
    }
`;