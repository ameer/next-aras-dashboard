'use client'
import useFetchData from '../hooks/useFetchData';
import { Table, Col, Row, Card } from 'antd';
import type { TableProps } from 'antd';
import { formatNumber } from '../utils'

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
    children: object
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'نماد',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  { title: 'وضعیت', dataIndex: 'status', },
  { title: 'آخرین', dataIndex: 'last', render: formatNumber  },
  { title: 'پایانی', dataIndex: 'close', render: formatNumber },
  { title: 'ارزش بازار', dataIndex: 'market_value', render: formatNumber },
  { title: 'ارزش معاملات', dataIndex: 'trade_value', render: formatNumber },
  { title: '(%) روزانه', dataIndex: 'daily_change', render: formatNumber },
  { title: '(%) هفتگی', dataIndex: 'weekly_change', render: formatNumber },
  { title: '(%) ماهانه', dataIndex: 'monthly_change', render: formatNumber },
  { title: '(%) سالانه', dataIndex: 'yearly_change', render: formatNumber },
  { title: '', dataIndex: 'actions' }

];
export default function Home() {
  const { data, error } = useFetchData<DataType[]>('v2/market_table?dashboard_name=ghadir');

  if (error) return <p>Error loading data: {error.message}</p>;
  if (!data) return <p>Loading...</p>;
  const firstRowKey = data![0].ins_code

  return (
    <>
      <Row>
        <Col span="18">
          <Card bordered={false}>
            <Table<DataType> columns={columns} dataSource={data} rowKey="ins_code" pagination={{ position: ['none'] }} expandable={{ expandedRowKeys: [firstRowKey] }} />
          </Card>
        </Col>
      </Row>

    </>
  )
}
