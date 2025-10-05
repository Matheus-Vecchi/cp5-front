import { useNavigate } from "react-router-dom";
import type { TipoCadastro } from "../../types/tipoCadastro";
import { useForm } from "react-hook-form";
const API_URL = import.meta.env.VITE_API_URL_BASE;


export default function Cadastro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TipoCadastro>();

    const onSubmit = async (data: TipoCadastro) => {
        try {
            const res = await fetch(API_URL);
            const usuarios = await res.json();

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
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <main className="text-center mt-[12vh]">
            <h1 className="text-[30px] sm:text-[40px]">Cadastro</h1>
        </main>
    );
}