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
const { Edificio, Empleado, Gasto, Ingreso, Propietario, ServicioMensual, Unidad  } = sequelize.models;

// Relaciones entre modelos

// Un usuario puede tener muchos departamentos, con una clave foránea 'usuarioId'
Propietario.hasMany(Unidad, { foreignKey: 'usuarioId', as: 'departamentos' });
// Cada departamento pertenece a un usuario, con una clave foránea 'usuarioId'
Unidad.belongsTo(Propietario, { foreignKey: 'usuarioId', as: 'propietario' });

// Un edificio puede tener muchos departamentos, con una clave foránea 'edificioId'
Edificio.hasMany(Unidad, { foreignKey: 'edificioId', as: 'departamentos' });
// Cada departamento pertenece a un edificio, con una clave foránea 'edificioId'
Unidad.belongsTo(Edificio, { foreignKey: 'edificioId', as: 'edificio' });

// Un edificio puede tener muchos gastos, con una clave foránea 'edificioId'
Edificio.hasMany(Gasto, { foreignKey: 'edificioId', as: 'gastos' });
// Cada gasto pertenece a un edificio, con una clave foránea 'edificioId'
Gasto.belongsTo(Edificio, { foreignKey: 'edificioId', as: 'edificio' });

// Un edificio puede tener muchos ingresos, con una clave foránea 'edificioId'
Edificio.hasMany(Ingreso, { foreignKey: 'edificioId', as: 'ingresos' });
// Cada ingreso pertenece a un edificio, con una clave foránea 'edificioId'
Ingreso.belongsTo(Edificio, { foreignKey: 'edificioId', as: 'edificio' });

// Un usuario puede tener muchos ingresos, con una clave foránea 'usuarioId'
Propietario.hasMany(Ingreso, { foreignKey: 'usuarioId', as: 'ingresos' });
// Cada ingreso pertenece a un usuario, con una clave foránea 'usuarioId'
Ingreso.belongsTo(Propietario, { foreignKey: 'usuarioId', as: 'propietario' });

// Un edificio puede tener muchos servicios mensuales, con una clave foránea 'edificioId'
Edificio.hasMany(ServicioMensual, { foreignKey: 'edificioId', as: 'serviciosMensuales' });
// Cada servicio mensual pertenece a un edificio, con una clave foránea 'edificioId'
ServicioMensual.belongsTo(Edificio, { foreignKey: 'edificioId', as: 'edificio' });

// Un edificio puede tener muchos empleados 
Edificio.belongsToMany(Empleado, { through: 'EdificioEmpleado', foreignKey: 'edificioId', as: 'empleados' });
// Un empleado puede estar en varios edificios
Empleado.belongsToMany(Edificio, { through: 'EdificioEmpleado', foreignKey: 'empleadoId', as: 'edificios' });


module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
