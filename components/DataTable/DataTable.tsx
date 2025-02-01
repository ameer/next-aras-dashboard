"use client"
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { formatNumber, convertBigNumber, positiveMinusClass } from '../../utils'
import { AnyObject } from 'antd/es/_util/type';

interface DataTableProps extends TableProps {
  columns: Required<Array<{ [key: string]: unknown | undefined | number }>>;
}

const formatChange = (value: number, numberOfFractions: number = 0, customClassName: string = '') : React.ReactNode => {
  const classNameMap = { positive: 'text-green-600', negative: 'text-red-600' }
  let cssClass = ''
  if(customClassName !== '') {
    cssClass = customClassName
  } else {
    cssClass = positiveMinusClass(value, classNameMap.positive, classNameMap.negative)
  }
  return <span className={cssClass}>{formatNumber(value, numberOfFractions)}</span>
}
function formatColumns (columns: Array<{ [key: string]: unknown | undefined | number }>) : TableProps['columns'] {
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
          const [number, suffix, emphasis] = convertBigNumber(value, Number(column.numberOfFractions), column.parts) as [string, string, string]
          return <span>{number} <strong className={`body-font text-sm text-gray-${emphasis}`}>{suffix}</strong></span>
        } else {
          return convertBigNumber(value, Number(column.numberOfFractions))
        }
      };
      break;
    case 'hasChange':
      column.className = 'mono ' + (column.dataIndex === 'last' ? 'last-price__cell' : '')
      let customClassName = ''
      column.render = (value: number, record: AnyObject) => {
        if(column.isPercent){
          value = value * 100
        }
        if(column.hasFlag) {
          if(record.flag > 0) {
            customClassName = 'text-green-600'
          } else if(record.flag < 0) {
            customClassName = 'text-red-600'
          } else if (record.flag === 0) {
            customClassName = 'text-black'
          }
        }
        return formatChange(value, Number(column.numberOfFractions || 0), customClassName);
      };
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