partidos = partidos.matches;
console.log(partidos);
let table = document.createElement("table");
table.classList.add("table", "table-dark", "table-hover", "table-sm");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);
document.getElementById("root").appendChild(table);
let lineaCabecera = document.createElement("tr");
thead.appendChild(lineaCabecera);
let cabecera = ["Local", "Resultado", "Visitante"];
// let listaJotnada = document.getElementById(jorna)
let checkGanados = document.getElementById(checkG);
let local = [];
let visitante = [];
let resultado = [];
let jornada = [];
let fecha = [];
let fila;
let objetoPartidos = [];

// for (let i = 0; i < partidos.length; i++) {
//   objetoPartidos.push({
//     equipoLocal: `${partidos[i].homeTeam.name}`,
//     equipoVisitante: `${partidos[i].awayTeam.name}`,
//     resultado: `<img class= "logo" src="https://crests.football-data.org/${partidos[i].homeTeam.id}.svg"/>\xa0\xa0 ${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam} \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${partidos[i].awayTeam.id}.svg"/>`,
//   });
// }
// console.log(objetoPartidos);
console.log(resultado);
for (let i = 0; i < partidos.length; i++) {
  local.push(partidos[i].homeTeam.name);
  visitante.push(partidos[i].awayTeam.name);
  jornada.push(partidos[i].matchday);
  let dia = new Date(partidos[i].utcDate);
  fecha.push(dia.toLocaleString("es-ES"));
  if (partidos[i].score.fullTime.homeTeam == null) {
    resultado.push(
      `<img class= "logo" src="https://crests.football-data.org/${partidos[i].homeTeam.id}.svg"/>\xa0\xa0 Sin jugar \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${partidos[i].awayTeam.id}.svg"/>`
    );
  } else {
    resultado.push(
      `<img class= "logo" src="https://crests.football-data.org/${partidos[i].homeTeam.id}.svg"/>\xa0\xa0 ${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam} \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${partidos[i].awayTeam.id}.svg"/>`
    );
  }
}
generarTabla(partidos)
let datosEntrada = document.getElementById("selectTeam").value;

let nombreEquipoInput = partidos.filter((td) => {
  if (
    td.homeTeam.name.includes(datosEntrada) ||
    td.awayTeam.name.includes(datosEntrada)
  ) {
    return true;
  } else {
    return false;
  }
});

function prueba(datosEntrada) {
  if (nombreEquipoInput == false) {
    return borrarTabla(), generarTabla(partidos),console.log(datosEntrada);
  }
  else
  return borrarTabla(),
  console.log(datosEntrada)
}
function borrarTabla() {
  tbody.innerHTML = "";
}
function generarTabla(array) {
  for (let i = 0; i < array.length; i++) {
    fila = document.createElement("tr");
    tbody.appendChild(fila);
    fila.innerHTML = `<td>Jornada ${jornada[i]}</td><td>${local[i]}</td><td>${resultado[i]}</td><td>${visitante[i]}</td><td>${fecha[i]}</td>`;
  }
}

// let homeWinner = partidos.filter(x => x == 'Home_Team')
// console.log(homeWinner)
// for (let i = 0; i < jornada.length; i++) {
//     if (jornada === "1"){
//     fila = document.createElement("tr");
//     tbody.appendChild(fila);
//     fila.innerHTML = `<td>Jornada ${jornada[i]}</td><td>${local[i]}</td><td>${resultado[i]}</td><td>${visitante[i]}</td><td>${fecha[i]}</td>`;
// }
// }
// function prueba() {
//     // Get the checkbox
//     var checkBox = document.getElementById("myCheck");
//     // Get the output text
//     var text = document.getElementById("text");

//     // If the checkbox is checked, display the output text
//     if (checkG.checked == true){
//       generarTabla(jornadaFiltrada)

//     } else {

//     }
//   }
// Crear un array de objetos para los partidos
