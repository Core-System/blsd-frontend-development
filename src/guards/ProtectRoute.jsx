import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

export function ProtectRoute({ rolesPermitidas }){
  const { usuario } = useAuth();

  if (!usuario) {
    toast.info("Faça login para acessar essa funcionalidade.", { id: 'auth-required' });
    return <Navigate to="/login" replace />;
  }

  const ehAutorizado = rolesPermitidas.includes(usuario.acesso?.nome);

  if (!ehAutorizado) {
    toast.info("Você não tem permissão para acessar essa funcionalidade.", { id: 'auth-forbidden' });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}