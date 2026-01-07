import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { eliminarProyecto, listarProyecto } from "@/services/proyectosService";
import type { Proyecto } from "@/types/proyectos";
import type { APIResult } from "@/types/util";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

export type Proyectos = {
  id: number;
  nombre: string;
  cliente: string;
  estado: string;
  estadoLabel: string;
};

export default function ListadoProyectos() {
  const [proyectos, setProyectos] = useState<Proyectos[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filtroEstado, setFiltroEstado] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    const loadProyectos = async () => {
      try {
        const response: APIResult<Proyecto[]> = await listarProyecto();
        if (!response.ok) {
          throw new Error(String(response.error));
        }
        const resultado: Proyecto[] =
          response.data?.map((m) => ({
            id: m.id,
            nombre: m.nombre,
            cliente: m.cliente,
            estado: m.estado,
            estadoLabel: m.estadoLabel,
          })) || [];
        setProyectos(resultado);
      } catch (err: any) {
        setError(err?.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    loadProyectos();
  }, []);

  const handleFiltroEstadoOnChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setFiltroEstado(evt.target.value);
  };

  const handleDeleteProyecto = async (proyectoId: number) => {
    try {
      const response: APIResult<void> = await eliminarProyecto(proyectoId);
      if (!response.ok) {
        alert(response.error || "Error al eliminar el proyecto");
        return;
      }
      setProyectos((prev) => prev?.filter((p) => p.id !== proyectoId));
      alert("Proyecto eliminado con éxito");
    } catch (err: any) {
      alert(err?.message ?? "Error desconocido");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h1 className="text-4xl font-bold text-blue-500">
          Cargando proyectos...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h1 className="text-5xl font-bold text-red-500">Error</h1>
        <h2 className="text-xl mt-4">No se pudieron cargar los proyectos</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  const proyectosFiltrados =
    proyectos?.filter((p) => !filtroEstado || p.estado === filtroEstado) ?? [];

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <section className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Listado de proyectos
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Usa el filtro para ver solo los proyectos en un estado concreto.
              </p>
            </section>

            <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <h2 className="text-sm font-medium text-slate-700">
                  Filtrar por estado
                </h2>
                <p className="text-xs text-slate-500">
                  Muestra todos, en curso o pausados.
                </p>

                <div className="mt-2 w-full sm:w-80">
                  <label
                    htmlFor="estado-select"
                    className="block text-xs font-medium text-slate-600 mb-1"
                  >
                    Estado
                  </label>
                  <select
                    id="estado-select"
                    name="estado"
                    value={filtroEstado}
                    onChange={handleFiltroEstadoOnChange}
                    className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Todos</option>
                    <option value="EN_CURSO">En curso</option>
                    <option value="PAUSADO">Pausado</option>
                  </select>
                </div>
              </div>

              <Link
                to="nuevo-proyecto"
                className="inline-flex justify-center items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white
               hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                + Nuevo proyecto
              </Link>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Proyectos
                </h2>
                <span className="text-xs text-slate-500">
                  Total: <span id="total-proyectos">6</span>
                </span>
              </div>

              <div id="error-panel" className="hidden px-4 pt-3">
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">
                  <p className="font-semibold">
                    No se han podido cargar los proyectos.
                  </p>
                  <p className="mt-0.5 text-red-700/90">
                    Revisa el servidor o vuelve a intentarlo.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-slate-600">
                        Proyecto
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-600">
                        Cliente
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-600">
                        Estado
                      </th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-600">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {proyectosFiltrados?.map((m) => (
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2 whitespace-nowrap font-medium text-slate-800">
                          {m.nombre}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {m.cliente}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span
                            className={
                              "inline-flex items-center rounded-full" +
                              (m.estado === "EN_CURSO"
                                ? "bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100"
                                : "bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 border border-red-200")
                            }
                          >
                            {m.estado}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-xl border border-rose-200 px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                            onClick={() => handleDeleteProyecto(m.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
