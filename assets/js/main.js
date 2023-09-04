const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')



const maxRecords = 250
const limit = 4
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            
            <div class="detail">
                <ol class="types">
              <li class="type">Type</li>       ${pokemon.types.map((type) => `
             

                    <li class="type ${type}">${type}</li>`).join('')}
                    
            </ul>            
                </ol>
                 <div class="detail">
             
                  
                <span class="abilities">
                ${pokemon.abilities.map((ability) => ability).join('<br><br>')}</span>  
        
            
                 <img class="imagem" src="${pokemon.photo}" alt="${pokemon.name}">
                
                </div>

            </div>
        </li>

       
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})