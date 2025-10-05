export default function Header() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado") || "null");

    return(
        <header >
            <div className="h-[8vh] sm:h-[10vh] bg-[#00532E] shadow-xl flex items-center justify-center">
                <img className="w-[140px] sm:w-[160px] mt-[90px]" src="/palmeiras-logo.png" alt="Logo do Palmeiras"/>
            </div>

            {usuarioLogado && (
                <div className="text-center mt-26 text-[#00532E] font-bold">
                    <p>Bem vindo, <span className="text-[#FFD700]">{usuarioLogado.nome}</span>!</p>
                    <p>Seu email é: <span className="text-[#FFD700]">{usuarioLogado.email}</span></p>
                </div>
            )}
        </header>
    );
}