import { useMemo } from 'react';
import Table from '../common/Table';
import { useLinkColumn, useColumn } from '../common/useColumns';

type NameTarget = {
  title: string;
  createdAt: string;
};

type NameTargetTableProps = {
  data: NameTarget[];
};

export default function NameTargetTable({ data }: NameTargetTableProps) {
  const titleColumn = useLinkColumn({
    header: 'Title',
    accessorKey: 'title',
    createLink(id) {
      return `/guess?nameTargetId=${id}`;
    }
  });

  const createdAtColumn = useColumn({
    header: 'Created at',
    accessorKey: 'createdAt'
  });

  const columns = useMemo(
    () => [
      {
        header: 'Name targets',
        columns: [titleColumn, createdAtColumn]
      }
    ],
    []
  );

  if (data.length === 0) {
    return (
      <div style={{ fontStyle: 'italic' }}>
        A name target is a name to be guessed, please create one!{' '}
      </div>
    );
  }

  return <Table columns={columns} data={data} />;
}
