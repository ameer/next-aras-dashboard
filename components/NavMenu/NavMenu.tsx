"use client"
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];
const links = [
  { href: '/', label: 'معاملات' },
  { href: '/tableau', label: 'تابلو معاملاتی سهام' },
  { href: '/fundamental', label: 'مقایسه بنیادین سهام' },
  { href: '/technical', label: 'مقایسه تکنیکال سهام' },
  { href: '/alarms', label: 'هشدارها' },
  { href: '/profit-sensitivity', label: 'حساسیت سود' },
  { href: '/organization-tree', label: 'شرکت‌های زیرمجموعه' }
]
const items: MenuItem[] = links.map((link) => ({
  key: link.href,
  label: <Link className={'font-bold'} href={link.href}>{link.label}</Link>,
}));
const NavMenu:React.FC = () => (
  <Menu theme={'light'} mode="horizontal" items={items} />
)
export default NavMenu