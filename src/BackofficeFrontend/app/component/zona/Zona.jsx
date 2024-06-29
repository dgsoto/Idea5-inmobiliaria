import React from 'react'

export default function Zona() {
  return (
    <div className="card shadow-lg p-4 text-center">
      <p className="">Ocupación de alquileres por zona</p>
      
        <table>
        
          <tr>
            <th></th>
            <th>Lanus</th>
            <th>San Martín</th>
            <th>Olivos</th>
            <th>Quilmes</th>
          </tr>
          <tr className="border-bottom">
            <td>Noviembre</td>
            <td>600</td>
            <td>600</td>
            <td>600</td>
            <td>600</td>
          </tr>
          <br />
          <tr className="border-bottom">
            <td>Diciembre</td>
            <td>700</td>
            <td>700</td>
            <td>700</td>
            <td>700</td>
          </tr>
          <br />
          <tr className="border-bottom">
            <td>Enero</td>
            <td>600</td>
            <td>600</td>
            <td>600</td>
            <td>600</td>
          </tr>
          <br />
        </table>
      </div>
  )
}
