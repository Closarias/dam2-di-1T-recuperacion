// models/Proyecto.js (mínimo esperable para que encaje con el controller)
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Proyecto = sequelize.define(
    "Proyecto",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nombre: { type: DataTypes.STRING(60), allowNull: false },
        cliente: { type: DataTypes.STRING(60), allowNull: false },
        estado: { type: DataTypes.ENUM("EN_CURSO", "PAUSADO"), allowNull: false },
        email: { type: DataTypes.STRING(120), allowNull: true },
        telefono: { type: DataTypes.STRING(20), allowNull: true },
    },
    {
        tableName: "proyectos",
        timestamps: false,
    }
);