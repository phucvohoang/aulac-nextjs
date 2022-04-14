import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 500px;
  position: relative;
`;

export const Map = styled.div`
  width: 60%;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100% - 200px);
  }
`;

export const Controll = styled.div`
  width: 40%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  border-left: 4px solid #f3f3f3;
  @media screen and (max-width: 768px) {
    width: 100%;
    // height: 100%;
    top: calc(100% - 200px);
    overflow: auto;
    display: flex;
    gap: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const SearchBox = styled.div`
  height: 100px;
`;
export const Input = styled.input`
  display: inline-block;
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f3f3f3;
  outline: none;
  font-size: 12px;
`;
export const ListResult = styled.ol`
  height: 250px;
  overflow: auto;
  @media screen and (max-width: 768px) {
    // height: 50px;
  }
`;
export const Item = styled.li`
  padding: 10px 5px;
  transition: all 0.2s;
  cursor: pointer;
  border-bottom: 1px solid #f3f3f3;
  font-size: 12px;
  :hover {
    background-color: goldenrod;
    color: #fff;
  }
  &.active {
    background-color: goldenrod;
    color: #fff;
  }
`;
export const CurrentResult = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  p {
    font-size: 14px;
  }
  p:first-child {
    font-weight: bold;
    margin-right: 10px;
    color: goldenrod;
    padding-bottom: 4px;
    border-bottom: 1px solid goldenrod;
  }
  @media screen and (max-width: 768px) {
    height: auto;
    text-align: left;
    p {
      text-align: left;
    }
  }
`;

export const ContainerSearch = styled.div`
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;
export const ContainerResult = styled.div`
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`