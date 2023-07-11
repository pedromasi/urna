let seuVotoPara = document.querySelector('.textoinit span');
let aCargo = document.querySelector('.cargo span');
let descricao = document.querySelector('.restoInfos');
let aviso = document.querySelector('.pBaixo');
let lateral = document.querySelector('.dir');
let numeros = document.querySelector('.numeros');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function startPhases(){
    let phase = phases[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i<phase.numeros;i++){
        if(i === 0){
            numeroHtml += '<div class="num pisca"></div>';
        } else{
            numeroHtml += '<div class="num"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    aCargo.innerHTML = phase.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface(){
    let phase = phases[etapaAtual];
    let candidato = phase.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    if(candidato.length){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.name}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="dir-img small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="dir-img"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class = "aviso--grande pisca">VOTO NULO</div>';
    }

}


function clicou(n){
   let elNumero = document.querySelector('.num.pisca');
   if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
   }
}

function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class = "aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em branco, não pode digitar nenhum número!")
    }
}

function corrige(){
    startPhases();
}

function telaFim(){
    seuVotoPara.style.display = 'none';
    aCargo.innerHTML = '';
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = '';

    document.querySelector('.tela').innerHTML = '<div class = "fim">FIM!</div>';
}

function confirma(){
    let phase = phases[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
    } else if(numero.length === phase.numeros){
        votoConfirmado = true;
    }

    if(votoConfirmado){
        etapaAtual++;
        if(phases[etapaAtual] !== undefined){
            startPhases();
        } else{
            telaFim();
        }
    }
}

startPhases();