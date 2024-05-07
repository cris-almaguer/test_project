import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../../utils/helper-functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchUserData, login } from '../../store/slices/authThunk';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const formSchema = z.object({
    email: z.string().min(8, {
        message: "El email debe tener al menos 8 caracteres",
    }).email("Ingresa un email valido"),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
})

const Login = () => {
    const { accessToken, loading } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast()
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    useEffect(() => {
        if (accessToken || getToken()) {
            dispatch(fetchUserData());
            navigate('/inventory');
        }
    }, [accessToken, dispatch, navigate]);

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        const { email, password } = values;
        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            await dispatch(fetchUserData());
            navigate('/inventory');
        } else {
            toast({
                variant: "destructive",
                title: "Oops!.",
                description: "Verifica la información de inicio"
            });
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center px-4'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Introduzca su dirección de correo electrónico para acceder a su cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input type='email' placeholder="example@test.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={loading} type='submit' className="w-full">
                                {loading ? <Loader2 className="mx-2 h-4 w-4 animate-spin" /> : "Iniciar"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
