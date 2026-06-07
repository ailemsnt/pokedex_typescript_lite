import { stdin, stdout } from "process";
import { createInterface } from "node:readline/promises";
import { menuController } from "./controllers/BoxPokemonController";

async function main() {

  const interfaceConsole = createInterface({ input: stdin, output: stdout });

  await menuController(interfaceConsole);

  interfaceConsole.close();
  process.exit(0);
}

main();