function toggleQuantidade() {
// Descobre qual o botão marcado no momento (sobra ou falta).
const tipo = document.querySelector('input[name="TipoRegistro"]:checked').value;
// Pega a div da Quantidade
const divQuantidade = document.getElementById('divQuantidade');

if (tipo === 'sobra') {
divQuantidade.classList.remove('oculto');
} else {
	return
}
}

lucide.createIcons();

function LancarNoSistema(){
    //pega o botão
    // capturar aquilo q foi digitado pelo usuario
    const nomeProduto = document.getElementById('produtoInput').value;
    const quantidade = document.getElementById('quantidadeInput').value;

    const tipo = document.querySelector('input[name="TipoRegistro"]:checked').value;
    
    const btn = document.getElementById('btnLancar');
    //guarda aparencia original pra voltar depois
    const htmlOriginal = btn.innerHTML;

    //simula um cara ou coroa para fins de teste
    //futuramente o PHP vai informar o sucesso ou não
    const deuErro =false;

    if(deuErro){
        //erro:Lançamento Duplicado
        btn.innerHTML ='<i data-lucide="circle-x"></i> Lançamento Duplicado!';
        btn.style.backgroundColor = '#dc2626' //vermelho
    } else {
        //sucesso:registrado
        btn.innerHTML = '<i data-lucide="circle-check"></i> Registrado!';
        btn.style.backgroundColor = '#16a34a' // verde

        // 1. Pega a data/hora crua e exata de agora
const dataLancamento = new Date();

// 2. Extrai apenas a data no padrão brasileiro (Ex: 08/05/2026)
const dataFormatada = dataLancamento.toLocaleDateString('pt-BR');

// 3. Extrai apenas a hora e os minutos (Ex: 17:39)
const horaFormatada = dataLancamento.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

// 4. Junta tudo em um texto bonito
const dataFinal = `${dataFormatada} às ${horaFormatada}`;

        // --- NOVA LÓGICA DE INJEÇÃO AQUI --- //

        // 1. Cria um ID provisório e único baseado na hora atual
        const idProvisorio = Date.now();
      
        


        // 2. Monta o esqueleto do item misturando HTML com as nossas variáveis
        const novoItemHTML = `
            <li class="item-lista" data-id="${idProvisorio}">
                <div class="item-resumo" onclick="toggleGaveta('${idProvisorio}')">
                    <i data-lucide="alert-triangle" style="color:#ca8004;"></i>
                    <span class="badge ${tipo === 'falta' ? 'badge-falta' : 'badge-sobra'}">
                        ${tipo === 'falta' ? 'Falta' : 'Sobra'}: ${quantidade}
                    </span>
                    <div class="nome-produto" style="flex:1; font-weight:bold;">${nomeProduto}</div>
                    <span style="color:#666; font-size:12px;">#cod: S/C</span>
                </div>

                <div id="detalhes-${idProvisorio}" class="item-detalhes oculto" >
                    <div class="data">
                        <div class="date">${dataFinal}</div>
                        <div class="accountID">ID: 71</div>
                    </div>
                    
                    <div class="actions">
                        <<button class="btn-acao btn-editar" onclick="abrirModal('${idProvisorio}')">>
                            <i data-lucide="pencil"></i>
                        </button>
                        <button class="btn-acao btn-apagar" onclick="apagarItem('${idProvisorio}')">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            </li>
        `;

        // 3. Descobre qual é a lista certa para injetar (Falta ou Sobra)
        const idDaLista = tipo === 'falta' ? 'lista-faltas' : 'lista-sobras';
        const listaDestino = document.getElementById(idDaLista);

        // 4. Injeta o item no topo da lista
        listaDestino.insertAdjacentHTML('afterbegin', novoItemHTML);
        lucide.createIcons();
        // Limpa o campo do nome do produto para o próximo lançamento
        document.getElementById('produtoInput').value = '';
        document.getElementById('quantidadeInput').value = '';
    }}
function mudarAba(abaSelecionada) {
            // 1. Pega as divs de conteúdo
            const tabFaltas = document.getElementById('tab-faltas');
            const tabSobras = document.getElementById('tab-sobras');
            
            // 2. Pega os botões das abas
            const btnFaltas = document.getElementById('btn-tab-faltas');
            const btnSobras = document.getElementById('btn-tab-sobras');

            // 3. Esconde os dois conteúdos e tira o visual de "ativo" dos botões
            tabFaltas.classList.add('oculto');
            tabSobras.classList.add('oculto');
            btnFaltas.classList.remove('aba-ativa');
            btnSobras.classList.remove('aba-ativa');

            // 4. Liga apenas o que o vendedor clicou
            if (abaSelecionada === 'faltas') {
                tabFaltas.classList.remove('oculto');
                btnFaltas.classList.add('aba-ativa');
            } else {
                tabSobras.classList.remove('oculto');
                btnSobras.classList.add('aba-ativa');
            }
        }//teste

function toggleGaveta(idPedido){

// 1. Juntamos o prefixo com o número que veio do HTML
    // Se o vendedor clicou no pedido 123, isso vira 'detalhes-123'
    const idDaGaveta = 'detalhes-'+ idPedido;
    // 2. Pescamos a gaveta correta no documento
    const gaveta = document.getElementById(idDaGaveta);
    // 3. O atalho mágico: se tiver a classe ele tira, se não tiver ele põe
    gaveta.classList.toggle('oculto');
}

function apagarItem(idPedido){
    // Usando crases (`) em volta de todo o seletor para a variável funcionar!
    const itemParaApagar = document.querySelector(`li[data-id="${idPedido}"]`);
    

    // Caso encontre o item, a gente remove
    if(itemParaApagar){
        itemParaApagar.remove();
    }
}

function fecharModal() {
    document.getElementById('modalEdicao').classList.add('oculto');
}
function abrirModal(idPedido) {
    // 1. Encontra o item original na lista
    const itemLista = document.querySelector(`li[data-id="${idPedido}"]`);
    
    // 2. Extrai os dados visuais atuais
    const nomeAtual = itemLista.querySelector('.nome-produto').innerText;
    const badgeTexto = itemLista.querySelector('.badge').innerText;
    const qtdAtual = badgeTexto.replace(/[^0-9]/g, ''); 

    // 3. A CORREÇÃO (O PULO DO GATO): Guarda o ID no campo invisível
    document.getElementById('editIdPedido').value = idPedido; 
    
    // 4. Preenche os campos visíveis do modal
    document.getElementById('editProdutoInput').value = nomeAtual;
    document.getElementById('editQuantidadeInput').value = qtdAtual;

    // 5. Abre o modal
    document.getElementById('modalEdicao').classList.remove('oculto');
    lucide.createIcons();
}
function salvarEdicao() {
    // 1. Resgatamos o ID
    const idPedido = document.getElementById('editIdPedido').value;
    console.log("PASSO 1: O ID resgatado do campo invisível é ->", idPedido);

    // 2. Resgatamos os valores
    const novoNome = document.getElementById('editProdutoInput').value;
    const novaQtd = document.getElementById('editQuantidadeInput').value;
    console.log("PASSO 2: O novo nome é ->", novoNome, " | A nova qtd é ->", novaQtd);

    // 3. Buscamos na lista
    console.log("PASSO 3: Procurando por um li com a regra ->", `li[data-id="${idPedido}"]`);
    const itemLista = document.querySelector(`li[data-id="${idPedido}"]`);
    console.log("PASSO 4: O itemLista encontrado foi ->", itemLista);

    // Se o itemLista for nulo, a gente PARA a função aqui para não dar erro na tela
    if (itemLista === null) {
        console.error("ERRO FATAL: O itemLista é null. A função foi abortada antes de quebrar.");
        return; 
    }

    // 4. Injetamos de volta
    itemLista.querySelector('.nome-produto').innerText = novoNome;
    
    const badge = itemLista.querySelector('.badge');
    const textoAtualDoBadge = badge.innerText; 
    
    if (textoAtualDoBadge.includes('Falta')) {
        badge.innerText = `Falta: ${novaQtd}`;
    } else {
        badge.innerText = `Sobra: ${novaQtd}`;
    }

    // 5. Fechamos o modal
    fecharModal();
}