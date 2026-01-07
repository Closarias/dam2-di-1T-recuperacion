export type Proyecto = {
    id: number;
    nombre: string;
    cliente: string;
    estado: string;
    estadoLabel: string;
}

export type ProyectoRequest = {
    id?: number;
    nombre: string;
    cliente: string;
    estado: "EN_CURSO" | "PAUSADO";
    email?: string;
    telefono?: string;
}
