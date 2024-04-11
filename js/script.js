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
];

//iterates over the above array of pokemon objects and lists them all on the webpage, followed by their height.
for (let i = 0; i < pokemonList.length; i++){
    let result = pokemonList[i].height > 1.6 ? "wow, that's big" : "";

    document.write(pokemonList[i].name + "(Height:  " + pokemonList[i].height + ")" + result + "<br> "); 
}