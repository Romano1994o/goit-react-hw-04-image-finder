import React from 'react'; 
import PropTypes from 'prop-types';
import Modal from 'react-modal'; 
import {  Overlay, ModalImg, ModalBoxHover } from './Modal.styled'; 
export const ModalWindow = ({ onHandleClose, url, tags }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onHandleClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          border: 'none',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        },
      }}
    >
      <Overlay onClick={onHandleClose}>
        <ModalBoxHover>
          <ModalImg src={url} alt={tags} />
        </ModalBoxHover>
      </Overlay>
    </Modal>
  );
};

ModalWindow.propTypes = {
  onHandleClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};