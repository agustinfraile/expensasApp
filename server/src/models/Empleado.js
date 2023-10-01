const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "empleado",
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
            puesto: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sueldo: {
                type: DataTypes.FLOAT,
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