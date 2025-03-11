   window.onload = () => {
    fetchCharacters();
};

const searchCharacter = () => {
    let characterName = document.getElementById('search-field').value;

    if (characterName.trim() !== '') {
        fetchCharacters(`?name=${characterName}`);
    } else {
        fetchCharacters();
    }
};

const fetchCharacters = (query = '') => {
    fetch(`https://rickandmortyapi.com/api/character/${query}`)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                displayCharacters(data.results);
            } else if (data.error) {
                const container = document.getElementById("character-container");
                container.innerHTML = '<h2 style="color: #9b59ff;">No se encontraron personajes</h2>';
            } else {
                displayCharacters([data]);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            const container = document.getElementById("character-container");
            container.innerHTML = '<h2 style="color: #9b59ff;">Error al cargar datos</h2>';
        });
};

const displayCharacters = characters => {
    const characterContainer = document.getElementById("character-container");

    characterContainer.innerHTML = '';

    characters.forEach(character => {
        const characterCard = document.createElement("div");
        characterCard.className = "character-card";

        let statusClass = "unknown";
        if (character.status.toLowerCase() === "alive") {
            statusClass = "alive";
        } else if (character.status.toLowerCase() === "dead") {
            statusClass = "dead";
        }

        characterCard.innerHTML = `
            <img class="character-image" src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <h3 class="character-name">${character.name}</h3>
                <span class="character-status ${statusClass}">${character.status}</span>
                <p>Especie: ${character.species}</p>
                <p>Origen: ${character.origin.name}</p>
            </div>
        `;

        characterContainer.appendChild(characterCard);
    });
};
