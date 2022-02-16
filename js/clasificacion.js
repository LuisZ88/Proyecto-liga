// DECLARACION DE VARIABLES //
let url1 = "https://api.football-data.org/v2/competitions/2014/standings",
  url2 = "https://api.football-data.org/v2/competitions/2021/standings",
  url3 = "https://api.football-data.org/v2/competitions/2015/standings",
  url4 = "https://api.football-data.org/v2/competitions/2014/teams",
  url5 = "https://api.football-data.org/v2/competitions/2021/teams",
  url6 = "https://api.football-data.org/v2/competitions/2015/teams",
  table = document.getElementById("tabla"),
  thead = document.createElement("thead"),
  tbody = document.createElement("tbody"),
  ligaSantander = document.getElementById("ligaSantander"),
  premier = document.getElementById("premier"),
  francia = document.getElementById("francia");

getFetch(url1);
getFetchlogos(url4);
// FUNCIONES PARA SELECCIONAR LIGA CAMBIANDO EL PARAM DE LA FUNCION FETCH //

ligaSantander.addEventListener("click", () => {
  getFetchlogos(url4);
  getFetch(url1)
})

premier.addEventListener("click", () => {
  getFetchlogos(url5);
  getFetch(url2)
})

francia.addEventListener("click", () => {
  getFetchlogos(url6);
  getFetch(url3)
})

// OBTIENE LOS DATOS DE LA API MEDIANTE FETCH Y REALIZA TODAS LAS FUNCIONES //

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
      crearTabla(clasificacion);
      borrar();
    })
    .catch((error) => {
      console.log(error);
    });

}
async function getFetchlogos(url) {
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
      lista.innerHTML="";
      let equipos = data.teams;
      equipos.forEach((x) => {
        let minilogo= document.createElement("div")
        lista.appendChild(minilogo)
        minilogo.innerHTML= `<a href="${x.website}"><img src="${x.crestUrl}" class="minilogo"></a>`
      });
    });
}
// CREA UNA TABLA CON CON LOS DATOS RECOGIDOS DEL FETCH//

function crearTabla(clasificacion) {
  thead.innerHTML = "";
  tbody.innerHTML = "";
  table.classList.add("table", "table-dark", "table-hover", "table-sm");
  table.appendChild(thead);
  table.appendChild(tbody);
  let lineaCabecera = document.createElement("tr");
  thead.appendChild(lineaCabecera);
  let cabecera = ["Equipos", "PJ", "PG", "PE", "PP", "GF", "GC", "PTS"];
  cabecera.forEach((x)=> {
    let titulo = document.createElement("th");
    lineaCabecera.appendChild(titulo);
    titulo.innerHTML = x;
  })

  for (let i = 0; i < clasificacion.length; i++) {
    let pGanados = clasificacion[i].won,
      logo =clasificacion[i].team.crestUrl,
      pPerdidos = clasificacion[i].lost,
      golesF = clasificacion[i].goalsFor,
      golesC = clasificacion[i].goalsAgainst,
      puntos = clasificacion[i].points,
      pEmpatados = clasificacion[i].draw,
      pJugados = clasificacion[i].playedGames,
      posicion = clasificacion[i].position,
      equipo = clasificacion[i].team.name,
      equipos = ` ${posicion}.  <img class="logo" src="${logo}"/> ${equipo} `,
      stats = [
        equipos,
        pJugados,
        pGanados,
        pEmpatados,
        pPerdidos,
        golesF,
        golesC,
        puntos,
      ],
      fila = document.createElement("tr");
    tbody.appendChild(fila);
    stats.forEach((x)=> {
      let celda = document.createElement("td");
      fila.appendChild(celda);
      celda.innerHTML = x;
    })
  }
}

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