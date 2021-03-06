import styled from 'styled-components';

const RealtorWrapper = styled.div`
  width: 100%;
  .filterContainer .filterContent {
    margin-right: 100px;
    padding-top: 10px
  }
  .filterContainer .filterActions {
    right: -210px;
    width: 200px;
  }

  .filterActions .ant-col-24 {
    width: 50%;
  }

  .filterContainer .clearButton {
    margin-top: 0;
  }

  .buttonExport {
    display: flex;
    justify-content: flex-end;
  }
`;

export default RealtorWrapper;
