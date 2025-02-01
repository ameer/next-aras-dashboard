"use client"
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

type MenuItem = Required<MenuProps>['items'][number];
const links = [
  { href: '/', label: 'معاملات', icon: 'mage-dashboard' },
  { href: '/tableau', label: 'تابلو معاملاتی سهام', icon: 'mi:bar-chart' },
  { href: '/fundamental', label: 'مقایسه بنیادین سهام', icon: 'lucide:chart-spline' },
  { href: '/technical', label: 'مقایسه تکنیکال سهام', icon: 'teenyicons:candle-chart-outline' },
  { href: '/alarms', label: 'هشدارها', icon: 'si:alert-line' },
  { href: '/profit-sensitivity', label: 'حساسیت سود', icon: 'mdi:chart-finance' },
  { href: '/organization-tree', label: 'شرکت‌های زیرمجموعه', icon: 'mdi:family-tree' }
]

const NavMenu:React.FC = () => {
  const path = usePathname()
  const items: MenuItem[] = links.map((link) => ({
    key: link.href,
    label: <Link href={link.href}>{link.label}</Link>,
    icon: <Icon fontSize={24} icon={link.icon} />
  }));
  return (
    <Menu theme={'light'} mode="horizontal" style={{ borderBottom: 'none',  minWidth: 0, flex: "auto"  }} items={items} selectedKeys={[path]} />
  )
}
export default NavMenu