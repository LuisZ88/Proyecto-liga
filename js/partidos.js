//DECLARACION DE VARIABLES//
let url1 =
  "https://api.football-data.org/v2/competitions/2014/matches?season=2021",
  url2 =
  "https://api.football-data.org/v2/competitions/2021/matches?season=2021",
  url3 =
  "https://api.football-data.org/v2/competitions/2015/matches?season=2021",
  url4 = "https://api.football-data.org/v2/competitions/2014/teams",
  url5 = "https://api.football-data.org/v2/competitions/2021/teams",
  url6 = "https://api.football-data.org/v2/competitions/2015/teams",
  table = document.getElementById("table"),
  thead = document.createElement("thead"),
  tbody = document.createElement("tbody"),
  ligaSantander = document.getElementById("ligaSantander")
  premier = document.getElementById("premier"),
  francia = document.getElementById("francia"),
  selectTeam = document.getElementById("select"),
  pGanados = document.getElementById("gCheck"),
  pPerdidos = document.getElementById("pCheck"),
  pEmpatados = document.getElementById("eCheck"),
  partidos =[];
thead = document.createElement("thead");
tbody = document.createElement("tbody");


// OBTIENE LOS DATOS DE LA API MEDIANTE FETCH Y REALIZA TODAS LAS FUNCIONES //
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
      partidos = data.matches;
      thead.innerHTML = "";
      tbody.innerHTML = "";
      crearSelect(partidos)
      generarTabla(partidos)
    })
    .catch((error) => {
      console.log(error);
    });
  borrar();
  return info;
}
getFetchlogos(url4)
getFetch(url1)




// CREA UN ARRAY CON TODOS LOS EQUIPOS PARA EL SELECT //
function crearSelect(partidos) {
  let listaEquipos = []
  partidos.forEach((x) => {
    if (listaEquipos.includes(x.homeTeam.name) == false) {
      listaEquipos.push(x.homeTeam.name)
    }
  });
  let select = document.getElementById("select");
  select.innerHTML = "";
  listaEquipos.forEach((x) => {
    let option = document.createElement("option");
    select.appendChild(option);
    option.innerHTML = x;
  })
}


// CREA UNA TABLA CON TODOS LOS PARTIDOS DE LA LIGA //
function generarTabla(array) {
  table.classList.add("table", "table-dark", "table-hover", "table-sm");
  table.appendChild(thead);
  table.appendChild(tbody);
  thead.innerHTML = "";
  tbody.innerHTML = "";
  let lineaCabecera = document.createElement("tr");
  thead.appendChild(lineaCabecera);
  let cabecera = ["Jornada","Fecha" , "Local", "Resultado", "Visitante", "Árbitro"];
  cabecera.forEach((x) => {
    let titulo = document.createElement("th");
    lineaCabecera.appendChild(titulo);
    titulo.innerHTML = x;
  })
  for (let i = 0; i < array.length; i++) {
    let jornada = array[i].matchday,
      local = array[i].homeTeam.name,
      visitante = array[i].awayTeam.name,
      resultado,
      arbitro,
      logoh = array[i].homeTeam.id,
      logov = array[i].awayTeam.id,
      dia = new Date(array[i].utcDate);
    if (array[i].referees.length > 0) {
      arbitro = array[i].referees[0].name;
    } else {
      arbitro = `Sin datos`;
    }

    if (array[i].score.fullTime.homeTeam == null) {
      resultado = `<img class= "logo" src="https://crests.football-data.org/${logoh}.svg"/> Sin jugar  <img class= "logo" src="https://crests.football-data.org/${logov}.svg"/>`;
    } else {
      resultado = `<img class= "logo" src="https://crests.football-data.org/${logoh}.svg"/> ${array[i].score.fullTime.homeTeam} - ${array[i].score.fullTime.awayTeam}   <img class= "logo" src="https://crests.football-data.org/${logov}.svg"/>`;
    }

    dia = dia.toLocaleString("es-ES");
    fila = document.createElement("tr");
    tbody.appendChild(fila);
    fila.innerHTML = `<td class="col-1">${jornada}</td><td class="col-2">${dia}</td><td class="col-2">${local}</td><td class="col-2">${resultado}</td><td class="col-2">${visitante}</td><td class="col-3">${arbitro}</td>`;
  }
}
// FILTRO DE LA TABLA DE PARTIDOS (GANADOS,PERDIDOS,EMPATADOS), CON FORMULARIO// 
let envio = document.getElementById("envio");
envio.addEventListener("click", function (event) {
  event.preventDefault();
  filtro(selectTeam.value);
});

function filtro(equipo) {
  thead.innerHTML = "";
  tbody.innerHTML = "";
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



// FUNCIONES PARA SELECCIONAR LIGA CAMBIANDO EL PARAM DE LA FUNCION FETCH //
ligaSantander.addEventListener("click", () => {
  pGanados.checked = false;
  pPerdidos.checked = false;
  pEmpatados.checked = false;
  getFetchlogos(url4);
  getFetch(url1);
});

premier.addEventListener("click", () => {
  pGanados.checked = false;
  pPerdidos.checked = false;
  pEmpatados.checked = false;
  getFetchlogos(url5);
  getFetch(url2);
});

francia.addEventListener("click", () => {
  pGanados.checked = false;
  pPerdidos.checked = false;
  pEmpatados.checked = false;
  getFetchlogos(url6);
  getFetch(url3);
});

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