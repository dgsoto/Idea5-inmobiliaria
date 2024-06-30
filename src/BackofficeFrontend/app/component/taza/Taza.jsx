import React from 'react'
import './taza.css'


export default function Taza() {
    return (
        <div className="card shadow-sm p-4 taza h-100">
          <p className="taza-title">Taza de conversión de propiedades</p>
            
          <div className="taza-body">
          <div>
            <ul className="taza-list l">
              <li className="taza-list-item">Departamentos</li>
              <li className="taza-list-item">Casa</li>
              <li className="taza-list-item">Duplex</li>
            </ul>
          </div>
    
          <div className="taza-graph">
           <p>1500</p>
          </div>
          </div>
          
          
        </div>
      )
}
