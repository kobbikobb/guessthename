import { useMemo } from 'react';
import Table from '../common/Table';

type NameTargetTableProps = {
  data: Array<Object>;
};

export default function NameTargetTable({ data }: NameTargetTableProps) {
  const columns = useMemo(
    () => [
      {
        Header: 'Name targets',
        columns: [
          {
            Header: 'Id',
            accessor: 'id'
          },
          {
            Header: 'Name',
            accessor: 'name'
          }
        ]
      }
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}
