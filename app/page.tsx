'use client'
import MarketTable from '@/components/MarketTable/MarketTable';
import LastPost from '@/components/Blog/LastPost';
import { Col, Row } from 'antd';



export default function Home() {
  return (
    <>
      <Row>
        <Col span="16">
          <MarketTable className='mb-4' />
          <LastPost />
        </Col>
      </Row>
    </>
  )
}

