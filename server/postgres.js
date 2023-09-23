require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
        logging: false,
        native: false,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, './src/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, './src/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Consorcio, Unidad, Administrador, Propietario } = sequelize.models;

// Asociación entre Administrador y Consorcio (un Administrador puede tener muchos Consorcios)
Administrador.hasMany(Consorcio);


// Asociación entre Consorcio y Administrador (un Consorcio pertenece a un único Administrador)
Consorcio.hasMany(Unidad);
// Asociación entre Consorcio y Unidad (un Consorcio puede tener muchas Unidades)
Consorcio.belongsTo(Administrador);
// Asociación entre Consorcio y Propietario (un Consorcio puede tener muchos Propietarios a través de Unidades)
Consorcio.belongsToMany(Propietario, { through: "consorcio_propietario" });

// Asociación entre Propietario y Unidad (un Propietario puede tener muchas Unidades)
Propietario.hasMany(Unidad);
// Asociación entre Propietario y Consorcio (un Propietario puede pertenecer a muchos Consorcios a través de Unidades)
Propietario.belongsToMany(Consorcio, { through: "consorcio_propietario" } );


// Asociación entre Unidad y Consorcio (una Unidad pertenece a un único Consorcio)
Unidad.belongsTo(Consorcio);
// Asociación entre Unidad y Propietario (una Unidad pertenece a un único Propietario)
Unidad.belongsTo(Propietario);

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
