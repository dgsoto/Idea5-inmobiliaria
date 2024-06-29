import './metrics.css'
export default function Metrics() {
  return (
    
    <div className="metrics-component card shadow-lg">
      <p className="mt-4 text-center">Total Propiedades Listadas</p>
        {/* Ingresar una tabla */}

        <div className=' metrics'>
        <div className="metrics-card card">
        <p className='card-title'>Deptos.</p>
        <p className='card-text fw-bold'>50</p>
        </div>
        <div className="metrics-card card">
        <p className='card-title'>Casas</p>
        <p className='card-text fw-bold'>44</p>
        </div>
        <div className="metrics-card card">
        <p className='card-title'>Proyectos</p>
        <p className='card-text fw-bold'>10</p>
        </div>
        </div>
    </div>
  
  )
}
