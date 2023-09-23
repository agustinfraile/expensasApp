const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("consorcio", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
};