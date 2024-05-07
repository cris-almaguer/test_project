import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api";
import { useEffect, useState } from "react";
import ListProducts from "./partials/ListProducts";
import { useSelector } from "react-redux";
import { UserRoles } from "@/utils/roles-enums";
import { useNavigate } from "react-router-dom";
import DecreaseInventory from "./partials/DecreaseInventory";

const ProductOut = () => {
    const [products, setProducts] = useState([]);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { userData: { roles } } = useSelector((state: any) => state.auth);
    const { name: roleName } = roles[0];
    const isAdmin = Object.is(roleName, UserRoles.ROLE_ADMIN);

    const getAllProducts = async () => {
        try {
            const response = await api.get('any/products/get/active');
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
        if (isAdmin) {
            navigate('/inventory');
            return;
        }
        getAllProducts();
    }, []);

    return (
        <div className="w-full">
            <div className="flex gap-3 mx-auto py-2">
                {products.length > 0 && <DecreaseInventory getAllProducts={getAllProducts} products={products} />}
            </div>
            <ListProducts products={products} />
        </div>
    );
}

export default ProductOut;