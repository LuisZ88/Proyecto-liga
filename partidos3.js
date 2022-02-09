partidos = partidos.matches;
let table = document.createElement("table");
table.classList.add("table", "table-dark", "table-hover", "table-sm");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);
document.getElementById("root").appendChild(table);
let selectTeam = document.getElementById("selectTeam")
let pGanados = document.getElementById("gCheck");
let pPerdidos = document.getElementById("pCheck");
let pEmpatados = document.getElementById("eCheck");

generarTabla(partidos);
function generarTabla(array) {
  for (let i = 0; i < array.length; i++) {
    let jornada = array[i].matchday;
    let local = array[i].homeTeam.name;
    let visitante = array[i].awayTeam.name;
    let resultado;
    if (array[i].score.fullTime.homeTeam == null) {
      resultado = `<img class= "logo" src="https://crests.football-data.org/${array[i].homeTeam.id}.svg"/>\xa0\xa0 Sin jugar \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${array[i].awayTeam.id}.svg"/>`;
    } else {
      resultado = `<img class= "logo" src="https://crests.football-data.org/${array[i].homeTeam.id}.svg"/>\xa0\xa0 ${array[i].score.fullTime.homeTeam} - ${array[i].score.fullTime.awayTeam} \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${array[i].awayTeam.id}.svg"/>`;
    }
    let dia = new Date(array[i].utcDate);
    dia = dia.toLocaleString("es-ES");
    fila = document.createElement("tr");
    tbody.appendChild(fila);
    fila.innerHTML = `<td>Jornada ${jornada}</td><td>${local}</td><td>${resultado}</td><td>${visitante}</td><td>${dia}</td>`;
  }
}

function borrarTabla() {
  tbody.innerHTML = "";
}
// generarTabla(partidos)
let envio = document.getElementById("envio");
envio.addEventListener("click", function (event) {
  event.preventDefault();
  filtro(selectTeam.value);
});

function filtro(equipo) {
  let partidoFiltrado = [];
  borrarTabla();
  console.log(partidoFiltrado);
  // si existe el equipo esto
  for (let i = 0; i < partidos.length; i++) {
    if (pGanados.checked == true) {
      if (
        (equipo == partidos[i].homeTeam.name &&
          partidos[i].score.winner == "HOME_TEAM") ||
        (equipo == partidos[i].awayTeam.name &&
          partidos[i].score.winner == "AWAY_TEAM")
      ) {
        partidoFiltrado.push(partidos[i]);
      }
      
    } else if (pPerdidos.checked == true) {
      if (
        (equipo == partidos[i].homeTeam.name &&
          partidos[i].score.winner == "AWAY_TEAM") ||
        (equipo == partidos[i].awayTeam.name &&
          partidos[i].score.winner == "HOME_TEAM")
      ) {
        partidoFiltrado.push(partidos[i]);
      }
    } else if (pEmpatados.checked == true) {
      if (
        (equipo == partidos[i].homeTeam.name &&
          partidos[i].score.winner == "DRAW") ||
        (equipo == partidos[i].awayTeam.name &&
          partidos[i].score.winner == "DRAW")
      ) {
        partidoFiltrado.push(partidos[i]);
      }
    } else{
      if ( 
        equipo == partidos[i].homeTeam.name ||   
        equipo == partidos[i].awayTeam.name
      ) {
        partidoFiltrado.push(partidos[i]);
      }
    }
  }

  // si no lo otro
  generarTabla(partidoFiltrado);
}
// for (let i = 0; i < partidos.length; i++) {
//     if ( 
//         equipo == partidos[i].homeTeam.name ||   
//         equipo == partidos[i].awayTeam.name
//       )
//      array.push(partidos[i])
// }





// function nueva(equipo) {
//     let nuevoFiltro = partidos.filter(x => 
//         { 
//                if ((x.homeTeam.name == equipo) || (x.awayTeam.name == equipo)){
//                    return true
//                }
//                else return false
//           })   
//           console.log(nuevoFiltro)
// }

// let nuevoFiltro = partidos.filter(x => ((x.homeTeam.name == equipo) && (x.awayTeam.name == equipo)));


// modales bootstrap 