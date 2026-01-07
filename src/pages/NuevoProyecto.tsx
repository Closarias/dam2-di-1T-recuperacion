import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { crearProyecto } from "@/services/proyectosService";
import type { ProyectoRequest } from "@/types/proyectos";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type ProyectoForm = {
  nombre: string;
  cliente: string;
  estado: "EN_CURSO" | "PAUSADO";
  email: string;
  telefono: string;
};

const defaultProyectoForm: ProyectoForm = {
  nombre: "",
  cliente: "",
  estado: "EN_CURSO",
  email: "",
  telefono: "",
};

export default function NuevoProyecto() {
  const [form, setForm] = useState<ProyectoForm>(defaultProyectoForm);
  const [isValid, setValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNombreOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setForm({
      ...form,
      nombre: value,
    });
  };

  const handleClienteOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setForm({
      ...form,
      cliente: value,
    });
  };

  const handleEstadoOnChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    setForm({
      ...form,
      estado: value === "EN_CURSO" ? "EN_CURSO" : "PAUSADO",
    });
  };

  const handleEmailOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setForm({
      ...form,
      email: value,
    });
  };

  const handleTelefonoOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setForm({
      ...form,
      telefono: value,
    });
  };

  const handleReset = () => {
    setForm(defaultProyectoForm);
  };

  const handleSubmitForm = async () => {
    const request: ProyectoRequest = {
      nombre: form.nombre,
      cliente: form.cliente,
      estado: form.estado,
      email: form.email,
      telefono: form.telefono,
    };

    const response = await crearProyecto(request);

    if (response.ok) {
      const proyecto = response.data!;
      alert(`Proyecto con id ${proyecto.id} ha sido creado con éxito.`);
      navigate("/");
    } else {
      throw new Error(String(response.error));
    }
  };

  useEffect(() => {
    const isNombreValid =
      form.nombre.trim().length > 3 && form.nombre.trim().length < 60;
    const isClienteValid =
      form.cliente.trim().length > 2 && form.cliente.trim().length < 60;
    const isEstadoValid =
      form.estado === "EN_CURSO" || form.estado === "PAUSADO";
    const isEmailValid = form.email === "" || form.email.includes("@");

    setValid(isNombreValid && isClienteValid && isEstadoValid && isEmailValid);
  }, [form]);

  const botonValido = isValid
    ? "inline-flex justify-center items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
    : "inline-flex justify-center items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1";

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Crear proyecto
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Rellena el formulario y guarda el proyecto.
                </p>
              </div>

              <div className="flex justify-start sm:justify-end gap-2">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  ← Volver al listado
                </Link>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-800">
                  Datos del proyecto
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Campos básicos para crear un proyecto.
                </p>
              </div>

              <form id="form-crear-proyecto" className="px-4 py-5 space-y-5">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={handleNombreOnChange}
                    placeholder="Ej: App de gestión de tareas"
                    className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="mt-1 text-xs text-slate-500">Obligatorio.</p>
                </div>

                <div>
                  <label
                    htmlFor="cliente"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Cliente
                  </label>
                  <input
                    type="text"
                    value={form.cliente}
                    onChange={handleClienteOnChange}
                    placeholder="Ej: Fundación AyudaNet"
                    className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="mt-1 text-xs text-slate-500">Obligatorio.</p>
                </div>

                <div>
                  <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Estado
                  </label>
                  <select
                    value={form.estado}
                    onChange={handleEstadoOnChange}
                    className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="EN_CURSO">En curso</option>
                    <option value="PAUSADO">Pausado</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-500">Obligatorio.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Email de contacto
                    </label>
                    <input
                      type="text"
                      value={form.email}
                      onChange={handleEmailOnChange}
                      placeholder="contacto@cliente.com"
                      className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-slate-500">Opcional.</p>
                  </div>

                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Teléfono
                    </label>
                    <input
                      type="text"
                      value={form.telefono}
                      onChange={handleTelefonoOnChange}
                      placeholder="910 000 000"
                      className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-xs text-slate-500">Opcional.</p>
                  </div>
                </div>
                <div id="error-panel" className="hidden px-4 pt-3">
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">
                    <p className="font-semibold">
                      No se ha podido crear el proyecto.
                    </p>
                    <p className="mt-0.5 text-red-700/90">
                      Revisa los datos o inténtalo más tarde.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:justify-end border-t border-slate-100">
                  <button
                    type="reset"
                    onClick={handleReset}
                    className="inline-flex justify-center items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Limpiar
                  </button>
                  <button
                    disabled={!isValid}
                    onClick={handleSubmitForm}
                    className={botonValido}
                  >
                    Crear proyecto
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
