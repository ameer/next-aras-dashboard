'use client'
import { ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR'
import type { ThemeConfig } from 'antd';
const config: ThemeConfig = {
  token: {
    fontFamily: 'bodyFont',
  },
  components: {
    Layout: {
      bodyBg: '#f0f2f5',
      headerBg: '#f9f9f9',
      headerHeight: 48
    },
    Menu: {
      iconSize: 24,
      colorBgContainer: '#f9f9f9',
    },
    Table: {
      cellPaddingBlock: 8
    },
  }
};

export default function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={faIR}
      direction="rtl"
      theme={config}
    >
      {children}
    </ConfigProvider>
  )
}