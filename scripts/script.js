
axios.get('https://pokeapi.co/api/v2/pokemon').then(resp=> {
    console.log(resp.data);
});


const getPokemon = (namePokemon) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
    .then(response => response.json())
    .then(data => {
        const cardPokemon= document.getElementById('dataPokemon');
        const abilities = [];
        data.abilities.forEach((item)=>{
            abilities.push(item.ability.name);
        })
        const type = [];
        data.types.forEach((item)=>{
            type.push(item.type.name);
        })

        
        cardPokemon.innerHTML='';
        cardPokemon.innerHTML+=`
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
                    <th>HABILITY</th>
                </tr>
                <tr>
                    <td>${type.toString()}</td>
                    <td>${abilities.toString()}</td>
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
    })
}
document.getElementById("snorlax").addEventListener('click', ()=>getPokemon('snorlax'))
document.getElementById("charizard").addEventListener('click', ()=>getPokemon('charizard'))
document.getElementById("venusaur").addEventListener('click', ()=>getPokemon('venusaur'))
document.getElementById("gastly").addEventListener('click', ()=>getPokemon('gastly'))
getPokemon('pikachu');