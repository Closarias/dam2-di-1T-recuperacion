import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // archivo donde se guardan los datos
  logging: false, // pon true si quieres ver las consultas en consola
});