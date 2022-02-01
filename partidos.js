partidos = partidos.matches
let table = document.createElement("table");
table.classList.add("table", "table-dark", "table-hover" ,"table-sm")
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);
document.getElementById("root").appendChild(table);
let lineaCabecera = document.createElement("tr")
thead.appendChild(lineaCabecera)
let cabecera = ["Local", "Resultado","Visitante"];



// for (let i = 1; i < 39; i++) {
//   let jornada = document.createElement("div");
//   tbody.appendChild(jornada)
//   jornada.classList.add("jornada")
//   jornada.innerHTML = `Jornada ${[i]}`
  
  
// }

for (let i = 0; i < partidos.length; i++) {
  let local = `${partidos[i].homeTeam.name}`
  let visitante = `${partidos[i].awayTeam.name}`
  let resultado = `<img class= "logo" src="https://crests.football-data.org/${partidos[i].homeTeam.id}.svg"/>\xa0\xa0 ${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam} \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${partidos[i].awayTeam.id}.svg"/>`
  let jornada = `Jornada ${partidos[i].matchday}`
  let dia =  new Date(partidos[i].utcDate)
  let fecha = dia.toLocaleString('es-ES')
  console.log(fecha)
  if (resultado == `<img class= "logo" src="https://crests.football-data.org/${partidos[i].homeTeam.id}.svg"/>\xa0\xa0 ${null} - ${null} \xa0\xa0  <img class= "logo" src="https://crests.football-data.org/${partidos[i].awayTeam.id}.svg"/>`){
     resultado  = `Sin jugar`

  } 
  let stats = [jornada, local, resultado, visitante, fecha]
  let fila = document.createElement("tr");
  tbody.appendChild(fila);

  for(let x of stats){
  let celda = document.createElement("td");
  fila.appendChild(celda);
    celda.innerHTML = x;
  
  }
    
}

// `${partidos[i].utcDate}`