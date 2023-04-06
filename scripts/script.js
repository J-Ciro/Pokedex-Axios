// 1. Consumir API
axios.get('https://pokeapi.co/api/v2/pokemon').then(resp => {
    console.log(resp.data);
});

// 2. Reemplazar pokemons del footer y su info
const getPokemon = async (namePokemon) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
        const data = response.data;
        const cardPokemon = document.getElementById('dataPokemon');
        
        const abilities = [];
        data.abilities.forEach((item) => {
            abilities.push(item.ability.name);
        })
        const abilitiesLimited = abilities.slice(0, 2);

        const type = [];
        data.types.forEach((item) => {
            type.push(item.type.name);
        })

        cardPokemon.innerHTML = '';
        cardPokemon.innerHTML += `
            <section class="pokemon">
                <section class="nombre">
                    <h1>${data.name}</h1>
                    <img src="${data.sprites.front_default}" alt="" />
                </section>
                <img src="${data.sprites.front_default}" alt="${data.name}" class="poke-image" />
            </section>
            <aside class="poke-table">
                <table class="statistics">
                <tr>
                    <th>NO.</th>
                    <th>LEVEL</th>
                </tr>
                <tr>
                    <td>${data.order}</td>
                    <td>${data.base_experience}</td>
                </tr>
                <tr>
                    <th>TYPE</th>
                    <th>ABILITY</th>
                </tr>
                <tr>
                    <td>${type.toString()}</td>
                    <td>${abilitiesLimited.toString()}</
                </tr>
                <tr>
                    <th>HEIGHT</th>
                    <th>WEIGHT</th>
                </tr>
                <tr>
                    <td>${data.height} m</td>
                    <td>${data.weight} Kg</td>
                </tr>
                </table>
            </aside>
        `
    } catch (error) {
        console.log(error);
        alert("Usuario, ocurrió un error");
        return [];
    }
}

// document.getElementById("snorlax").addEventListener('click', () => getPokemon('snorlax'))
// document.getElementById("charizard").addEventListener('click', () => getPokemon('charizard'))
// document.getElementById("venusaur").addEventListener('click', () => getPokemon('venusaur'))
// document.getElementById("gastly").addEventListener('click', () => getPokemon('gastly'))
getPokemon('pikachu');


//3. Hacer que las 4 imágenes del footer sean aleatorias y se muestre su información al darles click

//a. Escuchar el click y traer la info(id) de las imágenes del footer
const imageInfo = (image, data) => {
    image.src = data.sprites.front_default;
    image.alt = data.name;
    image.addEventListener('click', () => getPokemon(event.target.alt));
}

const getId = (id) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.data)
                .catch(error => console.error(error));
}

//b. Hacer aleatorias las imágenes
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setRandomId = async (image) => {
    const id = getRandomNumber(1, 151);
    const data = await getId(id);
    imageInfo(image, data);
}

//c. Pintar las imágenes del footer al recargar la página
const footerImages = document.querySelectorAll("footer img");

const printRandomImages = async () => {
    for(let i = 0; i < footerImages.length; i++){
        await setRandomId(footerImages[i]);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    printRandomImages();
});