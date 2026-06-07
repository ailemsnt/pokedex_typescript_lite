import { ValidationError } from '../models/CustomErrors';
import { PokemonApiResponse, PokemonItem } from '../models/Pokemon';
import { BaseValidator } from './baseValidator';
export class PokemonValidator extends BaseValidator  {
  static validateJson(value: unknown): PokemonApiResponse {
    if (!this.isObject(value)) {
      throw new ValidationError("Retorno inválido.");      
    }

    if (!("id" in value)) {
      throw new ValidationError("ID do Pokemón não encontrado.");      
    }

    if (!this.isNumber(value.id)) {
      throw new Error("ID não é um número válido.");
    }

    if (!("name" in value)) {
      throw new ValidationError("Nome do Pokemón não encontrado.");      
    }

    if (!this.isString(value.name)) {
      throw new Error("Nome não é uma string válida.");
    }

    if (!("height" in value)) {
      throw new ValidationError("Altura do Pokemón não encontrada.");      
    }

    if (!this.isNumber(value.height)) {
      throw new Error("Altura não é um número válido.");
    }

    if (!("weight" in value)) {
      throw new ValidationError("Peso do Pokemón não encontrado.");    
    }

    if (!this.isNumber(value.weight)) {
        throw new Error("Peso não é um número válido.");
    }

    if (!("types" in value)) {
      throw new ValidationError("Tipo do Pokemón não encontrado.");      
    }

    if (!Array.isArray(value.types)) {
      throw new ValidationError("Tipos do Pokémon inválidos.");     
    }

    const validTypes = value.types.every((type) => {
      return (
        typeof type === "object" &&
        type !== null &&
        "type" in type &&
        typeof type.type === "object" &&
        type.type !== null &&
        "name" in type.type &&
        typeof type.type.name === "string" &&
        type.type.name.trim() !== ""
      );
    });

    if (!validTypes) {
      throw new ValidationError("Dados dos tipos do Pokémon inválidos.");
    }

    if (!("stats" in value)) {
      throw new ValidationError("Estatísticas do Pokemón não encontradas.");      
    }
  
    if (!Array.isArray(value.stats)) {
      throw new ValidationError("Estatísticas do Pokémon inválidas.");     
    }

    const validStats = value.stats.every((stat) => {
      return (
        typeof stat === "object" &&
        stat !== null &&
        "base_stat" in stat &&
        typeof stat.base_stat === "number" &&
        Number.isFinite(stat.base_stat) &&
        "stat" in stat &&
        typeof stat.stat === "object" &&
        stat.stat !== null &&
        "name" in stat.stat &&
        typeof stat.stat.name === "string" &&
        stat.stat.name.trim() !== ""
      );
    });

    if (!validStats) {
      throw new ValidationError("Dados das estatísticas do Pokémon inválidas.");
    }
    
    const attack = value.stats.find((stats) => stats.stat.name === "attack");
    if (!attack) {
      throw new ValidationError("Ataque do Pokémon não encontrado.");
    }

    if (!validStats) {
      throw new ValidationError("Dados das estatísticas do Pokémon inválidas.");
    }
    
    const defense = value.stats.find((stats) => stats.stat.name === "defense");
    if (!defense) {
      throw new ValidationError("Defesa do Pokémon não encontrada.");
    }

    const hp = value.stats.find((stats) => stats.stat.name === "hp");
    if (!hp) {
      throw new ValidationError("Força do Pokémon não encontrada.");
    }

    const stats = ["attack","defense","hp"];
    const statsFilter = value.stats.filter((stat) => {return stats.includes(stat.stat.name.toLowerCase())});
    const statsReturn = statsFilter.map((stat) => ({base_stat: Number(stat.base_stat), stat: {name: String(stat.stat.name)}})) 
    
    return {
      id: Number(value.id), 
      name: String(value.name), 
      height: Number(value.height), 
      weight: Number(value.weight),
      types: value.types.map((type) => ({type: {name: String(type.type.name)}})),
      stats: statsReturn     
    };    
  } 
}