import * as React from "react"
import * as ReactTable from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Product } from "@/types/global"
import * as TableComponent from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Props {
    products: Product[];
}

const ListProducts = ({ products }: Props) => {
    const data = products;

    const columns: ReactTable.ColumnDef<Product>[] =
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
                accessorKey: "name",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Nombre
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => <div>{row.getValue("name")}</div>,
            },
            {
                accessorKey: "quantity",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Cantidad
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => <div>{row.getValue("quantity")}</div>,
            },
            {
                accessorKey: "active",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Estatus
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }: any) => {
                    const value = row.getValue("active");
                    return (<Badge className="pb-1" variant={value ? 'default' : 'destructive'}>{value ? "Activo" : "Inactivo"}</Badge>);
                },
            }
        ];


    const [sorting, setSorting] = React.useState<ReactTable.SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ReactTable.ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<ReactTable.VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por nombre..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
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

export default ListProducts;