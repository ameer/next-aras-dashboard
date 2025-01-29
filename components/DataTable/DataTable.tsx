"use client"
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { formatNumber, convertBigNumber, positiveMinusClass } from '../../utils'

interface DataTableProps extends TableProps {
  columns: Required<Array<{ [key: string]: unknown | undefined }>>;
}

const formatChange = (value: number) : React.ReactNode => {
  const classNameMap = { positive: 'text-green-600', negative: 'text-red-600' }
  const cssClass = positiveMinusClass(value, classNameMap.positive, classNameMap.negative);
  return <span className={cssClass}>{formatNumber(value)}</span>
}
function formatColumns (columns: Array<{ [key: string]: unknown | undefined }>) : TableProps['columns'] {
  return columns.map((column) => {
    switch (column.type) {
    case 'number':
      column.className = 'mono'
      column.render = (value: number) => formatNumber(value);
      break;
    case 'bigNumber':
      column.className = 'mono'
      column.render = (value: number) => {
        if(column.parts){
          const [number, suffix, emphasis] = convertBigNumber(value, column.noFraction, column.parts) as [string, string, string]
          return <span>{number} <strong className={`body-font text-sm text-gray-${emphasis}`}>{suffix}</strong></span>
        } else {
          return convertBigNumber(value, column.noFraction)
        }
      };
      break;
    case 'hasChange':
      column.className = 'mono'
      column.render = (value: number) => formatChange(value);
      break;
    default:
      break;
    }
    return column;
  });
}

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  return (
    <Table
      {...props}
      className='table-border-collapse'
      columns={formatColumns(props.columns)}
    />
  );
}
export default DataTable