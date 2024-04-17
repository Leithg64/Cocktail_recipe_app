let pokemonRepository = (function() {
    //Array filled with objects representing pokemon
    let pokemonList = [
    {
        name: 'Bulbasaur', 
        height: 0.7, 
        type: ['Grass', 'Poison']
    },
    {
        name: 'Charmander', 
        height: 0.6, 
        type: ['Fire']
    },
    {
        name: 'Squirtle', 
        height: 0.5, 
        type: ['Water']
    },
    {
        name: 'Geodude',
        height: 0.4, 
        type: ['Rock','Ground']
    },
    {
        name: 'Haunter', 
        height: 1.6, 
        type: ['Ghost', 'Poison']
    },
    {
        name: 'Raichu', 
        height: 0.8, 
        type: ['Electric']
    },
    {
        name: 'Articuno', 
        height: 1.7, 
        type: ['Ice', 'Flying']
    },
]


//Create list of pokemon as buttons
function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); 
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    button.addEventListener('click', showDetails(pokemon));
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
}

function showDetails(pokemon) {
    console.log(pokemon);
}

// Return an Array of pokemon
function getAll() {
    return pokemonList;
}

function add(pokemon) {
    pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
  
})();

//iterates over the above array of pokemon objects and lists them all on the webpage, followed by their height.
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});



