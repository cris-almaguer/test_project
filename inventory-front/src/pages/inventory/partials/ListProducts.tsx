import * as React from "react"
import * as ReactTable from "@tanstack/react-table"
import { ArrowUpDown, ChevronDownIcon, EllipsisIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as TableComponent from "@/components/ui/table"
import { Product } from "@/types/global"
import { Badge } from "@/components/ui/badge"
import * as UIDropdownMenu from "@/components/ui/dropdown-menu"
import * as UIAlertDialog from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import api from "@/services/api"
import axios, { AxiosResponse } from "axios"

interface Props {
    products: Product[];
    getAllProducts: Function;
    isAdmin: boolean;
}

const ListProducts = ({ products, getAllProducts, isAdmin }: Props) => {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);
    const [showActives, setShowActives] = React.useState(true);
    const [showInactives, setShowInactives] = React.useState(true);
    const data = products;

    const deleteRecord = async (id: number) => {
        setLoading(true);
        try {
            const response: AxiosResponse = await api.patch(`admin/product/toggle/${id}`);

            if (Object.is(response.status, axios.HttpStatusCode.Ok)) {
                toast({
                    title: "¡Éxito!",
                    description: "Estatus modificado exitosamente!",
                })
                getAllProducts();
            }
        }
        catch (error) {
            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, tuvimos un error de conexión con el servidor",
            });
        }
        setLoading(false);
    }

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

    if (isAdmin) {
        columns.push({
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const rowId: number = parseInt(row.getValue("id"));
                const value = row.getValue("active");
                return (
                    <UIDropdownMenu.DropdownMenu>
                        <UIDropdownMenu.DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir men&uacute;</span>
                                <EllipsisIcon className="h-4 w-4" />
                            </Button>
                        </UIDropdownMenu.DropdownMenuTrigger>
                        <UIDropdownMenu.DropdownMenuContent align="end">
                            <UIDropdownMenu.DropdownMenuLabel>Acciones</UIDropdownMenu.DropdownMenuLabel>
                            <UIDropdownMenu.DropdownMenuSeparator />
                            <UIAlertDialog.AlertDialog>
                                <UIAlertDialog.AlertDialogTrigger asChild>
                                    <Button className="w-full bg-transparent text-black hover:text-slate-50">
                                        {value ? "Desactivar" : "Activar"}
                                    </Button>
                                </UIAlertDialog.AlertDialogTrigger>
                                <UIAlertDialog.AlertDialogContent>
                                    <UIAlertDialog.AlertDialogHeader>
                                        <UIAlertDialog.AlertDialogTitle>¿Está completamente seguro?</UIAlertDialog.AlertDialogTitle>
                                        <UIAlertDialog.AlertDialogDescription>
                                            Esta acción {value ? "va a desactivar" : "activará"} registro.
                                        </UIAlertDialog.AlertDialogDescription>
                                    </UIAlertDialog.AlertDialogHeader>
                                    <UIAlertDialog.AlertDialogFooter>
                                        <UIAlertDialog.AlertDialogCancel>Cancelar</UIAlertDialog.AlertDialogCancel>
                                        <UIAlertDialog.AlertDialogAction disabled={loading} onClick={() => deleteRecord(rowId)}>
                                            Continuar{loading && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
                                        </UIAlertDialog.AlertDialogAction>
                                    </UIAlertDialog.AlertDialogFooter>
                                </UIAlertDialog.AlertDialogContent>
                            </UIAlertDialog.AlertDialog>
                        </UIDropdownMenu.DropdownMenuContent>
                    </UIDropdownMenu.DropdownMenu>
                )
            },
        })
    }

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

    const filterProducts = () => {
        if (showActives && showInactives) {
            table.getColumn("active")?.setFilterValue(undefined)
        } else if (showActives) {
            table.getColumn("active")?.setFilterValue(true)
        } else if (showInactives) {
            table.getColumn("active")?.setFilterValue(false)
        } else {
            table.getColumn("active")?.setFilterValue(null)
        }
    };

    React.useEffect(() => {
        filterProducts();
    }, [showActives, showInactives]);

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
                <UIDropdownMenu.DropdownMenu>
                    <UIDropdownMenu.DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filtrar por estatus <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </UIDropdownMenu.DropdownMenuTrigger>
                    <UIDropdownMenu.DropdownMenuContent align="end">
                        <UIDropdownMenu.DropdownMenuCheckboxItem
                            className="capitalize"
                            checked={showActives}
                            onCheckedChange={(value) => setShowActives(value)}
                        >
                            Activos
                        </UIDropdownMenu.DropdownMenuCheckboxItem>
                        <UIDropdownMenu.DropdownMenuCheckboxItem
                            className="capitalize"
                            checked={showInactives}
                            onCheckedChange={(value) => setShowInactives(value)}
                        >
                            Inactivos
                        </UIDropdownMenu.DropdownMenuCheckboxItem>
                    </UIDropdownMenu.DropdownMenuContent>
                </UIDropdownMenu.DropdownMenu>
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