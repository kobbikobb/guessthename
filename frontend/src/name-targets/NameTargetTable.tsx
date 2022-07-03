import { useMemo } from 'react';
import Table from '../common/Table';
import { Link } from 'react-router-dom';

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
            Header: 'Name',
            accessor: 'name',
            Cell: (e: { value: string; row: { original: { id: string } } }) => (
              <Link to={`/guess?nameTargetId=${e.row.original.id}`}>
                {e.value}
              </Link>
            )
          }
        ]
      }
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}
