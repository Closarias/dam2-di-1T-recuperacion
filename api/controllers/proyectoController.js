// controllers/proyectoController.js
import { Op } from "sequelize";
import { Proyecto } from "../models/Proyecto.js";

/**
 * Convierte "EN_CURSO" -> "En curso", "PAUSADO" -> "Pausado"
 * (para que el front lo pinte tal cual en el listado)
 */
const estadoToLabel = (estado) => (estado === "EN_CURSO" ? "En curso" : "Pausado");

/**
 * GET /api/proyectos
 * Listado de proyectos con filtrado por estado (sin ordenación)
 * Query params opcionales:
 *  - estado ("TODOS" | "EN_CURSO" | "PAUSADO")
 */
export const listarProyectos = async (req, res) => {
  try {
    const { estado } = req.query;

    const where = {};

    if (estado !== undefined) {
      if (estado !== "TODOS" && estado !== "EN_CURSO" && estado !== "PAUSADO") {
        return res.status(400).json({ error: "Parámetro 'estado' no válido" });
      }
      if (estado !== "TODOS") {
        where.estado = estado;
      }
    }

    const proyectos = await Proyecto.findAll({
      where,
      attributes: ["id", "nombre", "cliente", "estado"],
      order: [
        ["id", "ASC"], // simple y estable
      ],
    });

    // Opcional: devolver "estado_label" además del estado raw
    const salida = proyectos.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cliente: p.cliente,
      estado: p.estado,
      estado_label: estadoToLabel(p.estado),
    }));

    res.json(salida);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo proyectos" });
  }
};

/**
 * POST /api/proyectos
 * Crear proyecto
 * Body JSON:
 *  { nombre, cliente, estado, email?, telefono? }
 *
 * Validaciones:
 *  - nombre: obligatorio, string, 3..60
 *  - cliente: obligatorio, string, 2..60
 *  - estado: obligatorio, "EN_CURSO" | "PAUSADO"
 *  - email: opcional, si viene debe tener formato básico
 *  - telefono: opcional, si viene 9..15 (solo dígitos, espacios, +, -)
 */
export const crearProyecto = async (req, res) => {
  try {
    const { nombre, cliente, estado, email, telefono } = req.body;

    // --- Requeridos ---
    if (!nombre || !cliente || !estado) {
      return res.status(400).json({
        error: "nombre, cliente y estado son obligatorios",
      });
    }

    if (typeof nombre !== "string" || typeof cliente !== "string" || typeof estado !== "string") {
      return res.status(400).json({
        error: "nombre, cliente y estado deben ser strings",
      });
    }

    const nombreTrim = nombre.trim();
    const clienteTrim = cliente.trim();

    if (nombreTrim.length < 3 || nombreTrim.length > 60) {
      return res.status(400).json({
        error: "nombre debe tener entre 3 y 60 caracteres",
      });
    }

    if (clienteTrim.length < 2 || clienteTrim.length > 60) {
      return res.status(400).json({
        error: "cliente debe tener entre 2 y 60 caracteres",
      });
    }

    if (estado !== "EN_CURSO" && estado !== "PAUSADO") {
      return res.status(400).json({
        error: "estado debe ser 'EN_CURSO' o 'PAUSADO'",
      });
    }

    // --- Opcionales ---
    let emailNorm = null;
    if (email !== undefined && email !== null && email !== "") {
      if (typeof email !== "string") {
        return res.status(400).json({ error: "email debe ser un string" });
      }
      const e = email.trim();
      // validación simple (suficiente para examen)
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      if (!emailOk) {
        return res.status(400).json({ error: "email no tiene un formato válido" });
      }
      emailNorm = e;
    }

    let telefonoNorm = null;
    if (telefono !== undefined && telefono !== null && telefono !== "") {
      if (typeof telefono !== "string") {
        return res.status(400).json({ error: "telefono debe ser un string" });
      }
      const t = telefono.trim();
      // permite dígitos, espacios, + y -
      const telOk = /^[0-9+\-\s]+$/.test(t);
      if (!telOk) {
        return res.status(400).json({ error: "telefono contiene caracteres no permitidos" });
      }
      const digits = t.replace(/[^\d]/g, "");
      if (digits.length < 9 || digits.length > 15) {
        return res.status(400).json({ error: "telefono debe tener entre 9 y 15 dígitos" });
      }
      telefonoNorm = t;
    }

    const nuevo = await Proyecto.create({
      nombre: nombreTrim,
      cliente: clienteTrim,
      estado,
      email: emailNorm,
      telefono: telefonoNorm,
    });

    res.status(201).json({
      id: nuevo.id,
      nombre: nuevo.nombre,
      cliente: nuevo.cliente,
      estado: nuevo.estado,
      estado_label: estadoToLabel(nuevo.estado),
      email: nuevo.email,
      telefono: nuevo.telefono,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando proyecto" });
  }
};

/**
 * DELETE /api/proyectos/:id
 * Eliminar un proyecto
 */
export const eliminarProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const proyecto = await Proyecto.findByPk(idNum);

    if (!proyecto) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    await proyecto.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando proyecto" });
  }
};