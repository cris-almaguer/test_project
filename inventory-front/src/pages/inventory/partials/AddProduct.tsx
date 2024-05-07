import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import * as UIDialog from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as UIForm from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import api from '@/services/api';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface Props {
    getAllProducts: Function;
}

const formSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre debe tener al menos 3 caracteres",
    }),
})

const AddProduct = ({ getAllProducts }: Props) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    })

    const addProduct = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const { name } = values;
            const response: AxiosResponse = await api.post("admin/products/add", { name: name });

            if (Object.is(response.status, axios.HttpStatusCode.Created)) {
                toast({
                    title: "¡Éxito!",
                    description: "Producto agregado exitosamente!",
                })
                form.reset();
                getAllProducts();
            }
        }
        catch (error) {
            setLoading(false);
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
                <Button>Agregar producto</Button>
            </UIDialog.DialogTrigger>
            <UIDialog.DialogContent className="sm:max-w-[425px]">
                <UIDialog.DialogHeader>
                    <UIDialog.DialogTitle>Añadir producto</UIDialog.DialogTitle>
                    <UIDialog.DialogDescription>
                        Completa el siguiente formulario para añadir un nuevo producto en el sistema.
                    </UIDialog.DialogDescription>
                </UIDialog.DialogHeader>
                <UIForm.Form {...form}>
                    <form onSubmit={form.handleSubmit(addProduct)} className="space-y-4">
                        <UIForm.FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <UIForm.FormItem>
                                    <UIForm.FormLabel>Nombre del producto</UIForm.FormLabel>
                                    <UIForm.FormControl>
                                        <Input {...field} />
                                    </UIForm.FormControl>
                                    <UIForm.FormMessage />
                                </UIForm.FormItem>
                            )}
                        />
                        <UIDialog.DialogFooter>
                            <Button disabled={loading} type='submit'>
                                Agregar{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            </Button>
                        </UIDialog.DialogFooter>
                    </form>
                </UIForm.Form>
            </UIDialog.DialogContent>
        </UIDialog.Dialog>
    )
}

export default AddProduct;
