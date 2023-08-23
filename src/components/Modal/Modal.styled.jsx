import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalBox = styled.div`
  position: relative; /* Add this line */
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ModalImg = styled.img`
  display: block;
  max-width: 92%; 
  max-height: 80vh; 
  margin: auto; 
`;


export const ModalBoxHover = styled(ModalBox)`
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;