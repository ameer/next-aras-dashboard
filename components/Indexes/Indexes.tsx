'use client'
import useFetchData from "@/hooks/useFetchData";
import { convertArabicToPersian } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton } from "antd";
import SignedNumber from "./SignedNumber";

interface DataType {
  last: number,
  ins_code: string,
  name: string,
  value: number
}
export default function Indexes() {
  const { data, loading, error } = useFetchData<DataType[]>('v2/market_index');
  if (error instanceof Error) return <p>Error loading data: {error.message}</p>;
  return (
    <div className="container bg-[#f9f9f9] px-4 py-3 mx-auto flex items-center gap-4" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
      {loading ? Array.from({ length: 7 }).map((_, i) => (
        <Skeleton.Input active={true} key={i} />
      )) : data?.map((item) => (
        <div key={`index-${item.ins_code}`} className="flex items-center">
          <Icon icon={item.value > 0 ? 'fluent:triangle-12-filled' : 'fluent:triangle-down-12-filled'} className={'mx-1 ' + (item.value > 0 ? 'text-green-600' : 'text-red-600')} width={12} height={12} />
          <span className="mx-1 text-sm">{convertArabicToPersian(item.name)}:</span>
          <SignedNumber change={item.value} />
        </div>
      ))}
    </div>
  );
}