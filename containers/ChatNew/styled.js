import styled from 'styled-components';

const colorBg = '#fafafa';
const colorBlue = '#ecf6ff';

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

export const ChatContainer = styled.div`
  margin: 5rem auto;
  max-width: 128rem;
  // min-height: 30rem;
  height: 70rem;
  background-color: ${colorBg};
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0rem 1.2rem 4rem rgb(0 0 0 / 10%);
  position: relative;
`;
export const ChatLeft = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #fff;
  max-width: 40rem;
  min-width: 30rem;
  display: flex;
  flex-direction: column;
`;
export const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
  border: 0.1rem solid #f3f3f3;
  border-left: none;
  border-right: none;
`;
export const Tab = styled.p`
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.4s;
  cursor: pointer;
  background-color: ${(props) => (props.active ? 'goldenrod' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  &:hover {
    background-color: goldenrod;
    color: #fff;
  }
`;

export const ListUsers = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  padding: 2rem;
`;

export const User = styled.div`
  display: flex;
  padding: 0.5rem 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.active ? `${colorBlue}` : '#fff')};
  cursor: pointer;
  ${(props) => props.active && `border: none`}
  &:hover {
    background-color: ${colorBlue};
    border: none;
  }
  &:not(:first-child) {
    border-top: 0.1rem solid #f3f3f3;
  }
`;
export const UserInfor = styled.div`
  margin-left: 1rem;
  h1 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0;
  }
`;
export const ChatMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0rem 2rem 1rem;
  padding-right: 0rem;
  background-color: ${colorBg};
  height: 100%;
  position: relative;
`;

export const Processing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isSelectUser ? '0.7 ' : '1')};
  background-color: #fff;
  border-left: 0.1rem solid #f3f3f3;
`;

export const DidNotSelectUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
  }
  p {
    margin-top: 10px;
  }
`;
export const Avatar = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
export const TitleSection = styled.div`
  width: 100%;
  padding: 1rem;
  min-height: 5rem;
  border-bottom: 0.1rem solid #f3f3f3;
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 5px;
`;

export const ListMessage = styled.div`
  flex: 1;
  padding: 2rem 1rem;
  overflow: auto;
`;

export const MessageBox = styled.div`
  border-radius: 0.5rem;
  display: flex;
  justify-content: ${(props) => (props.sent ? 'flex-end' : 'flex-start')};
`;
export const Message = styled.div`
  border-radius: 0.5rem;
  max-width: 50%;
  padding: 1rem 2rem;
  background-color: ${(props) => (props.sent ? `${colorBlue}` : '#fff')};
`;

export const Actions = styled.div`
  margin-top: auto;
  padding: 0rem 0.5rem;
  background-color: #fff;
`;

export const Options = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;
export const Option = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  // background-color: steelblue;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.24;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  & > * {
    cursor: pointer;
  }
  & > label {
    margin: 0;
    padding: 0;
    display: inherit;
  }
  input[type='file'] {
    display: none;
    margin: 0;
  }
  :hover {
    background-color: goldenrod;
    color: #fff;
  }
`;

export const Inputbox = styled.div`
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  background-color: #f7f7f7;
  padding: 1rem;
  font-size: 1.2rem;
  outline: none;
`;
export const ChatName = styled.div`
  margin-left: 1.5rem;
  text-transform: uppercase;
`;
export const SpinBox = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  font-size: 1.2rem;
  color: goldenrod;
`;
