import './dashboard.css'
import Metrics from "@/component/backoffice/Metrics";
import Chat from "@/component/backoffice/Chat";
import Zona from "@/component/backoffice/zona";
import Taza from '@/component/backoffice/Taza'; 
import Porcentage from "@/component/backoffice/porcentage";
import Ingresos from "@/component/backoffice/Ingresos";
import Transacciones from "@/component/backoffice/Transacciones";
import Usuarios from "@/component/backoffice/Usuarios";
import Pagos from "@/component/backoffice/Pagos";
import Comunas from "@/component/backoffice/Comunas";
import Recientes from "@/component/backoffice/Recientes";

export default function Dashboard() {
    return (
        <section className="container-fluid dashboard">
            
                <h2>Dashboard</h2>
                <article className="stats row">
                   
                    <div className="col-6 p-1">
                    {/* frontend del backoffice */}
                        <Zona></Zona>
                    </div>
                 
                    <div className="col-3 p-1">
                        {/* Tasa de conversión de propiedades */}
                        <Taza></Taza>
                    </div>
                   
                    <div className="col-3 p-1">
                        {/* Porcentaje de ocupación */}
                        <Porcentage></Porcentage>
                    </div>
                    
                </article>


                <article className="metrics row">

                    <div className="col-3 p-1">
                        {/* Total de propuedades listadas */}
                        <Metrics></Metrics>
                    </div>
                    <div className="col-3 p-1">
                        {/* Ingresos totales */}
                        
                        <Ingresos></Ingresos>
                    </div>
                    <div className="col-3 p-1">
                        {/* Total de transacciones realizadas */}
                        <Transacciones></Transacciones>
                    </div>
                    <div className="col-3 p-1">
                        {/* Total de Usuarios activos */}
                        <Usuarios></Usuarios>
                    </div>


                </article>


                <article className="row pagos">

                    <div className="col-6 p-1">
                        {/* Valores por comuna */}
                        <Comunas></Comunas>

                    </div>
                    <div className="col-3 p-1">
                        {/* Mensaje recientes */}
                        <Chat></Chat>
                    </div>
                    <div className="col-3 p-1 d-flex flex-column align-items-stretch justify-content-stretch">
                        
                            {/* Metodos de pagos utilizados */}
                            <Pagos></Pagos>
                            {/* Transacciones realizadas */}
                            <Recientes></Recientes>
                        
                    </div>


                </article>
         

        </section>
    )
}
