import styled, { keyframes } from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  margin: 1rem 0;
  width: 90%;
  background-color: #fff;
  color: #000;
  border: none;
  border-bottom: 0.1rem solid #f3f3f3;
  outline: none;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    border-radius: 0.5rem;
    background-color: goldenrod;
    color: #fff;
    border: none;
  }
`;

export const ModalBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: #00000040;
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
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

const slideIn = keyframes`
0% {
  transform: scale(.5) translateX(-100%);
  opacity: 0;
}
50% {
  transform: scale(.5) translateX(0);
  opacity: 1;
  
}
100% {
  transform: scale(1);
}
`;
export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  border-radius: 0.5rem;
  padding-top: 1rem;
  animation-name: ${slideIn};
  animation-duration: 1s;
  transform-origin: center;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;

export const LeftContent = styled.div`
  background-color: #fff;
  min-width: 40rem;
  height: 100%;
  border-right: 0.1rem solid #f3f3f3;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
`;

export const RightContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 2rem 0;
`;

export const Title = styled.h4`
  font-size: 1.4rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  &::after {
    content: '*';
    color: red;
    margin-left: 0.2rem;
  }
`;
export const Row = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

export const ListUser = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 1rem;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  &:not(:first-child) {
    border-top: 0.1rem solid #f3f3f3;
  }
`;

export const User = styled.div`
  flex: 1;
  display: flex;
  align-item: center;
  justify-content: flex-start;
`;

export const UserAvatar = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
export const UserInfor = styled.div`
  margin-left: 1.5rem;
  & > * {
    margin: 0;
  }
`;
export const UserName = styled.h4`
  font-size: 1.4rem;
  font-weight: bold;
  color: #000;
`;
export const UserEmail = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
`;
export const Text = styled.h4`
  font-size: 1.2rem;
  margin: 1.2rem 0;
  transition: color 0.4s;
`;

export const IconBox = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  & > * {
    margin: 0;
    padding: 0;
  }
  &:hover ${Text} {
    color: green;
    border-bottom: 0.1rem solid green;
  }
`;

export const ActionBox = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
