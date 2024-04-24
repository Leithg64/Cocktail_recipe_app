let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
    function addListItem(pokemon) {
      let pokemonListContainer = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("btn", "btn-primary", "pokemon-button");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#pokemonModal");
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokemonListContainer.appendChild(listItem);
    }
  
    function showModal(title, text, image, types, abilities) {
      let modalTitleElement = document.querySelector(".modal-title");
      let modalBodyElement = document.querySelector(".modal-body");
  
      modalTitleElement.innerText = title;
      modalBodyElement.innerHTML = `<p>${text}</p><p>Types: ${types.join(", ")}</p><p>Abilities: ${abilities.join(", ")}</p><img src="${image}" alt="Image of the selected Pokemon" width="200" height="200">`;
  
      $("#pokemonModal").modal("show");
    }
  
    function hideModal() {
      $("#pokemonModal").modal("hide");
    }
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideModal();
      }
    });
  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("Pokemon is not correct");
      }
    }
  
    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types.map((type) => type.type.name);
          item.abilities = details.abilities.map(
            (ability) => ability.ability.name,
          );
          return item; // Return the updated item
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon)
        .then(function (updatedPokemon) {
          showModal(
            updatedPokemon.name,
            `Height: ${updatedPokemon.height}`,
            updatedPokemon.imageUrl,
            updatedPokemon.types,
            updatedPokemon.abilities,
          );
        })
        .catch(function (error) {
          console.error("Error loading Pokemon details:", error);
        });
    }
  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
