import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import * as UIDialog from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as UISelect from "@/components/ui/select"
import * as UIForm from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import api from '@/services/api';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Product } from '@/types/global';

const formSchema = z.object({
    quantity: z.coerce.number().int({
        message: "Ingresa un numero entero",
    }).min(1, {
        message: "El valor minimo es 1.",
    }),
    product: z.string({
        required_error: "Selecciona un producto,",
    })
});

interface Props {
    products: Product[]
    getAllProducts: Function;
}

const IncreaseInventory = ({ products, getAllProducts }: Props) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 0,
        },
    })

    const increaseInventory = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const { quantity, product: id } = values;

            const response: AxiosResponse = await api.put(`admin/product/increase/${parseInt(id)}/${quantity}`,);

            if (Object.is(response.status, axios.HttpStatusCode.Ok)) {
                toast({
                    title: "¡Éxito!",
                    description: "Cantidad agregada exitosamente!",
                })
                form.reset();
                getAllProducts();
            }
        }
        catch (error) {
            console.log(error);

            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, tuvimos un error de conexión con el servidor",
            });
        }
        setLoading(false);
    }

    return (
        <UIDialog.Dialog>
            <UIDialog.DialogTrigger asChild>
                <Button>Entrada de productos</Button>
            </UIDialog.DialogTrigger>
            <UIDialog.DialogContent>
                <UIDialog.DialogHeader>
                    <UIDialog.DialogTitle>Aumento de inventario</UIDialog.DialogTitle>
                    <UIDialog.DialogDescription>
                        Ingresa la cantidad para aumentar, debe ser mayor o igual a 1.
                    </UIDialog.DialogDescription>
                </UIDialog.DialogHeader>
                <UIForm.Form {...form}>
                    <form onSubmit={form.handleSubmit(increaseInventory)} className="space-y-4">
                        <UIForm.FormField
                            control={form.control}
                            name="product"
                            render={({ field }) => {
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
                                                    {products.map(product => <UISelect.SelectItem key={product.id} value={product.id?.toString() ?? ""}>{product.name}</UISelect.SelectItem>)}
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
                                    <UIForm.FormLabel>Cantidad</UIForm.FormLabel>
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
                                Agregar{loading && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
                            </Button>
                        </UIDialog.DialogFooter>
                    </form>
                </UIForm.Form>
            </UIDialog.DialogContent>
        </UIDialog.Dialog>
    );
}

export default IncreaseInventory;