import styled from 'styled-components';

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.2s;
  color: goldenrod;
`;
export const Player = styled.div`
  width: 50%;
  border: 5px solid black;
  border-radius: 10px;
  background-color: black;
  position: relative;
  cursor: pointer;
  &:hover ${PlayButton} {
    opacity: 1;
  }
`;

export const Video = styled.video`
  border-radius: 5px;
  width: 100%;
  height: auto;
  &.video__fullscreen {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ControlContainer = styled.div`
  // position: absolute;
  bottom: -5px;
  width: 100%;
  padding: 2px 10px;
  // height: 100%;
  // margin-top: -20%;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  position: absolute;
  transition: all 0.5s ease-out 0.5s;
`;

export const Controls = styled.div`
  width: 100%;
  height: 10%;
  z-index: 2;
  position: absolute;
  bottom: 0;
  cursor: default;
  transition: all 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:hover ${ControlContainer} {
    opacity: 1;
    transition: all 0.2s ease-out;
  }
`;

export const ControlGroup = styled.div`
  // width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ProgressRange = styled.div`
  height: 8px;
  width: calc(100% - 30px);
  background: rgba(202, 202, 202, 0.5);
  margin: auto;
  border-radius: 10px;
  // position: absolute;
  left: 15px;
  top: 15px;
  cursor: pointer;
  transition: height 0.1s ease-in-out;
  z-index: 10;

  :hover {
    height: 10px;
  }
`;
export const ProgressBar = styled.div`
  background: goldenrod;
  width: 50%;
  height: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
`;

export const ControlRight = styled.div``;
export const FullScreen = styled.div`
  cursor: pointer;
  color: #fff;
`;
