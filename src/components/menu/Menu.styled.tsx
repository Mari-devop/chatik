import styled from "styled-components";

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    position: relative;
    height: calc(100vh - 80px);
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    width: 100%;
    color: var(--white-color);
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
`;