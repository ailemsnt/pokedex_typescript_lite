import { CatalogoPokemon } from "./services/BoxService";
import { buscarPokemon } from "./services/PokeApiService";

async function main() {

  const catalogo = new CatalogoPokemon();

  const pikachu = await buscarPokemon("pikachu");

  if (pikachu !== null) {
    catalogo.adicionarCatalogo(pikachu);
  }

  const pikachu1 = await buscarPokemon("Pikachu");

  if (pikachu1 !== null) {
    catalogo.adicionarCatalogo(pikachu1);
  }

  const pikachu2 = await buscarPokemon("");

  if (pikachu2 !== null) {
    catalogo.adicionarCatalogo(pikachu2);
  }

  const pokemonId = await buscarPokemon(39);

  if (pokemonId !== null) {
    catalogo.adicionarCatalogo(pokemonId);
  }

  const charmander = await buscarPokemon("charmander");

  if (charmander !== null) {
    catalogo.adicionarCatalogo(charmander);
  }

  const pikachuDuplicado = await buscarPokemon("pikachu");

  if (pikachuDuplicado !== null) {
    catalogo.adicionarCatalogo(pikachuDuplicado);
  }

  const infinito = await buscarPokemon("");
  const nomeErrado = await buscarPokemon("KMPO$%EREWER  SERRWER");

  await buscarPokemon("pokemon-inexistente");
  catalogo.listarCatalogo();
  catalogo.removerCatalogo(25);
  catalogo.removerCatalogo(26);
  catalogo.listarCatalogo();

}

main();
