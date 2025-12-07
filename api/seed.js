// seed-proyectos.js
import { sequelize } from "./db.js";
import { Proyecto } from "./models/Proyecto.js";

// Datos de ejemplo (proyectos)
const proyectos = [
    {
        nombre: "App de gestión de tareas",
        cliente: "Fundación AyudaNet",
        estado: "EN_CURSO",
        email: "contacto@ayudanet.org",
        telefono: "910000001",
    },
    {
        nombre: "Landing de prácticas FP",
        cliente: "Centro FP",
        estado: "EN_CURSO",
        email: "info@centrofp.es",
        telefono: "910000002",
    },
    {
        nombre: "Dashboard de incidencias",
        cliente: "Asociación Verde",
        estado: "PAUSADO",
        email: "contacto@asociacionverde.org",
        telefono: "910000003",
    },
    {
        nombre: "Inventario solidario",
        cliente: "ONG Reparto",
        estado: "EN_CURSO",
        email: "inventario@ongreparto.org",
        telefono: "910000004",
    },
    {
        nombre: "Portafolio del equipo",
        cliente: "Proyecto interno",
        estado: "EN_CURSO",
        email: "equipo@interna.local",
        telefono: "910000005",
    },
    {
        nombre: "App de reservas",
        cliente: "Startup Local",
        estado: "PAUSADO",
        email: "hola@startuplocal.io",
        telefono: "910000006",
    },
    {
        nombre: "Panel de gestión de voluntariado",
        cliente: "ONG Manos",
        estado: "EN_CURSO",
        email: "voluntariado@ongmanos.org",
        telefono: "910000007",
    },
    {
        nombre: "Web de donaciones",
        cliente: "Fundación Sonrisas",
        estado: "PAUSADO",
        email: "donaciones@sonrisas.org",
        telefono: "910000008",
    },
    {
        nombre: "Gestor de inventario (FP)",
        cliente: "Asociación Recicla",
        estado: "EN_CURSO",
        email: "it@asociacionrecicla.org",
        telefono: "910000009",
    },
    {
        nombre: "Registro de incidencias IT",
        cliente: "Colegio Técnico",
        estado: "PAUSADO",
        email: "soporte@colegiotecnico.es",
        telefono: "910000010",
    },
    {
        nombre: "Agenda de citas",
        cliente: "Clínica Local",
        estado: "EN_CURSO",
        email: "sistemas@clinicalocal.es",
        telefono: "910000011",
    },
    {
        nombre: "Mini CRM",
        cliente: "Empresa Prácticas S.L.",
        estado: "EN_CURSO",
        email: "contacto@empresapracticas.com",
        telefono: "910000012",
    },
];

export default async function seed() {
    try {
        console.log("Conectando con la base de datos...");
        await sequelize.authenticate();

        await sequelize.sync({ force: true });
        console.log("Tablas sincronizadas (force: true) ✅");

        console.log("Insertando proyectos...");
        await Proyecto.bulkCreate(proyectos);
        console.log("Proyectos insertados ✅");

        console.log("Seed completado correctamente 🎉");
    } catch (error) {
        console.error("Error ejecutando el seed:", error);
        process.exit(1);
    }
}