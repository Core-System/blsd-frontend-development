import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export function ProtectRoute({ rolesPermitidas }){
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('user_role');

  if (!token) {
    toast.info("Você não tem autorização para acessar essa funcionalidade.")
    return <Navigate to="/login" replace />;
  }

  const ehAutorizado = rolesPermitidas.includes(userRole);

  if (!ehAutorizado) {
    console.log("Aqui")
    toast.info("Você não tem permissão para acessar essa funcionalidade.")
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}