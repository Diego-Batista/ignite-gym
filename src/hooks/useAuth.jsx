import { AuthContext } from "@contexts/AuthContex";
import { useContext } from "react";

export function useAuth(){
    const context = useContext(AuthContext)

    return context
}