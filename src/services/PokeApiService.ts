import { PokemonApiResponse, PokemonResumo } from "./../models/Pokemon";
import { formatPokemon, msgError } from "../utils/textFormatters";
import { PokemonValidator } from "../validators/PokemonValidator";
import { ApiError, LocalBoxError, ValidationError } from "../models/CustomErrors";

const url_base = "https://pokeapi.co/api/v2/pokemon/";

export async function buscarPokemon(
  nomeOuId: string | number,
): Promise<PokemonResumo | null> {
  try {
    const validValue = PokemonValidator.validateValue(nomeOuId);

    if (!validValue) {
      throw new ApiError(`Busca por Pokémon *${nomeOuId}* não é válida.`);     
    }

    const valueWithoutLeftZero =
      typeof nomeOuId === "string" && /^\d+$/.test(nomeOuId)
        ? Number(nomeOuId)
        : nomeOuId;

    const response = await fetch(`${url_base}${valueWithoutLeftZero}`);

    switch (response.status) {
      case 200: {
        const responseApi = await response.json();

        if (!(typeof responseApi === "object") || !responseApi) {
          throw new ApiError(`Retorno inválido.`);         
        }

        const pokemon = PokemonValidator.validateJson(responseApi);

        if (!pokemon) {
          throw new ApiError(`Retorno inválido.`);         
        }

        return pokemon;
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