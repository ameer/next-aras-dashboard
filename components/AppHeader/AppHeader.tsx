"use client"
import React from 'react';
import { Divider, Layout } from 'antd';
import NavMenu from '../NavMenu';
import { t } from '@/utils/translate';

const { Header } = Layout;

const AppHeader:React.FC = () => (
  <Layout>
    <Header className='flex items-center' style={{ position: 'sticky', zIndex: 1, maxWidth: '2560px', width: '100%', margin: '0 auto', padding: '0 12px', borderBottom: '2px solid rgb(234, 234, 234)' }}>
      <h1 className='text-xl font-bold'>داشبورد {t(String(process.env.NEXT_PUBLIC_DASHBOARD_NAME))}</h1>
      <Divider type="vertical" style={{ marginInline: '16px' }}  />
      <NavMenu />
    </Header>
  </Layout>
)

export default AppHeader;