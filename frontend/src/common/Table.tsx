import {
    useReactTable,
    flexRender,
    ColumnDef, // eslint-disable-line import/named
    getCoreRowModel
} from '@tanstack/react-table';
import BTable from 'react-bootstrap/Table';

type TableProps = {
    columns: Array<ColumnDef<object>>;
    data: Array<object>;
};

export default function Table({ columns, data }: TableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <BTable striped bordered hover>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </BTable>
    );
}
