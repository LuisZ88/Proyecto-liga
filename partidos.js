let url1 =
  "https://api.football-data.org/v2/competitions/2014/matches?season=2021";
let url2 =
  "https://api.football-data.org/v2/competitions/2021/matches?season=2021";
let url3 =
  "https://api.football-data.org/v2/competitions/2015/matches?season=2021";
let url1x1 = "https://api.football-data.org/v2/competitions/2014/standings";
let url2x2 = "https://api.football-data.org/v2/competitions/2021/standings";
let url3x3 = "https://api.football-data.org/v2/competitions/2015/standings";
function show(params) {
  document.getElementById("loader").style.display = "block";
}
function borrar(params) {
  document.getElementById("loader").style.display = "none";
}
function borrarSelect() {
}
async function prueba(url) {
    info = await fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "5bb281a5a1e445abbe0580d925791a5e",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.matches;
    })
    .catch((error) => {
      console.log(error);
    });
  return info;
}
async function clasi(urlalt) {
  show()
  info = await fetch(urlalt, {
      method: "GET",
      headers: {
        "X-Auth-Token": "5bb281a5a1e445abbe0580d925791a5e",
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data.standings[0].table; 
    })
    .catch((error) => {
      console.log(error);
    })
  borrar()
  return info

}
function borrarTabla() {
  thead.innerHTML= "";
  tbody.innerHTML = "";
}
let table = document.getElementById("table");
table.classList.add("table", "table-dark", "table-hover", "w-auto");

let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
async function liga(url,urlalt) {
  borrarTabla()
  let clasificacion = await clasi(urlalt);
  let partidos = await prueba(url);
  
  console.log(partidos);
  let cabecera = [
    "Jornada",
    "Árbitro",
    "Local",
    "Resultado",
    "Visitante",
    "Fecha",
  ];
  let lineaCabecera = document.createElement("tr");
  thead.appendChild(lineaCabecera);
  let select = document.getElementById("select");
  select.innerHTML = ''
  for (let i = 0; i < clasificacion.length; i++) {
    let option = document.createElement("option");
    select.appendChild(option);
    option.innerHTML = clasificacion[i].team.name;
  }
  for (let x of cabecera) {
    let titulo = document.createElement("th");
    lineaCabecera.appendChild(titulo);
    titulo.innerHTML = x;
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("root").appendChild(table);
  let selectTeam = document.getElementById("select");
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
      let arbitro;
      if (array[i].referees.length > 0) {
        arbitro = array[i].referees[0].name;
      } else {
        arbitro = `Sin datos`;
      }

      if (array[i].score.fullTime.homeTeam == null) {
        resultado = `<img class= "logo" src="https://crests.football-data.org/${array[i].homeTeam.id}.svg"/>\xa0\xa0 Sin jugar \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${array[i].awayTeam.id}.svg"/>`;
      } else {
        resultado = `<img class= "logo" src="https://crests.football-data.org/${array[i].homeTeam.id}.svg"/>\xa0\xa0 ${array[i].score.fullTime.homeTeam} - ${array[i].score.fullTime.awayTeam} \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${array[i].awayTeam.id}.svg"/>`;
      }
      let dia = new Date(array[i].utcDate);
      dia = dia.toLocaleString("es-ES");
      fila = document.createElement("tr");
      tbody.appendChild(fila);
      fila.innerHTML = `<td class="col-1">${jornada}</td><td class="col-2">${arbitro}</td><td class="col-2">${local}</td><td class="col-2">${resultado}</td><td class="col-2">${visitante}</td><td class="col-3">${dia}</td>`;
    }
  }

  
  // generarTabla(partidos)
  let envio = document.getElementById("envio");
  envio.addEventListener("click", function (event) {
    event.preventDefault();
    filtro(selectTeam.value);
  });

  function filtro(equipo) {
    borrarTabla();
    if (equipo == "Elige") {
      generarTabla(partidos);
    } else {
      let nuevoFiltro = partidos.filter(
        (x) => x.homeTeam.name == equipo || x.awayTeam.name == equipo
      );

      if (pGanados.checked && !pPerdidos.checked && !pEmpatados.checked) {
        nuevoFiltro = nuevoFiltro.filter(
          (x) =>
            (x.homeTeam.name == equipo && x.score.winner == "HOME_TEAM") ||
            (x.awayTeam.name == equipo && x.score.winner == "AWAY_TEAM")
        );
      }
      if (pPerdidos.checked && !pGanados.checked && !pEmpatados.checked) {
        nuevoFiltro = nuevoFiltro.filter(
          (x) =>
            (x.homeTeam.name == equipo && x.score.winner == "AWAY_TEAM") ||
            (x.awayTeam.name == equipo && x.score.winner == "HOME_TEAM")
        );
      }
      if (pEmpatados.checked && !pPerdidos.checked && !pGanados.checked) {
        nuevoFiltro = nuevoFiltro.filter(
          (x) =>
            (x.homeTeam.name == equipo && x.score.winner == "DRAW") ||
            (x.awayTeam.name == equipo && x.score.winner == "DRAW")
        );
      }
      if (pGanados.checked && pPerdidos.checked && !pEmpatados.checked) {
        nuevoFiltro = nuevoFiltro.filter(
          (x) =>
            (x.homeTeam.name == equipo && x.score.winner == "HOME_TEAM") ||
            (x.awayTeam.name == equipo && x.score.winner == "AWAY_TEAM") ||
            (x.homeTeam.name == equipo && x.score.winner == "AWAY_TEAM") ||
            (x.awayTeam.name == equipo && x.score.winner == "HOME_TEAM")
        );
      }
      if (pGanados.checked && !pPerdidos.checked && pEmpatados.checked) {
        nuevoFiltro = nuevoFiltro.filter(
          (x) =>
            (x.homeTeam.name == equipo && x.score.winner == "HOME_TEAM") ||
            (x.awayTeam.name == equipo && x.score.winner == "AWAY_TEAM") ||
            (x.homeTeam.name == equipo && x.score.winner == "DRAW") ||
            (x.awayTeam.name == equipo && x.score.winner == "DRAW")
        );
      }
      if (!pGanados.checked && pPerdidos.checked && pEmpatados.checked) {
        nuevoFiltro = nuevoFiltro.filter(
          (x) =>
            (x.homeTeam.name == equipo && x.score.winner == "AWAY_TEAM") ||
            (x.awayTeam.name == equipo && x.score.winner == "HOME_TEAM") ||
            (x.homeTeam.name == equipo && x.score.winner == "DRAW") ||
            (x.awayTeam.name == equipo && x.score.winner == "DRAW")
        );
      }

      generarTabla(nuevoFiltro);
    }
  }
}
liga(url1,url1x1);
let ligaSantander = document.getElementById("ligaSantander");
ligaSantander.addEventListener("click", () => {
    liga(url1,url1x1)})
let premier = document.getElementById("premier");
    premier.addEventListener("click", () => {
        liga(url2,url2x2)})
let francia = document.getElementById("francia");
francia.addEventListener("click", () => {
    liga(url3,url3x3)})


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
