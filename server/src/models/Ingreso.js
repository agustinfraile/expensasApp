const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ingreso",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            monto: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            edificioAsociado: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            personaQueIngreso: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            estado: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }
    )
};