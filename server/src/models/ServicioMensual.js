const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "servicioMensual",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            tituloServicio: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            monto: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            descripcion: {
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