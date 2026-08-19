//elementos da tela de login
const btnEntrar = document.getElementById('btn-entrar');
const inputId = document.getElementById('input-id');
const inputSenha = document.getElementById('input-senha');

//ação do clique 
btnEntrar.addEventListener('click', async () => {
    
    // pegando oq foi digitado
    const idDigitado = inputId.value.trim();
    const senhaDigitada = inputSenha.value;

    //Caso os campos estejam vazios se da o alerta e retorna
    if (!idDigitado || !senhaDigitada) {
        alert("Por favor, preencha o ID e a Senha.");
        return; 
    }

    // pacote json
    const dadosLogin = {
        id: idDigitado,
        senha: senhaDigitada
    };

    try {
        // chamando http request
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosLogin) 
        });

        // abrindo resposta do servidor
        const dadosResposta = await resposta.json();

        // verificando resposta
        if (!resposta.ok) {
            alert("Erro: " + dadosResposta.erro);
            inputSenha.value = ""; 
            return;
        }

        // caso resposta seja sucesso
        console.log("Servidor respondeu:", dadosResposta.mensagem);
        localStorage.setItem("sgfs_token_acesso", dadosResposta.token);
        
        alert("Acesso liberado e Crachá gerado! Indo para o Dashboard...");
        
         window.location.href = "dashboard.html"; 

    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("O servidor está fora do ar. Tente novamente mais tarde.");
    }
});