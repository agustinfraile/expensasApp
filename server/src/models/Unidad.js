const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("unidad", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        metrosCuadrados: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        piso: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        referenciaDepto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        }      
    })
};