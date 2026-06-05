import { PokemonApiResponse } from './../models/Pokemon';
import { Interface } from 'node:readline/promises';
import { CatalogoPokemon } from "../services/BoxService";
import { buscarPokemon } from "../services/PokeApiService";
import { deleteFileDataBase } from '../services/FileService';

function validateSelection(operation: number): boolean {
  const operationSelected = Number(operation);
  return Number.isInteger(operationSelected) && operationSelected >= 1 && operationSelected <= 4;
}

export async function menuController(interfaceConsole: Interface): Promise<boolean> {
  let running = true;  
  const catalogo = new CatalogoPokemon();    

  while (running) {
    console.log("\n________________________\n ");
    console.log("       POKEDEX LITE     ");
    console.log("=========================");
    console.log("           MENU         ");
    console.log("=========================");
    console.log(" INSTRUÇÕES DE USO:");
    console.log(" Capture Pokémons e busque informações na PokéApi.");
    console.log(" Se prepare para ser um Mestre Pokémon!\n");
    console.log(" Opções:");
    console.log(" 1. Buscar Pokémon ");
    console.log(" 2. Ver pokémons capturados");
    console.log(" 3. Remover pokémon da sua pokédex");
    console.log(" 4. Sair");
    console.log("==========================\n");

    const resultOperation = await interfaceConsole.question(
      "Digite a opção escolhida:\n", 
    );
  
    if (!validateSelection(Number(resultOperation))) {
      console.log("Opção inválida. Por favor, escolha uma opção válida.");
      await interfaceConsole.question('Pressione ENTER para prosseguir...');
      continue;
    }

    switch (resultOperation) {
      case "1": {  
        const nameOrId = await interfaceConsole.question(
          "Digite o nome ou ID do Pokémon que deseja buscar:\n",
        );

        const pokemonNameOrId = /^\d+$/.test(nameOrId.trim()) ? Number(nameOrId): nameOrId.toLocaleLowerCase();
        const pokemon = await buscarPokemon(pokemonNameOrId);

        if (pokemon !== null) {                    
          await catalogo.adicionarCatalogo(pokemon); 
          }
          break;
      }
      case "2": {
        await catalogo.listarCatalogo();
        break;
      }
      case "3": {        
        const nameOrId = await interfaceConsole.question(
          "Digite o ID do Pokémon que deseja remover:\n",
        );
        //const validValue = PokemonValidator.validateValue(nameOrId); 
       // const validId = 0;
       // if (!validValue) {
       //   console.log(`Busca por Pokémon *${nameOrId}* não é válida.`);
         //  throw new ApiError(`Busca por Pokémon *${nameOrId}* não é válida.`);     
       // }

        const pokemonId = Number(nameOrId);
        
        if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
          console.log("ID inválido. Digite um número inteiro positivo.");
          break; // ou continue, dependendo do seu loop
        }

        await catalogo.removerCatalogo(pokemonId);
        break;        
      }
      case "4": {
        console.log("Saindo...");   
        deleteFileDataBase();    
        running = false;   
        break;         
      }
      default: {
        console.log("Opção inválida. Por favor, escolha uma opção válida.");
        break;
      }
      // await interfaceConsole.question('Pressione ENTER para prosseguir...');
      // console.clear();
    }    
  }
  return running;
}