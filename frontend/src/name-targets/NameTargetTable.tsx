import { useMemo } from 'react';
import Table from '../common/Table';
import { Link } from 'react-router-dom';

type Props = {
  data: Array<Object>;
};

export default function NameTargetTable({ data }: Props) {
  const columns = useMemo(
    () => [
      {
        Header: 'Name targets',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
            Cell: (e: { value: string; row: { original: { id: string } } }) => (
              <Link to={`/guess?nameTargetId=${e.row.original.id}`}>
                {e.value}
              </Link>
            )
          },
          {
            Header: 'Created at',
            accessor: 'createdAt'
          }
        ]
      }
    ],
    []
  );

  if(data.length === 0) {
    return <div style={{fontStyle: 'italic'}}>No name targets! A name target is a name to be guessed, please create one! </div>;
  }
  
  return <Table columns={columns} data={data} />;
}
