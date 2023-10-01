const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "administrador",
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            apellido: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            pass: {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            telefono: {
                type: DataTypes.STRING
            },            
            estado: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }
    )
};