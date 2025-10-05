import { useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/tipoCadastro";
import { useForm } from "react-hook-form";
const API_URL = import.meta.env.VITE_API_URL;


export default function Cadastro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TipoCadastro>();

    const onSubmit = async (data: TipoCadastro) => {
        try {
            console.log("Dados enviados: ", data);
            const res = await fetch(API_URL);
            const usuarios = await res.json();
            console.log("Usuários atuais: ", usuarios);

            const duplicado = usuarios.find(
                (u: any) => u.nomeUsuario === data.nomeUsuario || u.email === data.email
            );

            if (duplicado) {
                alert("Nome de usuário ou email já cadastrado!");
                return;
            }

            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            alert("Cadastro realizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <main className="min-h-screen flex flex-col items-center mt-[100px]">
            <h1 className="text-[30px] sm:text-[40px] font-bold mb-6 text-[#00532E]">Cadastro</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#00532E] rounded-lg p-2 w-full max-w-md flex flex-col space-y-4">
                <fieldset className="w-full max-w-md p-4">
                    <div className="flex flex-col">
                        <label htmlFor="nome" className="text-white my-2 font-medium">Nome:</label>
                        <input type="text" id="nome" placeholder="Nome completo" {...register("nome", { required: "Nome obrigatório" })} className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2"/>
                        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="nomeUsuario" className="text-white my-2 font-medium">Nome de usuário:</label>
                        <input type="text" id="nomeUsuario" placeholder="Nome de usuário" {...register("nomeUsuario", { required: "Nome de usuário obrigatório" })} className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2"/>
                        {errors.nomeUsuario && <span className="text-red-500">{errors.nomeUsuario.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-white my-2 font-medium">Email:</label>
                        <input type="text" id="email" placeholder="Email" {...register("email", { required: "Email obrigatório" })} className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2"/>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    <div className="flex">
                        <button type="submit" className="font-medium mx-auto w-[130px] sm:w-[176px] mt-6 bg-white text-[#00532E] py-2 rounded-full">Cadastrar</button>
                    </div>

                    <div>
                        <button type="button" onClick={() => navigate("/")} className="text-white mt-2">Já tem uma conta? Faça login!</button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
}