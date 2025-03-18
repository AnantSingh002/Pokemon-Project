let container = document.getElementById("pokemon_card_container");
let searchInput = document.getElementById("search");
let filterBytype  = document.getElementById('filter');
let typeSelector = document.getElementById('types');


let filter = () => {
     let selectedType = typeSelector.value.toLowerCase();
     let allCards =  document.querySelectorAll('.pokemon_card');

     allCards.forEach((pokemon) => {
          let pokemonType = pokemon.querySelector('.type').innerText.toLowerCase() ;

          if(pokemonType === selectedType){
               pokemon.style.display = "block";
          }else {
               pokemon.style.display = "none";
          }
     })
}

filterBytype.addEventListener('click', filter);


function createPokemoncard(pokemon) {
  let card = document.createElement("div");
  card.classList.add("pokemon_card");
  card.innerHTML = `
    <div class='card_inner'>
        <div class='card_front'>
            <div class='id'>${pokemon.id}</div>
            <img src='${pokemon.sprites.front_default}' class='img'>
            <div class='name'>${pokemon.name}</div>
            <div class='type'>${pokemon.types[0].type.name}</div>
        </div>

        <div class='card_back'>
            <img src='${pokemon.sprites.back_default}' class='img'>
            <p>power:${pokemon.base_experience}</p>
            <p>weight:${pokemon.weight}</p>
        </div>
    </div>
    `;
  return card;
}

searchInput.addEventListener("keyup", () => {
  let searchValue = searchInput.value.toLowerCase();
  let allCards = document.querySelectorAll(".pokemon_card");
  console.log(allCards);

  allCards.forEach(function (pokemon) {
    // console.log(pokemon);

    let pokemonName = pokemon.querySelector(".name").innerText;
    // console.log(pokemonName);
    if (pokemonName.includes(searchValue)) {
      pokemon.style.display = "block";
    } else {
      pokemon.style.display = "none";
    }
  });
});

async function fetchPokemondata(i) {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  let result = await data.json();
  console.log(result);
  return result;
}

async function fetchPokemon() {
  for (let i = 1; i <= 100; i++) {
    let pokemon = await fetchPokemondata(i);
    console.log(pokemon);
    let pokemonCard = createPokemoncard(pokemon);
    container.appendChild(pokemonCard);
  }
}

fetchPokemon();