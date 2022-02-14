// DECLARACIONDE VARIABLES //
let url1 = "https://api.football-data.org/v2/competitions/2014/teams",
  url2 = "https://api.football-data.org/v2/competitions/2021/teams",
  url3 = "https://api.football-data.org/v2/competitions/2015/teams",
  ligaSantander = document.getElementById("ligaSantander"),
  premier = document.getElementById("premier"),
  francia = document.getElementById("francia");
  getFetch(url1);
  // FUNCIONES PARA SELECCIONAR LIGA CAMBIANDO EL PARAM DE LA FUNCION FETCH //
  ligaSantander.addEventListener("click", () => {
    getFetch(url1);
  });
  
  premier.addEventListener("click", () => {
    getFetch(url2);
  });
  
  francia.addEventListener("click", () => {
    getFetch(url3);
  });
  
// OBTIENE LOS DATOS DE LA API MEDIANTE FETCH Y REALIZA TODAS LAS FUNCIONES //
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
      let caja = document.getElementById("teams");
      caja.innerHTML = "";
      borrar();
      let equipos = data.teams;
      equipos.forEach((x) => {
        let contenido = document.createElement("div");
        contenido.classList.add("col-sm-3", "col-6");
        caja.appendChild(contenido);
        contenido.innerHTML = `<a href="${x.website}"><img src="${x.crestUrl}" class="equipo"></a>`;
      });
    });
}


