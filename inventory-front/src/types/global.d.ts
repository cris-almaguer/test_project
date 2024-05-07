import { UserRoles } from "@/utils/roles-enums";

export type ActivityType = "TOGGLE_STATUS" | "INCREASE_INVENTORY" | "DECREASE_TYPE_CONST" | "ADD_PRODUCT";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthPayload {
    accessToken: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
    auth: string;
}

export interface AuthState {
    accessToken: string | null;
    loading: boolean;
    userData: User | {};
    status: string;
    error: string | unknown;
}

export interface Product {
    id?: number;
    name: string;
    quantity: number;
    active: boolean;
}

export interface ProductMovement {
    id: number;
    product: Product;
    type: ActivityType;
    user: User;
    dateTime: string;
}