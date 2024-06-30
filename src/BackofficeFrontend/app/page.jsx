import './dashboard.css'
import Metrics from './component/metrics/metrics';
import Chat from './component/chat/Chat';
import Zona from './component/zona/Zona';
import Taza from './component/taza/Taza';
import Porcentaje from './component/porcentaje/Porcentaje';
import Ingresos from './component/ingresos/Ingresos';
import Pagos from './component/pagos/Pagos';
import Comunas from './component/comuna/Comuna';
import Reciente from './component/recientes/Reciente';
import Transacciones from './component/Transacciones/Transacciones';
import Usuarios from './component/Usuarios/Usuarios';
import SideBar from './component/sidebar/SideBar';


export default function Dashboard() {
    return (
        <div className='d-flex flex-row align-items-center w-100'>
            <SideBar></SideBar>
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
                        <Porcentaje></Porcentaje>
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
                        <Reciente></Reciente>

                    </div>


                </article>


            </section>
        </div>

    )
}
