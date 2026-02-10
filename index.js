const searchrow = document.querySelector(".searchrow");
const pokemonName = document.querySelector(".pokemonName");
const pokemoncard = document.querySelector(".pokemoncard");
const btn = document.querySelector(".btn");
const right = document.querySelector(".right");
const middle = document.querySelector(".middle");
const spriteEl = document.getElementById("pokemonSprite");

const pokeCache = {};

btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const pokename = pokemonName.value.toLowerCase().trim();

    if (pokename) {
        try {
            btn.disabled = true;
            btn.textContent = "Searching...";

            const data = await getPokemonData(pokename);
            displayPokemonInfo(data);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        } finally {
            btn.disabled = false;
            btn.textContent = "Catch pokemons here";
        }
    } else {
        displayError("Please enter a pokemon name");
    }
});

pokemonName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

async function getPokemonData(pokename) {
    if (pokeCache[pokename]) {
        return pokeCache[pokename];
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);

    if (!response.ok) {
        throw new Error("Could not catch the pokemon");
    }

    const data = await response.json();
    pokeCache[pokename] = data;
    return data;
}

function resetCard() {
    middle.textContent = "";
    right.textContent = "";
    spriteEl.style.display = "none";
}

function displayPokemonInfo(data) {
    const {
        name: pokename,
        weight: weightRaw,
        height: heightRaw,
        id,
        abilities: [{ ability: { name: firstAbility } }],
    } = data;

    const pokemonSprite =
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default;

    if (!spriteEl) {
        displayError("Image element not found. Check id='pokemonSprite' in HTML");
        return;
    }

    resetCard();

    spriteEl.src = pokemonSprite;
    spriteEl.style.display = "block";

    pokemoncard.style.display = "flex";

    const weightKg = (weightRaw / 10).toFixed(1);
    const heightM = (heightRaw / 10).toFixed(1);

    const displayname = document.createElement("p");
    const displayweight = document.createElement("p");
    const displayheight = document.createElement("p");
    const displayid = document.createElement("p");
    const displayabilities = document.createElement("p");

    displayname.textContent = "NAME: " + pokename;
    displayweight.textContent = `WEIGHT: ${weightKg} kg`;
    displayheight.textContent = `HEIGHT: ${heightM} m`;
    displayabilities.textContent = "ABILITY: " + firstAbility;
    displayid.textContent = "#: " + id;

    displayname.classList.add("displayname");
    displayweight.classList.add("displayweight");
    displayheight.classList.add("displayheight");
    displayid.classList.add("displayid");

    middle.appendChild(displayname);
    middle.appendChild(displayabilities);
    middle.appendChild(displayid);
    right.appendChild(displayweight);
    right.appendChild(displayheight);
}

function displayError(message) {
    resetCard();

    pokemoncard.style.display = "flex";

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    middle.appendChild(errorDisplay);
}
//comment test
