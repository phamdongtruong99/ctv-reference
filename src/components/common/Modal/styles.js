import styled from 'styled-components';
import { Modal } from 'antd';

export const ModalWrapper = styled(Modal)`
  max-height: 90%;
  min-height: 30%;
  .ant-modal-header {
    background: ${({ theme }) => theme.background.content};
    border-bottom: 1px solid ${({ theme }) => theme.background.container};
    color: ${({ theme }) => theme.palette.loadingBackgroundColor};
  }
  .ant-modal-content {
    padding-top: 10px;
  }
  .ant-modal-title {
    color: ${({ theme }) => theme.palette.primary};
    font-size: 15px;
  }
  .ant-modal-close,
  .ant-modal-close-icon {
    display: none;
  }
  .ant-input,
  .ant-select-selection,
  .ant-input-number,
  .ant-select-dropdown-menu-item,
  .ant-select-dropdown-menu,
  .ant-select-dropdown,
  .ant-select-clear-icon,
  .ant-select-dropdown-menu-vertical {
    background: ${({ theme }) => theme.background.content};
    border: 1px solid ${({ theme }) => theme.border.default};
    &:hover,
    &:focus,
    &:active {
      border: 1px solid ${({ theme }) => theme.border.default};
    }
  }
  textarea {
    background: ${({ theme }) => theme.background.content};
    border: none;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid ${({ theme }) => theme.border.default};
    }
  }
  .ant-select-selection__clear {
    background-color: transparent;
    color: white;
    border-radius: 5px;
  }
  .ant-select-arrow-icon {
    background-color: transparent;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ant-modal-footer {
    border-top: 1px solid ${({ theme }) => theme.background.container};
  }

  .ant-modal-body {
    padding: 10px 24px;
  }

  .ant-tabs-bar {
    border-bottom: none;
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.background.container};
  }
  .ant-tabs-tab {
    color: ${({ theme }) => theme.text.tabTitle};
  }
  .ant-list {
    margin-top: 20px;
    overflow: auto;
    max-height: 460px;
  }
  div::-webkit-scrollbar-thumb {
    border-radius: 3px !important;
    background: ${({ theme }) => theme.scrollbar.thumb} !important;
  }
  div::-webkit-scrollbar-track {
    border-radius: 3px !important;
    background: ${({ theme }) => theme.scrollbar.track} !important;
  }
  div::-webkit-scrollbar-thumb:hover {
    border-radius: 3px !important;
    background: ${({ theme }) => theme.scrollbar.thumb} !important;
  }
  div::-webkit-scrollbar {
    width: 6px;
    border-radius: 3px !important;
    background: ${({ theme }) => theme.scrollbar.thumb} !important;
  }
  .ant-list-split .ant-list-item {
    border-bottom: none;
    padding: 1px 0px;
  }
  .ant-list-empty-text {
    color: ${({ theme }) => theme.text.empty};
  }
  .modalTitle {
    background: ${({ theme }) => theme.palette.primary};
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-form-item {
  }
  .ant-form-item-control {
    line-height: 2;
  }
  .txtTitle {
    font-size: 14px;
  }
  .ant-form-item-label {
    line-height: 1.5em;
    padding-bottom: 5px;
  }
`;
