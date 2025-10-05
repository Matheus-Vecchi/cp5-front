import { useForm } from "react-hook-form";
import type { TipoLogin } from "../../types/tipoLogin";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TipoLogin>();
    
    const onSubmit = async (data: TipoLogin) => {
        try {
            const res = await fetch(API_URL);
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
        <main className="min-h-screen flex flex-col items-center mt-[100px]">
            <h1 className="text-[30px] sm:text-[40px] font-bold mb-6 text-[#00532E]">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#00532E] rounded-lg p-2 w-full max-w-md flex flex-col space-y-4">
                <fieldset className="w-full max-w-md p-4">
                    <div className="flex flex-col">
                        <label htmlFor="nomeUsuario" className="text-white my-2 font-medium">Nome de Usuário:</label>
                        <input type="text" id="nomeUsuario" placeholder="Nome de usuário" {...register("nomeUsuario", { required: "Nome de usuário obrigatório" })} className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2"/>
                        {errors.nomeUsuario && <span className="text-red-500">{errors.nomeUsuario.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-white my-2 font-medium">Email:</label>
                        <input type="text" id="email" placeholder="Email" {...register("email", { required: "Email obrigatório"})} className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2"/>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    <div className="flex">
                        <button type="submit" className="font-medium mx-auto w-[130px] sm:w-[176px] mt-6 bg-white text-[#00532E] py-2 rounded-full">Entrar</button>
                    </div>

                    <div>
                        <button type="button" onClick={() => navigate("/cadastro")} className="text-white mt-2">Não tem uma conta? Cadastre-se</button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
}