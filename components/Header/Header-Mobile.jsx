import React from 'react';
import { Menu, Dropdown } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom'
  
const HeaderMobile = (props) => {
    const menu = (
        <Menu>
          <Menu.Item key="1">
            <NavLink exact to="/" activeClassName="active__nav">Trang Chủ</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
          <NavLink to={`/products/${props.categories && props.categories[0]._id}`} activeClassName="active__nav">Sản Phẩm</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/news" activeClassName="active__nav">Tin Tức</NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/recipes" activeClassName="active__nav">Công Thức</NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/about-us" activeClassName="active__nav">Hệ Thống Phản Hồi</NavLink>
          </Menu.Item>
          <Menu.Item key="6">
          <NavLink to="/contact" activeClassName="active__nav">Về Chúng Tôi</NavLink>
          </Menu.Item>
        </Menu>
      );
    return (
        // <Collapse defaultActiveKey={['1']} onChange={callback}>
        //     <Panel header="This is panel header 1" key="1">
        //     <p>{text}</p>
        //     </Panel>
        //     <Panel header="This is panel header 2" key="2">
        //     <p>{text}</p>
        //     </Panel>
        //     <Panel header="This is panel header 3" key="3">
        //     <p>{text}</p>
        //     </Panel>
        // </Collapse>
        <div className="dropdown__mobile__menu">
            <Dropdown overlay={menu} trigger={['click']}>
                <div
                className="site-dropdown-context-menu"
                >
                    <FeatherIcon icon="menu" />
                    <p>Menu</p>
                </div>
            </Dropdown>
        </div>
        
        // <div className="dropdownMenu">

        //     Menu
        //     <ul className="dropdownMenu__nav">
        //         <li className="dropdownMenu__nav--item">Trang Chủ</li>
        //         <li className="dropdownMenu__nav--item">Sản Phẩm</li>
        //         <li className="dropdownMenu__nav--item">Liên Hệ</li>
        //         <li className="dropdownMenu__nav--item">Tin Tức</li>
        //     </ul>
        // </div>
    )
}

export default HeaderMobile;