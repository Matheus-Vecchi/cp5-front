import { useForm } from "react-hook-form";
import type { TipoLogin } from "../../types/tipoLogin";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TipoLogin>();

    const onSubmit = async (data: TipoLogin) => {
        try {
            const res = await fetch("http://localhost:3001/usuarios");
            const usuarios = await res.json();

            const user = usuarios.find(
                (u: any) => u.nomeUsuario === data.nomeUsuario && u.email === data.email
            );

            if (user) {
                sessionStorage.setItem("usuarioLogado", JSON.stringify(user));
                navigate("/");
            } 
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <main className="text-center mt-[12vh]">
            <h1 className="text-[30px] sm:text-[40px]">Login</h1>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                </form>
            </div>
        </main>
    );
}