import { CircleUser, Menu, Package2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { UserRoles } from "@/utils/roles-enums";
import { signOut } from "@/store/slices/authThunk";

const AuthNav = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { userData: { firstName, lastName, email, roles } } = useSelector((state: any) => state.auth);
    const { name: roleName } = roles[0];
    const isAdmin = Object.is(roleName, UserRoles.ROLE_ADMIN);

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden md:flex flex-col md:flex-row items-center gap-6 text-lg font-medium md:text-sm">
                <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Package2 className="h-6 w-6" />
                </div>
                <Link
                    to="/inventory"
                    className={`${location.pathname === "/inventory" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                >
                    Inventario
                </Link>
                {!isAdmin && (
                    <Link
                        to="/product-out"
                        className={`${location.pathname === "/product-out" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                    >
                        Salida
                    </Link>
                )}
                {isAdmin && (
                    <Link
                        to="/history"
                        className={`${location.pathname === "/history" ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                    >
                        Historial
                    </Link>
                )}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <div
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Test</span>
                        </div>
                        <Link to={"/inventory"}
                            className={`${location.pathname === "/inventory" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                        >
                            Inventario
                        </Link>
                        {
                            !isAdmin && <Link
                                to={"/product-out"}
                                className={`${location.pathname === "/product-out" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                            >
                                Salida
                            </Link>
                        }
                        {
                            isAdmin && <Link
                                to={"/history"}
                                className={`${location.pathname === "/history" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                            >
                                Historial
                            </Link>
                        }
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 text-end">
                <div className="ml-auto flex-1 sm:flex-initial mt-1">
                    <p className="text-sm font-medium leading-3">{`${firstName} ${lastName}`}</p>
                    <small className="text-xs font-light leading-3">{isAdmin ? "Administrador" : "Almacenista"}</small>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => dispatch(signOut())}>Salir</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default AuthNav;