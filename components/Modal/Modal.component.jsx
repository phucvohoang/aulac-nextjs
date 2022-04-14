import React from 'react';
import { Collapse, Space, Popover } from 'antd';
import FeatherIcon from 'feather-icons-react';
const { Panel } = Collapse;
const Modal = ({ regions, chooseRegion, isChoosen }) => {
  const handleChoose = (branch, region) => {
    chooseRegion({ ...region, selectedBrand: branch });
  };
  const renderRegions = () => {
    return regions.map((region) => {
      return (
        <Panel
          header={region.name}
          onClick={() => {
            // console.log('click on Panel');
          }}
          key={region._id}
        >
          {/* {renderBranchesHelper(region.branches, region)} */}
          {region.branches.map((branch) => {
            // console.log(branch.disabled);
            return (
              <Space key={branch._id} size="middle">
                {branch.disabled ? (
                  <Popover
                    placement="left"
                    title="Showroom tạm khoá"
                    content="Showroom đang tạm khoá nhằm tuân thủ phòng chống dịch Covid-19"
                  >
                    <p style={{ fontSize: '14px', textAlign: 'left' }}>
                      <FeatherIcon
                        icon="slash"
                        size={14}
                        style={{
                          magrinBottom: '0px',
                          marginRight: '10px',
                          color: 'red',
                        }}
                      />{' '}
                      <span>{branch.name}:</span> {branch.address.addressNo}
                    </p>
                  </Popover>
                ) : (
                  <p
                    onClick={() => {
                      handleChoose(branch, region);
                    }}
                    style={{ fontSize: '14px', textAlign: 'left' }}
                  >
                    <span>{branch.name}:</span> {branch.address.addressNo}
                  </p>
                )}
              </Space>
            );
          })}
        </Panel>
      );
    });
  };
  return (
    <div className={isChoosen ? 'modal__wrapper hidden' : 'modal__wrapper'}>
      <div className="modal__wrapper--content">
        <h1>Chọn nơi gần bạn </h1>
        <Collapse bordered={true} ghost>
          {renderRegions()}
        </Collapse>
      </div>
    </div>
  );
};

export default Modal;
