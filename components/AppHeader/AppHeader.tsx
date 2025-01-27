"use client"
import React from 'react';
import { Layout } from 'antd';
import NavMenu from '../NavMenu';

const { Header } = Layout;

const AppHeader:React.FC = () => (
  <Layout>
    <Header style={{ position: 'sticky', zIndex: 1, maxWidth: '2560px', width: '100%', margin: '0 auto', padding: '0 12px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
      <NavMenu />
    </Header>
  </Layout>
)

export default AppHeader;