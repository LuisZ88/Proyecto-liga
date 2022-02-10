let url1 = "https://api.football-data.org/v2/competitions/2014/matches?season=2021"
let url2 = "https://api.football-data.org/v2/competitions/2021/matches?season=2021"
let url3 = "https://api.football-data.org/v2/competitions/2015/matches?season=2021"
let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
table1.classList.add("table", "table-dark", "table-hover");
table2.classList.add("table", "table-dark", "table-hover");
let thead1 = document.createElement("thead");
let tbody1 = document.createElement("tbody");
let tbody2 = document.createElement("tbody");
table1.appendChild(tbody1);
table2.appendChild(tbody2);
function show(params) {
  document.getElementById("loader").style.display = "block";
}
function borrar(params) {
  document.getElementById("loader").style.display = "none";
}

function borrarTabla() {
  tbody1.innerHTML = "";
  tbody2.innerHTML = "";
}

async function prueba(url) {
  show()
  info = await fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "5bb281a5a1e445abbe0580d925791a5e",
    },
  })
    .then((response) => {return response.json()})
    .then((data) => {
      return data.matches;
    })
    .catch((error) => {
      console.log(error);
    })
    borrar()
    return info
 
}
async function stats(url) {
  borrarTabla()
  let partidos = await prueba(url)
  let estadisticas = [];
  let media;
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
  }
  function bestAvg() {
    let titulo = document.getElementById("titulo1")
    titulo.innerHTML = `Mayor media de goles`
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
  
  function bestGA() {
    let titulo = document.getElementById("titulo2")
    titulo.innerHTML = `Menos goles en contra como`
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
  
}
stats(url1)
let ligaSantander = document.getElementById("ligaSantander");
ligaSantander.addEventListener("click", () => {
    stats(url1)})
let premier = document.getElementById("premier");
    premier.addEventListener("click", () => {
        stats(url2)})
let francia = document.getElementById("francia");
francia.addEventListener("click", () => {
    stats(url3)})

