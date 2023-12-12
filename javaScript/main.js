const chaveApi = "df91079ca507419088e141002231212";
const botaoBusca = document.querySelector(".bt-busca");

botaoBusca.addEventListener("click", async () =>{
    const cidade = document.getElementById("input-busca").value;
    
    if(!cidade) return;

    const dadosApi = await buscarDadosCidade(cidade);

    if(dadosApi) preencherDadosTela(dadosApi);

});

async function buscarDadosCidade(cidade){
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    if(resposta.status !== 200) return;

    const dados = resposta.json();  
    console.log(dados);

    return dados

}

function preencherDadosTela(dadosApi){
    const cidade = dadosApi.location.name;
    const pais = dadosApi.location.country;
    const regiao = dadosApi.location.region;
    const temperatura = dadosApi.current.temp_c;
    const condicao = dadosApi.current.condition.text;
    const condicaoDia = dadosApi.current.is_day;
    const umidade = dadosApi.current.humidity;
    const velVento = dadosApi.current.wind_kph;
    const iconeCondicao = dadosApi.current.condition.icon;

    document.getElementById("cidade").textContent = `${cidade} - ${regiao}, ${pais}`;
    document.getElementById("temperatura").textContent = `${temperatura} °C`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("umidade").textContent = `${umidade}%`;
    document.getElementById("velocidade-vento").textContent = `${velVento} Km/h`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao)

    if(condicaoDia == 0){
        document.getElementById("condicao-dia").textContent = "Noite"
    }else{
        document.getElementById("condicao-dia").textContent = "Dia"
    }

}