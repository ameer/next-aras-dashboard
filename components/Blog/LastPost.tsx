import useFetchData from '@/hooks/useFetchData';
import { Card } from 'antd';
interface BlogPost {
    body: string
    timestamp: string
    title: string
}
export default function LastPost() {
  const { data, loading, error } = useFetchData<BlogPost>('get_last_blog');
  if (error instanceof Error) return <p>Error loading data: {error.message}</p>;
  return (
    <Card loading={loading} title={data?.title} bordered={false}>
      <div dangerouslySetInnerHTML={{ __html: data?.body || '' }} className='text-base/8' />
    </Card>
  );
};