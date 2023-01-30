const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};
const search = document.querySelector(".search");
const input = document.querySelector(".input");
const binocularsBtn = document.querySelector(".binoculars");
const pokemonContain = document.querySelectorAll(".pokemon-contain");
const poke_container = document.querySelector(".poke-container");

binocularsBtn.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
});

input.addEventListener("input", () => {
    const inputChange = input.value.toLowerCase();
    //   console.log(inputChange);

    const pokeNames = document.querySelectorAll(".poke-name");
    
  pokeNames.forEach((pokeName) => {
    const pokeNameLowerCase = pokeName.innerHTML.toLowerCase().includes(inputChange);
    console.log(pokeName);
    if (pokeNameLowerCase) {
        pokeName.parentElement.parentElement.style.display = "block";
    } else {
        pokeName.parentElement.parentElement.style.display = "none";
    }
  });
});
const pokemon_count = 20;

const fetchPokemons = async () => {
  for (let i = 1; i < pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
//   console.log(data);
  pokeAssignment(data);
};
const pokeAssignment = (data) => {
    const id=data.id.toString().padStart(3, "0");
    const type=data.types[0].type.name;

    const pokemonContain=document.createElement("div");
    pokemonContain.classList.add("pokemon-contain");
    // console.log(type);
    pokemonContain.style.backgroundColor=bg_color[type];

    pokemonContain.innerHTML= `
    <div class="poke-img">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="podex-images">
    </div>
    <div class="poke-info">
    <small class="poke-id" id="poke-id">#${id}</small>
    <h3 class="poke-name">${data.name}</h3>
    <div class="poke-small">
        <small class="flask">
            <i class="fa-solid fa-flask"></i><small class="exp"> ${data.base_experience} Exp</small>
        </small>
        <small class="weight">
            <i class="fa-solid fa-weight-scale"></i><small class="kg"> ${data.weight} Kg</small>
        </small>
    </div>
        <div class="poke-type">
            <i class="fa-brands fa-uncharted"></i><small> ${type}</small>
        </div>
    </div>`;
    
    poke_container.appendChild(pokemonContain)
    
};

fetchPokemons();
    