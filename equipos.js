url1 = "https://api.football-data.org/v2/competitions/2014/teams";
url2 = "https://api.football-data.org/v2/competitions/2021/teams";
url3 = "https://api.football-data.org/v2/competitions/2015/teams";

async function getFetch(url) {
    show()
    info = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": "5bb281a5a1e445abbe0580d925791a5e",
      },
    })
      .then((response) => {return response.json()})
      .then((data) => {
        let caja = document.getElementById("teams")
        caja.innerHTML =""
        borrar()
        let equipos = data.teams   
        equipos.forEach((x) => {
            let contenido = document.createElement("div")
            contenido.classList.add("col-3")
            caja.appendChild(contenido)
            contenido.innerHTML = `<a href="${x.website}"><img src="${x.crestUrl}" class="equipo"></a>`
            

        })

  
   
  })}
  getFetch(url1)
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
 