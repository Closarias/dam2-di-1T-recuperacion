import ListadoProyectos from "@/pages/ListadoProyectos";
import NuevoProyecto from "@/pages/NuevoProyecto";
import PageNotFound from "@/pages/PageNotFound";
import {createBrowserRouter} from "react-router-dom";



export const router = createBrowserRouter([
    {path: "/", element:<ListadoProyectos />},
    {path: "nuevo-proyecto", element:<NuevoProyecto />},
    {path: "*", element:<PageNotFound />}
]);