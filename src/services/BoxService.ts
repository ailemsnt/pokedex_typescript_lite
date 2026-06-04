import { error } from "console";
import { PokemonResumo } from "../models/Pokemon";
import { formatPokemon, formatPokeName, msgSucess, msgWarning } from "../utils/textFormatters";
import { PokemonValidator } from "../validators/PokemonValidator";
import { LocalBoxError } from "../models/CustomErrors";

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];
  //ver se ta validando uppercase
  adicionarCatalogo(pokemon: PokemonResumo): void {
    try {
      const validValue = PokemonValidator.validateValue(pokemon.id);
      if (!validValue) {        
        return;
      }
      const pokemonExists = this.pokemons.some((item) => item.id === pokemon.id);

      if (pokemonExists) {
        console.log(msgWarning(`${formatPokeName(pokemon.name)} já está no catálogo.`));
        return;
      }

      this.pokemons.push(pokemon);

      console.log(msgSucess(`${formatPokeName(pokemon.name)} adicionado ao catálogo.`));
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      }  

      console.log("Erro inesperado ao adicionar o Pokémon ao catálogo.");    
    }
  }

  listarCatalogo(): void {
    try {
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
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      }
      
      console.log("Erro inesperado ao listar o catálogo.");
    }
  }

  removerCatalogo(id: number): void {
    try {
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
      console.log(msgSucess(`Pokémon ${formatPokeName(pokemonRemovido.name)} removido do catálogo.`));
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      } 
      
      console.log("Erro inesperado ao remover Pokémon do catálogo.");      
    }
  }
}