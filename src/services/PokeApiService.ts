import { PokemonApiResponse } from "./../models/Pokemon";
import { PokemonValidator } from "../validators/PokemonValidator";
import { ApiError, LocalBoxError, ValidationError } from "../models/CustomErrors";
import { SearchValidator } from "../validators/SearchValidator";

const url_base = "https://pokeapi.co/api/v2/pokemon/";

export async function searchPokemon(
  nomeOuId: string | number,
): Promise<PokemonApiResponse| null> {
  try {
    const validValue = SearchValidator.validateValue(nomeOuId);

    if (!validValue) {
      throw new ApiError(`Busca por Pokémon *${nomeOuId}* não é válida.`);     
    }

    const valueWithoutLeftZero =
      typeof nomeOuId === "string" && /^\d+$/.test(nomeOuId)
        ? Number(nomeOuId)
        : nomeOuId.toString().toLocaleLowerCase().trim();

    const response = await fetch(`${url_base}${valueWithoutLeftZero}`);

    switch (response.status) {
      case 200: {
        const responseApi = await response.json();

        if (!(typeof responseApi === "object") || !responseApi) {
          throw new ApiError(`Retorno inválido.`);         
        }

        const dados = PokemonValidator.validateJson(responseApi);

        if (!dados) {
          throw new ApiError(`Retorno inválido.`);         
        }

        return new PokemonApiResponse(
          dados.id,
          dados.name,
          dados.height,
          dados.weight,
          dados.types.map((type) => ({type: {name: String(type.type.name)}})),
          dados.stats.map((stat) => ({base_stat: Number(stat.base_stat), stat: {name: String(stat.stat.name)}})),
        );//retorno deve gravar o json format
        
      }
      case 400: {
        throw new ValidationError(`Requisição inválida.`);     
      }
      case 404: {
        throw new ValidationError(`Pokémon *${nomeOuId}* não encontrado.`);        
      }
      default: {
        throw new ValidationError(`Não foi possível completar a solicitação ${response.status}-${response.statusText}.`);      
      }
    }
  } catch (erro) {
    if (erro instanceof ApiError) {
      console.log(erro.message);
      return null;
    } 
    if (erro instanceof ValidationError) {
      console.log(erro.message);
      return null;
    }  
    
    console.log("Erro inesperado ao buscar o Pokémon no catálogo."); 
    return null;
  }
}