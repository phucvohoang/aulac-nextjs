import React, { useState } from 'react';
import { ListUsers, User, UserInfor, Avatar, Flex } from '../styled';
import { Button, ModalBox } from './styled';
import Modal from './Modal';
import { normalizeGroupName } from '../../../util/helper';
const Group = (props) => {
  //console.log(props);
  const [isOpenModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!isOpenModal);
  };
  const handleClick = (group) => {
    props.handleChooseUser(group, 'group');
  };

  const renderHelper = () => {
    return props.groups.map((group) => {
      //console.log(group);
      const isChoosen =
        normalizeGroupName(group.groupName) ===
        normalizeGroupName(props.groupName);
      return (
        <User
          active={isChoosen}
          key={group.uid}
          onClick={() => {
            handleClick(group);
          }}
        >
          <Avatar>
            <img
              src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
              alt=""
            />
          </Avatar>
          <UserInfor>
            <h1>{normalizeGroupName(group.groupName)}</h1>
          </UserInfor>
        </User>
      );
    });
  };
  return (
    <>
      {isOpenModal && (
        <ModalBox>
          <Modal close={toggleModal} />
        </ModalBox>
      )}

      <Flex>
        <Button onClick={toggleModal}>Tạo Group</Button>
      </Flex>
      <ListUsers>{renderHelper()}</ListUsers>
    </>
  );
};

export default Group;
