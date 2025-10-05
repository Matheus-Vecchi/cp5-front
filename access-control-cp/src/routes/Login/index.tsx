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

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Formulário de Login</legend>

                    <div>
                        <label htmlFor="nomeUsuario">Nome de Usuário:</label>
                        <input type="text" id="nomeUsuario" placeholder="Nome de usuário" {...register("nomeUsuario", { required: "Nome de usuário obrigatório" })}/>
                        {errors.nomeUsuario && <span className="text-red-500">{errors.nomeUsuario.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" placeholder="Digite seu email" {...register("email", { required: "Email obrigatório"})}/>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    <div>
                        <button type="submit">Entrar</button>
                    </div>

                    <div>
                        <button type="button" onClick={() => navigate("/cadastro")}>Não tem uma conta? Cadastre-se</button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
}