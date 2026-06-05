import { PokemonResumo } from "../models/Pokemon";
import { formatPokemon, formatPokeName, msgError, msgSucess, msgWarning } from "../utils/textFormatters";
import { PokemonValidator } from "../validators/PokemonValidator";
import { LocalBoxError, ValidationError } from "../models/CustomErrors";
import { removePokemonFromFile, savePokemonToFile, readPokemonFile } from "./FileService";

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = []; 

  async adicionarCatalogo(pokemon: PokemonResumo): Promise<void> {
    try {
      const validValue = PokemonValidator.validateValue(pokemon.id);
      // if (!validValue) {        
      //   return;
      // }
      const pokemonExists = this.pokemons.some((item) => item.id === pokemon.id);

      if (pokemonExists) {
        throw new ValidationError(`${formatPokeName(pokemon.name)} já está no catálogo.`);
      }

      this.pokemons.push(pokemon);
      await savePokemonToFile(pokemon);

      console.log(msgSucess(`${formatPokeName(pokemon.name)} adicionado ao catálogo.`));
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      } 
      if (erro instanceof ValidationError) {
        console.log(erro.message);
        return;
      }  
      
      console.log("Erro inesperado ao adicionar o Pokémon ao catálogo.");    
    }
  }

  async listarCatalogo(): Promise<void> {
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
      if (erro instanceof ValidationError) {
        console.log(erro.message);
        return;
      } 
      
      console.log("Erro inesperado ao listar o catálogo.");
    }
  }

  async removerCatalogo(id: number): Promise<void> {
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

      await removePokemonFromFile(id);

      console.log(msgSucess(`Pokémon ${formatPokeName(pokemonRemovido.name)} removido do catálogo.`));
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      } 
      if (erro instanceof ValidationError) {
        console.log(erro.message);
        return;
      } 
      
      console.log("Erro inesperado ao remover Pokémon do catálogo.");      
    }
  }
}