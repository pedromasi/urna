let seuVotoPara = document.querySelector('.textoinit span');
let aCargo = document.querySelector('.cargo span');
let descricao = document.querySelector('.restoInfos');
let aviso = document.querySelector('.pBaixo');
let lateral = document.querySelector('.dir');
let numeros = document.querySelector('.numeros');

let etapaAtual = 0;
let numero = '';

function startPhases(){
    let phase = phases[etapaAtual];
    let numeroHtml = '';

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
            fotosHtml += `<div class="dir-img"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
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
    alert("branco em");
}

function corrige(){
    alert("corrige em");
}

function confirma(){
    alert("confirma em");
}

startPhases();