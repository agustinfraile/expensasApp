const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("unidad", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        referenciaUnidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numeroUnidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        metrosCuadrados: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    })
};