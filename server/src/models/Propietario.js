const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "propietario",
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apellido: {
                type: DataTypes.STRING,
                allowNull: false
            },
            correoElectronico: {
                type: DataTypes.STRING,
                unique: true
            }
        }
    )
};