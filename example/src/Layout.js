import React, { useCallback, useState } from 'react'
import { A, usePath } from 'hookrouter'
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({children}) {

  const path = usePath(false)

  const [isCollapsed, setCollapsed] = useState(false)

  const onCollapse = useCallback(collapsed => {
    setCollapsed(collapsed)
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider  collapsed={isCollapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
          <Menu.Item key="/">
            <A href='/'>
              <Icon type="google" />
              <span>Google Map</span>
            </A>
          </Menu.Item>
          <Menu.Item key="2">
            <A href='info-window'>
              <Icon type="desktop" />
              <span>InfoWindow</span>
            </A>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Sidebar