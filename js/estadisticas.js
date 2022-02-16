// DECLARACIONDE VARIABLES //
let url1 =
  "https://api.football-data.org/v2/competitions/2014/matches?season=2021",
  url2 =
  "https://api.football-data.org/v2/competitions/2021/matches?season=2021",
  url3 =
  "https://api.football-data.org/v2/competitions/2015/matches?season=2021",
  url4 = "https://api.football-data.org/v2/competitions/2014/teams",
  url5 = "https://api.football-data.org/v2/competitions/2021/teams",
  url6 = "https://api.football-data.org/v2/competitions/2015/teams",
  table1 = document.getElementById("table1"),
  table2 = document.getElementById("table2"),
  estadisticas = [],
  ligaSantander = document.getElementById("ligaSantander"),
  premier = document.getElementById("premier"),
  francia = document.getElementById("francia");
table1.classList.add("table", "table-dark", "table-hover");
table2.classList.add("table", "table-dark", "table-hover");
getFetchlogos(url4);
getFetch(url1);


// FUNCIONES PARA SELECCIONAR LIGA CAMBIANDO EL PARAM DE LA FUNCION FETCH //
ligaSantander.addEventListener("click", () => {
  getFetchlogos(url4);
  getFetch(url1);
});

premier.addEventListener("click", () => {
  getFetchlogos(url5);
  getFetch(url2);
});

francia.addEventListener("click", () => {
  getFetchlogos(url6);
  getFetch(url3);
});

// OBTIENE LOS DATOS DE LA API Y REALIZA TODAS LAS FUNCIONES //
async function getFetch(url) {
  show();
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
      let partidos = data.matches;
      stats(partidos);
      bestAvg(estadisticas);
      bestGA(estadisticas);
    })
    .catch((error) => {
      console.log(error);
    });
  borrar();
  return info;
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
// CREA UN ARRAY PERSONALIZADO DE OBJETOS DE LSO EQUIPOS //
function stats(array) {
  estadisticas = [];
  for (let i = 0; i < array.length; i++) {
    let idEqLocal = array[i].homeTeam.id,
      equipoLocal,
      equipoVisi,
      idEqVisi = array[i].awayTeam.id;
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
  estadisticas.forEach((x) => {
    media = x.goals / x.matches;
    x.avg = media;
  })
}


// FUNCIONES PARA CALCULAR EL TOP 5 DE EQUIPOS CON MAYOR MEDIA DE GOLES Y EL EQUIPO CON MENOS GOLES RECIBIDOS COMO VISITANTE //
function bestAvg(param) {
  let tbody1 = document.getElementById("tbody1");
  table1.appendChild(tbody1);
  tbody1.innerHTML = "";
  let titular = document.getElementById("media");
  titular.innerHTML = "";
  titular.innerHTML = "Top 5 media de goles";
  let titulo1 = document.getElementById("thead1");
  titulo1.innerHTML = "";
  titulo1.innerHTML = `<tr><th>Equipo</th><th>Goles</th><th>Partidos</th><th>Media</th></tr>`;
  param.sort((a, b) => b.avg - a.avg);
  param = param.slice(0, 5)
  param.forEach((x) => {
    let fila = document.createElement("tr");
    tbody1.appendChild(fila);
    let team = x.name;
    let avg = x.avg.toFixed(2);
    let id = x.id;
    let matches = x.matches;
    let goals = x.goals;
    fila.innerHTML = `<td><img class= "logo" src="https://crests.football-data.org/${id}.svg"/> ${team}</td><td>${goals}</td><td>${matches}</td><td>${avg}</td>`;
  })

}

function bestGA(param) {
  let tbody2 = document.getElementById("tbody2");
  table2.appendChild(tbody2);
  tbody2.innerHTML = "";
  let titular = document.getElementById("contra");
  titular.innerHTML = "";
  titular.innerHTML = "Menos goles recibidos como visitante";
  let titulo2 = document.getElementById("thead2");
  titulo2.innerHTML = "";
  titulo2.innerHTML = `<tr><th>Equipo</th><th>Goles recibidos</th><th>Partidos</th></tr>`;
  param.sort((a, b) => a.goalsAgainst - b.goalsAgainst);
  let fila = document.createElement("tr");
  tbody2.appendChild(fila);
  param = param.slice(0, 5)

  param.forEach((x) => {
    let fila = document.createElement("tr");
    tbody2.appendChild(fila);
    let team = x.name;
    let id = x.id;
    media = x.avg.toFixed(2);
    let gAgainst = x.goalsAgainst;
    let matches = x.matches;
    fila.innerHTML = `<td><img class= "logo" src="https://crests.football-data.org/${id}.svg"/> ${team}</td><td>${gAgainst}</td><td>${matches}</td>`;
  })
}

