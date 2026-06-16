async function buscarClima(){

const cidade =
document.getElementById("city")
.value;

if(!cidade){
alert("Digite uma cidade");
return;
}

try{

// Busca coordenadas

const geo =
await fetch(
`https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`
);

const geoData =
await geo.json();

if(!geoData.results){

alert("Cidade não encontrada");
return;
}

const local =
geoData.results[0];

const lat =
local.latitude;

const lon =
local.longitude;

// Busca clima

const clima =
await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m`
);

const climaData =
await clima.json();

const atual =
climaData.current;

document.getElementById(
"cidade"
).innerText =
local.name;

document.getElementById(
"temperatura"
).innerText =
`${atual.temperature_2m}°C`;

document.getElementById(
"vento"
).innerText =
atual.wind_speed_10m;

document.getElementById(
"sensacao"
).innerText =
atual.apparent_temperature;

// Tradução simplificada

let descricao = "Tempo Limpo";
let emoji = "☀️";

switch(atual.weather_code){

case 0:
descricao="Céu Limpo";
emoji="☀️";
break;

case 1:
case 2:
case 3:
descricao="Parcialmente Nublado";
emoji="⛅";
break;

case 45:
case 48:
descricao="Neblina";
emoji="🌫️";
break;

case 51:
case 53:
case 55:
descricao="Garoa";
emoji="🌦️";
break;

case 61:
case 63:
case 65:
descricao="Chuva";
emoji="🌧️";
break;

case 71:
case 73:
case 75:
descricao="Neve";
emoji="❄️";
break;

case 95:
descricao="Tempestade";
emoji="⛈️";
break;
}

document.getElementById(
"condicao"
).innerText =
descricao;

document.getElementById(
"icone"
).innerText =
emoji;

// Fundo dinâmico

const body =
document.body;

if(emoji === "☀️")
body.style.background =
"#f59e0b";

else if(
emoji === "🌧️"
||
emoji === "🌦️"
)
body.style.background =
"#334155";

else if(
emoji === "⛈️"
)
body.style.background =
"#1e293b";

else
body.style.background =
"#0f172a";

}
catch(error){

console.error(error);

alert(
"Erro ao buscar clima"
);

}

}