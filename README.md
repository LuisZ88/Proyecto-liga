# Proyecto-liga
***
In this project I created dynamic tables from javascript and to request information throught the fetch to obtain the data in real time.
https://statsl.netlify.app/partidos.html
***
 Table of Contents
1. Clasificacion
2. Equipos
3. Partidos
4. Estadisticas


## Clasificación
***
In this route, we have a table with the current standings of  the different european leagues.
We have three buttons that activate a fetch function, with the url of each league. This function cleans the content of the body and then generates a table with the data. These buttons are applied to all urls 

![Image text](/images/md.clasi.png)

## Funciones clasificación.js
***
1. getFecth() We request the data from an API using the GET method. You need a token to authenticate the header. If it is correct, it returns a json with the object. Then run the functions we've added.
2. Buttons with addEventlistner change the param to getFetch(), to choose between the different links.
3. crearTabla() Create a table with the statistics of each team.
## Equipos 
***
In this route we have the teams of each european league with his team logo and link to official website

![Image text](/images/md.equipo.png)
## Funciones equipos.js
***
1.  getFecth() We request the data from an API using the GET method. You need a token to authenticate the header. If it is correct, it returns a json with the object. Then run the functions we've added.
2. Buttons with addEventlistner change the param to getFetch(), to choose between the different links.
3.  We create a list with forEach with each team logo and their respective official web pages.
## Partidos
***
In this route we can see all the matchdays with their referee, date and result, filter by team, by games won / lost / draw
![Image text](/images/md.partidos.png)
## Funciones partidos.js
***
1. getFecth() We request the data from an API using the GET method. You need a token to authenticate the header. If it is correct, it returns a json with the object. Then run the functions we've added.
2. show() borrar() Cambia la visivilidad del spinner display block o display none
3. crearSelect() genera un array con el nombre de cada equipo y los mete como select options
4. generarTabla() Crea una tabla con un for loop con todos los partidos de la liga
5. filtro() Un formulario que filtra la tabla anterior.
6. Buttons with addEventlistner change the param to getFetch(), to choose between the different links.

## Estadísticas
***
On this route we can see two tables of five teams. In the first appear what has the highest average score. In the second, those who have received the fewest goals as a visitor
![Image text](/images/md.stats.png)


## Funciones estadísticas.js
***
1. getFecth() We request the data from an API using the GET method. You need a token to authenticate the header. If it is correct, it returns a json with the object. Then run the functions we've added.
2. Buttons with addEventlistner change the param to getFetch(), to choose between the different links.
3. stats() Create a new array in which you add the teams with their statistics, and average scorer.
4. bestAvg() bestGa() create two tables with the 5 teams with the best goalscoring average per game and those with the fewest goals conceded as visitors.

