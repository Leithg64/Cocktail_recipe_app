let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function addListItem(pokemon) {
      let pokemonListContainer = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary', 'pokemon-button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemonModal');
      button.addEventListener('click', function() {
          showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokemonListContainer.appendChild(listItem);
  }

function showModal(title, text, image) {
    // Remove any existing modals
    $('.modal').remove();

    // Create and append the modal HTML
    let modalContainer = document.querySelector('#modal-container');
    let modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'pokemonModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'pokemonModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.setAttribute('role', 'document');

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    let modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    let modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.setAttribute('id', 'pokemonModalLabel');
    modalTitle.innerText = title;

    let closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    let closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.innerHTML = '&times;';

    closeButton.appendChild(closeIcon);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imgElement = document.createElement('p');
    let img = document.createElement('img');
    img.src = image;
    img.alt = "Image of the selected Pokemon";
    img.width = 200;
    img.height = 200;

    modalBody.appendChild(contentElement);
    modalBody.appendChild(img);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    modalContainer.appendChild(modal);

    // Show the modal
    $('#pokemonModal').modal('show');
}






  function hideModal() {
      $('#pokemonModal').modal('hide');
  }

  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
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
            return item; // Return the updated item
        })
        .catch(function (e) {
            console.error(e);
        });
}

function showDetails(pokemon) {
    loadDetails(pokemon).then(function (updatedPokemon) {
        showModal(updatedPokemon.name, `Height: ${updatedPokemon.height}`, updatedPokemon.imageUrl);
    }).catch(function (error) {
        console.error('Error loading Pokemon details:', error);
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
