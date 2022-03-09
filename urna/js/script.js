//Criando variáveis para melhor controle do DOM
let tela = document.querySelector('.tela');
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//Criando variáveis de controle de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

//Criando funções funcionais
function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i < (etapa.numeros-1); i++) {
        if(i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        }
        numeroHTML += '<div class="numero"></div>';
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        
        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHTML += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso pisca">VOTO NULO</div>';
        
    }
}

function clicou(n) {
    let numeroAtual = document.querySelector('.numero.pisca');
    if(numeroAtual !== null) {
        numeroAtual.innerHTML = n;
        numero = `${numero}${n}`;

        numeroAtual.classList.remove('pisca');
        if(numeroAtual.nextElementSibling !== null) {
            numeroAtual.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}

function corrigir() {
    comecarEtapa();
}

function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso pisca">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em BRANCO, não pode digitar nenhum número, CORRIJA e aperte novamente.")
    }
}

function confirmar() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        console.log("Voto computado. O voto foi: BRANCO");
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log("Voto computado. O voto foi: " + numero);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            tela.innerHTML = '<div class="fim">FIM</div>';
            console.log(votos);
        }
    }
}

//Iniciando o script
comecarEtapa();