let url1 = "https://api.football-data.org/v2/competitions/2014/standings";
let url2 = "https://api.football-data.org/v2/competitions/2021/standings";
let url3 = "https://api.football-data.org/v2/competitions/2015/standings";
let table = document.getElementById("tabla");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

function show(params) {
  document.getElementById("loader").style.display = "block";
}

function borrar(params) {
  document.getElementById("loader").style.display = "none";
}

function borrarTabla() {
  thead.innerHTML = "";
  tbody.innerHTML = "";
}
function getFetch(url) {
  show();
  info = fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "5bb281a5a1e445abbe0580d925791a5e",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let clasificacion = data.standings[0].table;
      borrarTabla()
      crearTabla(clasificacion);
      borrar();
    })
    .catch((error) => {
      console.log(error);
    });

}
function crearTabla(clasificacion) {
  table.classList.add("table", "table-dark", "table-hover", "table-sm");
  table.appendChild(thead);
  table.appendChild(tbody);
  let lineaCabecera = document.createElement("tr");
  thead.appendChild(lineaCabecera);
  let cabecera = ["Equipos", "PJ", "PG", "PE", "PP", "GF", "GC", "PTS"];
  for (let x of cabecera) {
    let titulo = document.createElement("th");
    lineaCabecera.appendChild(titulo);
    titulo.innerHTML = x;
  }

  for (let i = 0; i < clasificacion.length; i++) {
    let pGanados = clasificacion[i].won;
    let pPerdidos = clasificacion[i].lost;
    let golesF = clasificacion[i].goalsFor;
    let golesC = clasificacion[i].goalsAgainst;
    let puntos = clasificacion[i].points;
    let pEmpatados = clasificacion[i].draw;
    let pJugados = clasificacion[i].playedGames;
    let equipos = ` ${clasificacion[i].position}.  <img class="logo" src="${clasificacion[i].team.crestUrl}"/> ${clasificacion[i].team.name} `;
    let stats = [
      equipos,
      pJugados,
      pGanados,
      pEmpatados,
      pPerdidos,
      golesF,
      golesC,
      puntos,
    ];
    let fila = document.createElement("tr");
    tbody.appendChild(fila);
    for (let x of stats) {
      // por cada elemento realiza una funcion //
      let celda = document.createElement("td");
      fila.appendChild(celda);
      celda.innerHTML = x;
    }
  }
}
getFetch(url1);

let ligaSantander = document.getElementById("ligaSantander");
ligaSantander.addEventListener("click", () => {
  getFetch(url1)
})
let premier = document.getElementById("premier");
premier.addEventListener("click", () => {
  getFetch(url2)
})
let francia = document.getElementById("francia");
francia.addEventListener("click", () => {
  getFetch(url3)
})

// for (let j = 0; j < stats.length; j++) {
//   let celda = document.createElement("td");
//   fila.appendChild(celda);
//   celda.innerHTML = stats[j]

// }
// console.log(stats)
// stats.map(function (unStat) {
//   let celda = document.createElement("td");
//   fila.appendChild(celda);
//   celda.innerHTML = unStat
//   return console.log(unStat)

// })
// for (let j = 0; j < cabecera.length; j++) {
//   let celda = document.createElement("td");
//   fila.appendChild(celda);

// }

// tbody.appendChild(celda)

// let cabecera = document.createElement("th");
// for (let i = 0; i < 5; i++) {
//   let cabecera = document.createElement("th");
//   fila.appendChild(cabecera)

//   for (let j = 0; j < 2; j++) {
//     thead.appendChild(fila)
//     fila.appendChild(cabecera)
//     // cabecera.appendChild(celda)

//     let celda = document.createElement("td");
//     celda.innerHTML ="sdf"
//   }
