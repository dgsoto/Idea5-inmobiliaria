import './comuna.css'

export default function Comunas() {
    return (
      <div className="card shadow-lg z-3">
        <p className="text-center mt-4">Valores por comuna (ARS): Alquileres Definitivos</p>
        <div className="comunas">
          
          <div className="comunas-map m-4">
            <img src="" alt="Mapa de las comunas que marca los alquileres definitivos"></img>
          </div>
          
          <div>
            {/* Contenido dinámico que se carga segun se selecciona la comuna */}
            <p className="text-center">Comuna 1</p>
            {/* Puede ser una tabla o dos listas */}
            <div className="comunas-list">
              <ul className="list-unstyled text-dark mx-1">
                <li>Barrio</li>
                <li>Retiro</li>
                <li>San Telmo</li>
                <li>Constitución</li>
                <li>Puerto Madero</li>
                <li>San Nicolas</li>
                <li>Monserrat</li>
              </ul>
              <ul className="list-unstyled text-dark mx-1">
                <li>Precio</li>
                <li>360 K</li>
                <li>330 K</li>
                <li>250 K</li>
                <li>390 K</li>
                <li>290 K</li>
                <li>250 K</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  