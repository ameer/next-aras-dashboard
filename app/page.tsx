'use client'
import useFetchData from '../hooks/useFetchData';
import {  Col, Row, Card, Tooltip } from 'antd';
import DataTable from '../components/DataTable';
import { AnyObject } from 'antd/es/_util/type';
import { Icon } from "@iconify/react";
interface DataType {
    last: number,
    yesterday: number,
    ins_code: string,
    shares: number,
    volume: number,
    close: number,
    flag: number,
    daily_change: number,
    weekly: number,
    weekly_change: number,
    monthly: number,
    monthly_change: number,
    yearly: number,
    yearly_change: number,
    last_time_codal: number,
    Publish_date_time_codal: string,
    market_value: number,
    parent: string,
    group: string,
    sort_index: number,
    symbol: string,
    has_style: number,
    bourse: string,
    income_money: number,
    status: string,
    url_codal: string,
    trade_value: number,
    children: []
}

const columns = [
  {
    title: 'نماد',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  { title: 'وضعیت', dataIndex: 'status', render: (value: string) => <span className='text-green-600'>{value}</span> },
  { title: 'آخرین', dataIndex: 'last', type: 'hasChange' },
  { title: 'پایانی', dataIndex: 'close', type: 'number' },
  { title: 'ارزش بازار', dataIndex: 'market_value', type: 'bigNumber', noFraction: true, parts: true },
  { title: 'ارزش معاملات', dataIndex: 'trade_value', type: 'bigNumber', noFraction: true, parts: true },
  { title: '(%) روزانه', dataIndex: 'daily_change', type: 'hasChange' },
  { title: '(%) هفتگی', dataIndex: 'weekly_change', type: 'hasChange' },
  { title: '(%) ماهانه', dataIndex: 'monthly_change', type: 'hasChange' },
  { title: '(%) سالانه', dataIndex: 'yearly_change', type: 'hasChange' },
  { title: '', dataIndex: 'actions', type: 'custom',
    render: (_value: unknown, record: DataType) => {
      return <Tooltip title={`مشاهده ${record.symbol} در TSETMC`} placement='topRight'>
        <a href={`http://www.tsetmc.com/instInfo/${record.ins_code}`} target='_blank'><Icon color='#212b35' fontSize={24} icon="ph:list-magnifying-glass-light" /></a>
      </Tooltip>
    }
  }
];



export default function Home() {
  const { data, loading, error } = useFetchData<DataType[]>('v2/market_table?dashboard_name=ghadir');

  if (error instanceof Error) return <p>Error loading data: {error.message}</p>;
  const firstRowKey = data?.[0]?.ins_code || 'id'
  const classNameCompute = (row: DataType | AnyObject) : string => {
    let className = 'bourse-' + row.bourse + ' border-b border-#f0f0f0'
    if(row.children.length === 0) {
      className += ' no-children'
    }
    return className
  }
  return (
    <>
      <Row>
        <Col span="18">
          <Card bordered={false} loading={loading}>
            <DataTable columns={columns} rowKey={'ins_code'} rowClassName={(row) => classNameCompute(row)} dataSource={data || []} pagination={{ position: ['none'] }} expandable={{ defaultExpandedRowKeys: [firstRowKey] }} />
          </Card>
        </Col>
      </Row>

    </>
  )
}

