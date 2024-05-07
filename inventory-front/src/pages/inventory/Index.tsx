import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api";
import { useEffect, useState } from "react";
import ListProducts from "./partials/ListProducts";
import AddProduct from "./partials/AddProduct";
import { useSelector } from "react-redux";
import { UserRoles } from "@/utils/roles-enums";
import IncreaseInventory from "./partials/IncreaseInventory";
import { Product } from "@/types/global";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const { toast } = useToast();
    const { userData: { roles } } = useSelector((state: any) => state.auth);
    const { name: roleName } = roles[0];
    const isAdmin = Object.is(roleName, UserRoles.ROLE_ADMIN);

    const getAllProducts = async () => {
        try {
            const response = await api.get('any/products/get');
            setProducts(response.data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oops!.",
                description: "Hubo un error al cargar la información del servidor"
            })
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="w-full">
            {
                isAdmin && <div className="flex gap-3 mx-auto py-2">
                    <AddProduct getAllProducts={getAllProducts} />
                    {products.length > 0 && <IncreaseInventory getAllProducts={getAllProducts} products={products.filter((product: Product) => product.active)} />}
                </div>
            }
            <ListProducts products={products} getAllProducts={getAllProducts} isAdmin={isAdmin} />
        </div>
    );
}

export default Inventory;