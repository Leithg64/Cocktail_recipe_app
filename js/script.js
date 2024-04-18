let pokemonRepository = (function() {
    //Array filled with objects representing pokemon
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Return list of pokemon as buttons, listens for certain events
function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); 
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    button.addEventListener('click', showDetails(pokemon));
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    })
}

//modal code below
function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

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

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

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



//modal code above

// Return an Array of pokemon
function getAll() {
    return pokemonList;
}

function add(pokemon) {
    if (
        typeof pokemon === "object" &&
        "name" in pokemon /*&&
        "detailsUrl" in pokemon*/
    ) {
        pokemonList.push(pokemon);
    } else {
        console.log("opkemon is not correct");
    }
}

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
}

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
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

//iterates over the above array of pokemon objects and lists them all on the webpage, followed by their height.
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
});



