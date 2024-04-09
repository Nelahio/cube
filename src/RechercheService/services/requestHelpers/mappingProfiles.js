const automapper = require("automapper-ts");

automapper.initialize((config) => {
  config
    .createMap("EnchereCreated", "Produit")
    .forMember("_id", (opts) => opts.mapFrom("id"));
});
