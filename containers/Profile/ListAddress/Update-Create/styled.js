import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.div`
  background-color: #fff;
  width: 70%;
  text-align: left;
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
`;
export const Controll = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;
