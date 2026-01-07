import type {APIError, APIResult} from "@/types/util";
import type {Proyecto} from "@/types/proyectos";

const baseURL: string = "http://localhost:3000";

export const listarProyecto = async (): Promise<APIResult<Proyecto[]>> => {
    const response = await fetch(`${baseURL}/api/proyectos/`,
        {
            method: "GET"
        });
    if (response.ok) {
        const proyecto: Proyecto[] = await response.json();
        return {ok: true, data: proyecto};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function crearMascota (request:Proyecto):Promise<APIResult<Proyecto>>{
    const response = await fetch(`${baseURL}/api/proyectos/`,{
        method:'POST',
        body: JSON.stringify(request),
        headers:{
            'Content-type':'application/json',
        },
    });
    if (response.ok){
        const proyecto: Proyecto = await response.json();
        return {ok: true, data: proyecto};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}


export async function eliminarProyecto(id: number): Promise<APIResult<void>> {
    const response = await fetch(`${baseURL}/api/proyectos/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        return {ok: true};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function actualizarProyecto(id: number, request: Proyecto): Promise<APIResult<Proyecto>> {
    const response = await fetch(`${baseURL}/api/proyectos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (response.ok) {
        const proyecto: Proyecto = await response.json();
        return {ok: true, data: proyecto};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}