import * as React from "react"
import * as ReactTable from '@tanstack/react-table';
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as TableComponent from "@/components/ui/table"
import * as UISelect from "@/components/ui/select"
import { ProductMovement } from "@/types/global"
import moment from 'moment/min/moment-with-locales';

interface Props {
    movements: ProductMovement[];
}

const ListMovements = ({ movements }: Props) => {
    const data = movements;

    const columns: ReactTable.ColumnDef<ProductMovement>[] =
        [
            {
                accessorKey: "id",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            #&nbsp;&nbsp;
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => (
                    <div>{parseInt(row.id) + 1}</div>
                ),
                enableHiding: false
            },
            {
                accessorKey: "product",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Producto
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => {
                    const product = row.getValue("product")["name"] ?? "No disponible";
                    return (<div>{product}</div>)
                },
            },
            {
                accessorKey: "user",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Usuario
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => {
                    const user = `${row.getValue("user")["firstName"]} ${row.getValue("user")["lastName"]}` ?? "No disponible";
                    return (<div>{user}</div>)
                },
            },
            {
                accessorKey: "type",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Tipo
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => {
                    const type = row.getValue("type");
                    return (<div>{Object.is(type, "INCREASE_INVENTORY") ? "Entrada" : "Salida"}</div>)
                },
            },
            {
                accessorKey: "dateTime",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Fecha y Hora
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => {
                    const date = moment(row.getValue("dateTime")).locale('es').format('LLL');
                    return (<div>{date}</div>)
                },
            },
        ];

    const [sorting, setSorting] = React.useState<ReactTable.SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ReactTable.ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<ReactTable.VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [selectedFilter, setSelectedFilter] = React.useState('');

    const table = ReactTable.useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: ReactTable.getCoreRowModel(),
        getPaginationRowModel: ReactTable.getPaginationRowModel(),
        getSortedRowModel: ReactTable.getSortedRowModel(),
        getFilteredRowModel: ReactTable.getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        const newFilter = value === 'all' ? [] : [{ id: 'type', value: value === 'in' ? 'INCREASE_INVENTORY' : 'DECREASE_INVENTORY' }];
        setColumnFilters(newFilter);
    };

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <UISelect.Select value={selectedFilter} onValueChange={handleFilterChange}>
                    <UISelect.SelectTrigger className="w-[180px]">
                        <UISelect.SelectValue placeholder="Seleccione tipo" />
                    </UISelect.SelectTrigger>
                    <UISelect.SelectContent>
                        <UISelect.SelectGroup>
                            <UISelect.SelectItem value="all">Todos</UISelect.SelectItem>
                            <UISelect.SelectItem value="in">Entrada</UISelect.SelectItem>
                            <UISelect.SelectItem value="out">Salida</UISelect.SelectItem>
                        </UISelect.SelectGroup>
                    </UISelect.SelectContent>
                </UISelect.Select>
            </div>
            <div className="rounded-md border">
                <TableComponent.Table>
                    <TableComponent.TableHeader>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableComponent.TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <TableComponent.TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : ReactTable.flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableComponent.TableHead>
                                    )
                                })}
                            </TableComponent.TableRow>
                        ))}
                    </TableComponent.TableHeader>
                    <TableComponent.TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row: any) => (
                                <TableComponent.TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell: any) => (
                                        <TableComponent.TableCell key={cell.id}>
                                            {ReactTable.flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableComponent.TableCell>
                                    ))}
                                </TableComponent.TableRow>
                            ))
                        ) : (
                            <TableComponent.TableRow>
                                <TableComponent.TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Sin resultados.
                                </TableComponent.TableCell>
                            </TableComponent.TableRow>
                        )}
                    </TableComponent.TableBody>
                </TableComponent.Table>
            </div>
        </div>
    )
}

export default ListMovements;