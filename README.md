<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Frank Food

<p align="center">
  <img height="200" src="https://media.giphy.com/media/jKaFXbKyZFja0/giphy.gif" />
</p>

## ¿De qué trata el proyecto?

Desarrollo de una SPA (Single Page Application) utilizando __React__ para el Front End y __Redux__ como state management.Todos los componentes fueron desarrollados con __CSS__ sin uso de librerías externas.
La SPA consume datos de una API ([spoonacular](https://spoonacular.com/food-api)) a través de un Back End desarrollado en __Node.js__ utilizando __Express__ e incluye una Data Base relacional creada con __PostgreSQL__ y __Sequelize__ como ORM.
Algunos features del proyecto: Búsqueda por nombre, ordenamientos y filtros, formulario controlado para creación de nuevas recetas, paginado numérico.
La finalidad de esta SPA es que puedan ver distintas recetas de comida junto con información relevante y a partir de ella poder:

  - Buscar recetas por su nombre
  - Filtrar recetas por tipo de dieta 
  - Ordenarlas por nivel de puntuación
  - Ordenarlas alfabéticamente
  - Crear nuevas recetas propias
  
 <br></br> 
 
 ⚠️⚠️⚠️ [Haz click en este enlace para ver un video sobre este proyecto](https://www.linkedin.com/in/franco-oropel/) ⚠️⚠️⚠️ 
 
  <br></br> 
  
## Scripts

__IMPORTANTE:__ Las versiones necesarias para poder instalar correctamente las dependencias y correr el proyecto son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor


## BoilerPlate
<em>La aplicación utiliza una clave personal para el uso.</em>

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

El contenido de `client` fue creado usando: Create React App.


### Únicos Endpoints/Flags utilizados

  * GET https://api.spoonacular.com/recipes/complexSearch
    - Para obtener mayor información sobre las recetas, agregue el flag `&addRecipeInformation=true` a este endpoint
  
  * GET https://api.spoonacular.com/recipes/{id}/information



