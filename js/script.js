let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function addListItem(pokemon) {
      let pokemonListContainer = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      button.addEventListener('click', function() {
          showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokemonListContainer.appendChild(listItem);
  }

  function showModal(title, text, image) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imgElement = document.createElement('p');
      let img = document.createElement('img');
      img.src = image;
      img.alt = "Image of the selected Pokemon";
      img.width = 200;
      img.height = 200;

      modal.appendChild(img);
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
              hideModal();
          }
      });
  }

  function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
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
                      detailsUrl: item.url
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
              item.types = details.types;
          })
          .catch(function (e) {
              console.error(e);
          });
  }

  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
          showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
      });
  }

  return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});


