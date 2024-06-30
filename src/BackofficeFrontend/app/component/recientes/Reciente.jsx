import React from 'react'

export default function Reciente() {
    return (
        <div className="card h-100 shadow-lg z-3">
            <h6 className="mt-4 text-center">Transacciones recientes</h6>
            
                <table className="recientes-table">
                    <thead>
                    <tr>
                        <th>Fechas</th>
                        <th>Hora</th>
                        <th>Tipo</th>
                        {/* <th>Propiedad</th> */}
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="text-truncate border-bottom">
                        <td>20/03/2024</td>
                        <td>8:45</td>
                        <td>A temp</td>
                        {/* <td>Monoambiente</td> */}
                        <td className="text-danger">Error</td>
                    </tr>
                    
                    <tr className="text-truncate border-bottom">
                        <td>20/03/2024</td>
                        <td>9:15</td>
                        <td>A def.</td>
                        {/* <td>2 ambiente</td> */}
                        <td className="text-warning">En proceso</td>
                    </tr>
                    
                    <tr className="text-truncate border-bottom">
                        <td>20/03/2024</td>
                        <td>8:45</td>
                        <td>A def.</td>
                        {/* <td>Casa</td> */}
                        <td className="text-success">Finalizada</td>
                    </tr>
                    
                    </tbody>
                </table>
            
        </div>
    )
}
