const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "propietario",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
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
            },
            telefono: {
                type: DataTypes.STRING,
            },
            deptoQueHabita: {
                type: DataTypes.STRING,
                allowNull: false
            },
            deptoPertenece: {
                type: DataTypes.STRING,
                allowNull: false
            },
            estado: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }
    )
};