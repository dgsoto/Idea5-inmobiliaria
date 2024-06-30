import '../ingresos/ingresos.css'

export default function Usuarios() {
    return (
        <div className='ingresos-component card shadow-lg z-3'>
            <p className="mt-4 text-center">Total Usuarios Activos</p>
            <div className='ingresos'>
            
            <div className='ingresos-card card'>
            <p className='card-title'>Compradores</p>
            <p className='card-text fw-bold'>50</p>
            </div>
            <div className='ingresos-card card'>
            <p className='card-title'>Vendedores</p>
            <p className='card-text fw-bold'>44</p>
            </div>
            <div className='ingresos-card card'>
            <p className='card-title'>Inmobiliarias</p>
            <p className='card-text fw-bold'>10</p>
            </div>
    
        </div>
        </div>
      )
}
