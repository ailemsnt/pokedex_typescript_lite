import { PokemonResumo } from "../models/Pokemon";
import { formatPokemon, formatPokeName, msgSucess, msgWarning } from "../utils/textFormatters";
import { PokemonValidator } from "../validators/PokemonValidator";

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];
  //ver se ta validando uppercase
  adicionarCatalogo(pokemon: PokemonResumo): void {
    const validValue = PokemonValidator.validateValue(pokemon.id);
    if (!validValue) {        
      return;
    }
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(msgWarning(`${formatPokeName(pokemon.name)} já está no catálogo.`));
      return;
    }

    this.pokemons.push(pokemon);
    console.log(msgSucess(`${formatPokeName(pokemon.name)} adicionado ao catálogo.`));

  }

  listarCatalogo(): void {
    if (this.pokemons.length === 0) {
      console.log(msgWarning("Catálogo vazio."));
      return;
    }    

    console.log("\n________________________\n ");
    console.log(  " Catálogo atual:        ");
    this.pokemons.forEach((pokemon) => {     
      console.log(formatPokemon(pokemon));
    });
    console.log("________________________\n ");
  }

  removerCatalogo(id: number): void {
    const validValue = PokemonValidator.validateValue(id);
    if (!validValue) {        
      return;
    }

    const pokemonRemovido = this.pokemons.find((pokemon) => pokemon.id === id );//this.pokemons.some((pokemon) => pokemon.id === id);

    if (!pokemonRemovido) {
      console.log(msgWarning(`Nenhum Pokémon encontrado no catálogo com o ID ${id}.`));
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log(msgSucess(`Pokémon ${pokemonRemovido.name} removido do catálogo.`));
  }
}