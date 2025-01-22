"use client"
import React from 'react';
import { Layout } from 'antd';
import NavMenu from '../NavMenu';

const { Header } = Layout;

const AppHeader:React.FC = () => (
  <Layout>
    <Header style={{ position: 'sticky', zIndex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
      <NavMenu />
    </Header>
  </Layout>
)

export default AppHeader;