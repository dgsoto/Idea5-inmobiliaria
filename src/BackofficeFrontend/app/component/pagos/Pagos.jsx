export default function Pagos() {
    return (
      <div className="card shadow-lg z-3">
          <h6 className="mt-4 text-center">Metodos de pago utilizados</h6>
  
          <ul className="text-dark">
              <li className="d-flex flex-row align-items-center">
                  <img alt="Logo de visa"/><p>Tarjeta de crédito</p>
              </li>
              <li className="d-flex flex-row align-items-center">
              <img alt="Logo de banco"/><p>Transferencia Bancarias</p>
              </li>
              <li className="d-flex flex-row align-items-center">
              <img alt="Logo de dinero"/><p>Efectivo</p>
              </li>
              <li className="d-flex flex-row align-items-center">
              <img alt="Logo de paypal"/><p>Paypal</p>
              </li>
          </ul>
      </div>    
    )
  }   
  