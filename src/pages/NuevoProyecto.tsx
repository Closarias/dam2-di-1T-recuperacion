import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function NuevoProyecto() {
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
                <Link to="/"
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
                    id="nombre"
                    name="nombre"
                    type="text"
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
                    id="cliente"
                    name="cliente"
                    type="text"
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
                    id="estado"
                    name="estado"
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
                      id="email"
                      name="email"
                      type="email"
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
                      id="telefono"
                      name="telefono"
                      type="text"
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
                    id="btn-limpiar"
                    className="inline-flex justify-center items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Limpiar
                  </button>

                  <button
                    type="submit"
                    id="btn-crear"
                    className="inline-flex justify-center items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
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
