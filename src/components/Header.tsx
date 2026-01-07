export default function Header() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-sm font-semibold">
            DI
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">
              Panel de proyectos
            </p>
            <p className="text-xs text-white/80">
              Desarrollo de Interfaces · Recuperación
            </p>
          </div>
        </div>
        <p className="text-xs text-white/80">Listado de proyectos</p>
      </div>
    </div>
  );
}
