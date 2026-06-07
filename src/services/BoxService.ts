import { PokemonApiResponse, PokemonItem } from "../models/Pokemon";
import { formatPokemon, formatPokeName, msgError, msgSucess, msgWarning } from "../utils/textFormatters";
import { LocalBoxError, ValidationError, ValidationWarning } from "../models/CustomErrors";
import { removePokemonFromFile, savePokemonToFile, readPokemonFile } from "./FileService";
import { SearchValidator } from "../validators/SearchValidator";
import { PokemonTypes, PokeType } from '../models/PokemonTypes';
import { PokemonStats, PokeStat } from '../models/PokemonStats';
import { error } from "node:console";

export class CatalogoPokemon{  
  async addCatalog(pokemon: PokemonApiResponse): Promise<void> {
    try {
      const validValue = SearchValidator.validateValue(pokemon.id);
      
      if (!validValue) {        
        return;
      }
  
      const pokemonItem = new PokemonItem(     
            pokemon.id, 
            pokemon.name, 
            pokemon.height, 
            pokemon.weight,
            pokemon.types.map((type) => new PokemonTypes(new PokeType(type.type.name))),
            pokemon.stats.map((stat) => new PokemonStats(stat.base_stat, new PokeStat(stat.stat.name)))               
      );
      const pokemonAdded = await savePokemonToFile(pokemonItem);
      if (!pokemonAdded) {
        throw new ValidationWarning(`${formatPokeName(pokemonItem.name)} já está no catálogo.`);
      }

      console.log(msgSucess(`${formatPokeName(pokemonItem.name)} adicionado ao catálogo.`));
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      } 
      if (erro instanceof ValidationError) {
        console.log(erro.message);
        return;
      }  
      if (erro instanceof ValidationWarning) {
        console.log(erro.message);
        return;
      }  
      console.log(msgError("Erro inesperado ao adicionar o Pokémon ao catálogo."));    
    }
  }

  async listCatalog(): Promise<boolean> {
    try {
      const pokemons = await readPokemonFile();

      if (pokemons.length === 0) {
        throw new ValidationWarning("O catálogo de Pokémons está vazio. Capture alguns.");      
      }    

      console.log("\n________________________\n ");
      console.log(  " Catálogo atual:        ");
      pokemons.forEach((pokemon) => {     
        console.log(formatPokemon(pokemon));
      });
      console.log("________________________\n ");
      return true;
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);    
        return false;   
      } 
      if (erro instanceof ValidationError) {
        console.log(erro.message);   
        return false;      
      } 
      if (erro instanceof ValidationWarning) {
        console.log(erro.message); 
        return false;        
      } 
      console.log(erro);
      //console.log(msgError("Erro inesperado ao listar o catálogo de Pokémons."));
      return false;
    }
  }

  async removeCatalog(id: number): Promise<void> {
    try {
      const validValue = SearchValidator.validateValue(id);
      if (!validValue) {        
        return;
      }

      const pokemonRemoved =  await removePokemonFromFile(id);
      
      if (!pokemonRemoved) {
        throw new ValidationError(`Nenhum Pokémon encontrado no catálogo com o ID ${id}.`);        
      } 

      console.log(msgSucess(`Pokémon "${formatPokeName(pokemonRemoved.name)}" removido do catálogo.`));
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(erro.message);
        return;
      } 
      if (erro instanceof ValidationError) {
        console.log(erro.message);
        return;
      } 
      if (erro instanceof ValidationWarning) {
        console.log(erro.message);
        return;
      } 
      
      console.log("Erro inesperado ao remover Pokémon do catálogo.");      
    }
  }
}