partidos = partidos.matches;

let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
table1.classList.add("table", "table-dark", "table-hover");
table2.classList.add("table", "table-dark", "table-hover");
let thead1 = document.createElement("thead");
let tbody1 = document.createElement("tbody");
let tbody2 = document.createElement("tbody");
table1.appendChild(tbody1);
table2.appendChild(tbody2);
let estadisticas = [];
let media;
console.log(partidos)
function goles(array) {
  for (let i = 0; i < array.length; i++) {
    let idEqLocal = array[i].homeTeam.id;
    let equipoLocal;
    let equipoVisi;
    let idEqVisi = array[i].awayTeam.id;
    if (array[i].status == "FINISHED") {
      estadisticas.forEach((x) => {
        if (x.id === idEqLocal) {
          equipoLocal = x;
        }
      });

      if (equipoLocal == undefined) {
        estadisticas.push({
          id: idEqLocal,
          name: array[i].homeTeam.name,
          goals: array[i].score.fullTime.homeTeam,
          matches: 1,
          goalsAgainst: 0,
        });
      } else {
        equipoLocal.matches++;
        equipoLocal.goals += array[i].score.fullTime.homeTeam;
      }
    }
    if (array[i].status == "FINISHED") {
      estadisticas.forEach((x) => {
        if (x.id === idEqVisi) {
          equipoVisi = x;
        }
      });

      if (equipoVisi == undefined) {
        estadisticas.push({
          id: idEqVisi,
          name: array[i].awayTeam.name,
          goals: array[i].score.fullTime.awayTeam,
          matches: 1,
          goalsAgainst: array[i].score.fullTime.homeTeam,
        });
      } else {
        equipoVisi.matches++;
        equipoVisi.goals += array[i].score.fullTime.awayTeam;
        equipoVisi.goalsAgainst += array[i].score.fullTime.homeTeam;
      }
    }
  }
}

goles(partidos);
for (let i = 0; i < estadisticas.length; i++) {
  media = estadisticas[i].goals / estadisticas[i].matches;
  estadisticas[i].avg = media;
  console.log(media)
}
console.log(estadisticas.avg)
function bestAvg() {
  estadisticas.sort((a, b) => b.avg - a.avg);
  for (let i = 0; i < 5; i++) {
    let fila = document.createElement("tr");
    tbody1.appendChild(fila);
    let goles = estadisticas[i].goals;
    let playedGames = estadisticas[i].matches;
    let team = estadisticas[i].name;
    let gAgainst = estadisticas[i].goalsAgainst;
    media = estadisticas[i].avg.toFixed(2);
    let id = estadisticas[i].id
    fila.innerHTML = `<td><img class= "logo" src="https://crests.football-data.org/${id}.svg"/> ${team}</td><td>Media goles por partido ${media}</td><td>Goles en contra como visitante ${gAgainst}</td>`;
  }
}
console.log(estadisticas);

function bestGA() {
  estadisticas.sort((a, b) => a.goalsAgainst - b.goalsAgainst);
  let fila = document.createElement("tr");
  tbody2.appendChild(fila);
  for (let i = 0; i < 5; i++) {
    let fila = document.createElement("tr");
    tbody2.appendChild(fila);
    let goles = estadisticas[i].goals;
    let playedGames = estadisticas[i].matches;
    let team = estadisticas[i].name;
    let id = estadisticas[i].id
    let gAgainst = estadisticas[i].goalsAgainst;
    media = estadisticas[i].avg.toFixed(2);
    fila.innerHTML = `<td><img class= "logo" src="https://crests.football-data.org/${id}.svg"/> ${team}</td><td>Media goles por partido ${media}</td><td>Goles en contra como visitante ${gAgainst}</td>`;
  }
}
bestAvg(estadisticas);
bestGA(estadisticas);
