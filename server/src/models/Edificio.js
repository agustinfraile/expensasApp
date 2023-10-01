const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("edificio", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pisos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        haySubsuelo: {
            type: DataTypes.BOOLEAN,
        },
        cantidadSubsuelo: {
            type: DataTypes.INTEGER,
        },
        unidadesDelEdificio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
};