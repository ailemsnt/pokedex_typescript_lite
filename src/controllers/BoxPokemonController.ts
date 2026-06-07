import { PokemonApiResponse } from './../models/Pokemon';
import { Interface } from 'node:readline/promises';
import { CatalogoPokemon } from "../services/BoxService";
import { searchPokemon } from "../services/PokeApiService";
import { formatPokeName, msgError, msgSucess } from '../utils/textFormatters';
import { PokemonValidator } from '../validators/PokemonValidator';

function validateSelectedMenu(operation: number): boolean {
  const operationSelected = Number(operation);
  return Number.isInteger(operationSelected) && operationSelected >= 1 && operationSelected <= 4;
}

function validateSelectedId(operation: number) : boolean { 
  return Number.isInteger(operation) && operation > 0 && operation <= 100000;
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
    console.log(" 1. Capturar Pokémon ");
    console.log(" 2. Ver pokémons capturados");
    console.log(" 3. Remover pokémon da sua pokédex");
    console.log(" 4. Sair");
    console.log("==========================\n");

    const resultOperation = await interfaceConsole.question(
      "Digite a opção escolhida:\n", 
    );

    switch (resultOperation) {
      case "1": {  
        const nameOrId = await interfaceConsole.question(
          "Digite o nome ou ID do Pokémon que deseja buscar:\n",
        );

        const pokemonNameOrId = /^\d+$/.test(nameOrId.trim()) ? Number(nameOrId): nameOrId.toLocaleLowerCase();
        const pokemonResponse = await searchPokemon(pokemonNameOrId);        

        if (!pokemonResponse) { 
          break;
        }
        
        console.log(msgSucess(`Pokémon encontrado: ${formatPokeName(pokemonResponse.name)}`));
        await catalogo.addCatalog(pokemonResponse);   

        break;
      }
      case "2": {        
        await catalogo.listCatalog();
        break;
      }
      case "3": {   
        const pokemonExist = await catalogo.listCatalog();

        if (!pokemonExist) {
          break;
        }

        const id = await interfaceConsole.question(
          "Digite o ID do Pokémon que deseja remover:\n",
        );

        await catalogo.removeCatalog(Number(id));
        await catalogo.listCatalog();
        break;        
      }
      case "4": {
        console.log("Saindo...");             
        running = false;   
        break;         
      }
      default: {
        console.log(msgError("Opção inválida. Por favor, escolha uma opção válida."));
        break;
      }     
    }   
    
    if (running) {
      await interfaceConsole.question('\n> Pressione ENTER para prosseguir...');
      continue;
    }

  }
  return running;
}