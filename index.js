const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;

  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        const lugarSel = lugares.find((l) => l.id === id);
        // console.log(lugarSel);

        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        console.clear();
        console.log("\n Información de la Ciudad\n".green);
        console.log("Ciudad", lugarSel.nombre);
        console.log("lat:", lugarSel.lat);
        console.log("lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("min:", clima.min);
        console.log("max:", clima.max);
        console.log("Como esta el Clima:", clima.desc);

        break;

      default:
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
