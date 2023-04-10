let pokemons = [];
// Constantes

const POKE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
const form = document.getElementById("enviar");
const containerPokemons = document.querySelector('#pokeShow');

// Peticion get para obntener los pokemons de la api (100)
const getPokemonsFromApi = async (url) => {
  try {
    const { data } = await axios.get(url); //desestructuración de objetos
    return data.results;
  } catch (error) {
    console.log(error);
    alert("Usuario, ocurrio un error");
    return [];
  }
};

//peticion get para obtener los datos de los pokemons que necesitamos
const getAllInfoPokemons = async (url) => {
  const allInfoPokemons = [];
  try {
    const { data } = await axios.get(url); //desestructuración de objetos

    for (const pokemon of data.results) {
      const urlPokemon = pokemon.url;
      const response = await axios.get(urlPokemon);
      const poke = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default,
        // height: response.data.height,
        // abilities: response.data.abilities.map(item=> item.ability.name)
      }; 
      allInfoPokemons.push(poke);
    }
    return allInfoPokemons;
  } catch (error) {
    console.log(error);
    return []
  }
}
const  clickPokemon=(namePokemon)=>{
  getPokemon(namePokemon);
  
  const currentModal=document.getElementById('exampleModal');
  const myModal =  bootstrap.Modal.getInstance(currentModal)
  myModal.hide()
}
// Funcion la cual nos permite limpiar el container y mostrar los pokemons 
const displayPokemons = (allInfo, container) => {
  container.innerHTML = '';
  allInfo.forEach(pokemon => {
    console.log(pokemon)
    container.innerHTML += `
      <ul onclick={clickPokemon('${pokemon.name}')}>
        <li>
          <img src='${pokemon.image}' class="test">
          <span>${pokemon.name}</span>
        </li>
      </ul>
      `
  });
  
}

 form.addEventListener("submit", async (e) => {
   e.preventDefault();   
  
  });
  
// Codigo donde se realiza la busqueda de los pokemons por el nombre 
  const searchInput = document.getElementById("searchInput");
  
  searchInput.addEventListener("input", async (e) => {
  // Busqueda 
  e.preventDefault(); 

  // hacemos un await para guardar la informacion de los pokemons que deseamos filtrar
  const allInfo = await getAllInfoPokemons(POKE_URL)
  const searchTerm = e.target.value.toLowerCase();
  const filteredPokemons = allInfo.filter((pokemon) => {
    return pokemon.name.includes(searchTerm);
  });
  displayPokemons(filteredPokemons, containerPokemons);
});




