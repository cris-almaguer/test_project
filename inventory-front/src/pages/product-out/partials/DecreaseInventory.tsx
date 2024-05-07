import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import * as UIDialog from "@/components/ui/dialog";
import * as UIForm from "@/components/ui/form"
import * as UISelect from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import api from '@/services/api';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Product } from '@/types/global';

interface Props {
    products: Product[]
    getAllProducts: Function;
}

const DecreaseInventory = ({ products, getAllProducts }: Props) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [currentStock, setCurrentStock] = useState(0);

    const decreaseInventory = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const { quantity, product: id } = values;
            const response: AxiosResponse = await api.put(`warehouseman/product/decrease/${id}/${quantity}`);

            if (Object.is(response.status, axios.HttpStatusCode.Ok)) {
                toast({
                    title: "¡Éxito!",
                    description: "Cantidad retirada exitosamente!",
                });
                form.reset();
                getAllProducts();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, tuvimos un error de conexión con el servidor",
            });
        }
        setLoading(false);
    };

    const formSchema = z.object({
        product: z.string({
            required_error: "Selecciona un producto,",
        }),
        quantity: z.coerce.number().min(1, "El valor mínimo es 1.")
            .max(currentStock, "La cantidad no puede ser mayor que el stock.")
            .int({ message: "Ingresa un número entero" }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            quantity: 0,
            product: "",
        },
    });

    return (
        <UIDialog.Dialog>
            <UIDialog.DialogTrigger asChild>
                <Button>Salida de productos</Button>
            </UIDialog.DialogTrigger>
            <UIDialog.DialogContent>
                <UIDialog.DialogHeader>
                    <UIDialog.DialogTitle>Sacar inventario de almacén</UIDialog.DialogTitle>
                    <UIDialog.DialogDescription>
                        Ingresa la cantidad a retirar, recuerda que debe ser mayor o igual a 1 además de menor o igual que el stock disponible.
                    </UIDialog.DialogDescription>
                </UIDialog.DialogHeader>
                <UIForm.Form {...form}>
                    <form onSubmit={form.handleSubmit(decreaseInventory)} className="space-y-4">
                        <UIForm.FormField
                            control={form.control}
                            name="product"
                            render={({ field }) => {
                                if (field.value) {
                                    const quantity = products.find((product) => product.id === parseInt(field.value))?.quantity;
                                    setCurrentStock(quantity ?? 0);
                                }

                                return (
                                    <>
                                        {
                                            field.value && <div>
                                                <small className="text-sm leading-none mt-2"><p className='font-medium'>Stock actual:</p>{" "}
                                                    {products.find((product) => product.id === parseInt(field.value))?.quantity}
                                                </small>
                                            </div>
                                        }
                                        <UIForm.FormItem>
                                            <UIForm.FormLabel>Producto</UIForm.FormLabel>
                                            <UISelect.Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <UIForm.FormControl>
                                                    <UISelect.SelectTrigger>
                                                        <UISelect.SelectValue placeholder="Selecciona una opción" />
                                                    </UISelect.SelectTrigger>
                                                </UIForm.FormControl>
                                                <UISelect.SelectContent>
                                                    {products.filter(p => p.quantity > 0).map(product => <UISelect.SelectItem key={product.id} value={product.id?.toString() ?? ""}>{product.name}</UISelect.SelectItem>)}
                                                </UISelect.SelectContent>
                                            </UISelect.Select>
                                            <UIForm.FormMessage />
                                        </UIForm.FormItem>
                                    </>
                                )
                            }}
                        />
                        <UIForm.FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <UIForm.FormItem>
                                    <UIForm.FormLabel>Cantidad a retirar</UIForm.FormLabel>
                                    <UIForm.FormControl>
                                        <Input
                                            type="number" {...field} />
                                    </UIForm.FormControl>
                                    <UIForm.FormMessage />
                                </UIForm.FormItem>
                            )}
                        />
                        <UIDialog.DialogFooter>
                            <Button disabled={loading} type='submit'>
                                Retirar{loading && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
                            </Button>
                        </UIDialog.DialogFooter>
                    </form>
                </UIForm.Form>
            </UIDialog.DialogContent>
        </UIDialog.Dialog>
    );
}

export default DecreaseInventory;