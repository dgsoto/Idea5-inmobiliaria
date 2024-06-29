import './ingresos.css'

export default function Transacciones() {
    return (
        <div className='ingresos-component card shadow-lg'>
          <p className='mt-4 text-center'>Total Transacciones realizadas</p>
          {/* Ingresar una tabla */}
          <div className='ingresos'>
            <div className='ingresos-card card'>
              <p className='card-title'>Compras</p>
              <p className='card-text fw-bold'>50</p>
            </div>
    
            <div className='ingresos-card card'>
              <p className='card-title'>Ventas</p>
              <p className='card-text fw-bold'>44</p>
            </div>
    
            <div className='ingresos-card card'>
              <p className='card-title'>Alquileres</p>
              <p className='card-text fw-bold'>10</p>
            </div>
    
          </div>
        </div>
      )
}
