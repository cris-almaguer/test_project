import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api";
import { ProductMovement } from "@/types/global";
import { UserRoles } from "@/utils/roles-enums";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListMovements from "./partials/ListMovements";

const History = () => {

    const [movements, setMovements] = useState<ProductMovement[]>([]);
    const { userData: { roles } } = useSelector((state: any) => state.auth);
    const { name: roleName } = roles[0];
    const isAdmin = Object.is(roleName, UserRoles.ROLE_ADMIN);
    const { toast } = useToast();
    const navigate = useNavigate();

    const getAllMovements = async () => {
        try {
            const response = await api.get('admin/movements/get');
            setMovements(response.data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oops!.",
                description: "Hubo un error al cargar la información del servidor"
            })
        }
    }

    useEffect(() => {
        if (!isAdmin) {
            navigate('/inventory');
            return;
        }
        getAllMovements();
    }, []);

    return (
        <div className="w-full">
            <ListMovements movements={movements} />
        </div>
    );
}

export default History;