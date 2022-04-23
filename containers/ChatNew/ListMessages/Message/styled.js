import styled from 'styled-components';

const colorBg = '#fafafa';
const colorBlue = '#ecf6ff';

export const MessageBox = styled.div`
  border-radius: 0.5rem;
  display: flex;
  justify-content: ${(props) => (props.isSent ? 'flex-end' : 'flex-start')};
  margin-bottom: 1rem;
`;
export const Message = styled.div`
  border-radius: 0.5rem;
  max-width: 50%;
  padding: 1rem 2rem;
  background-color: ${(props) => (props.isSent ? `${colorBlue}` : '#fff')};
`;
