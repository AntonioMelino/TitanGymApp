using Microsoft.AspNetCore.Mvc;
using TitanGymApp.Backend.Dominio;
using TitanGymApp.Backend.Negocio;

namespace TitanGymApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagosController : ControllerBase
    {
        private readonly PagoNegocio _pagoNegocio;

        public PagosController()
        {
            _pagoNegocio = new PagoNegocio();
        }

        // ==============================
        // 📌 GET - LISTAR TODOS LOS PAGOS
        // ==============================

        [HttpGet]
        public IActionResult GetPagos()
        {
            try
            {
                var lista = _pagoNegocio.Listar();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // ==============================
        // 📌 GET POR CLIENTE
        // ==============================

        [HttpGet("cliente/{clienteId}")]
        public IActionResult GetPagosPorCliente(long clienteId)
        {
            try
            {
                var lista = _pagoNegocio.ListarPorCliente(clienteId);
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // ==============================
        // ➕ POST - AGREGAR PAGO
        // ==============================

        [HttpPost]
        public IActionResult AgregarPago([FromBody] Pago nuevoPago)
        {
            try
            {
                if (nuevoPago == null)
                    return BadRequest("Los datos enviados son inválidos.");

                nuevoPago.CreatedAt = DateTime.Now;
                nuevoPago.UpdatedAt = DateTime.Now;

                _pagoNegocio.Agregar(nuevoPago);

                return Ok(new { mensaje = "Pago registrado correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // ==============================
        // 🔄 PUT - MODIFICAR PAGO
        // ==============================

        [HttpPut("{id}")]
        public IActionResult ModificarPago(long id, [FromBody] Pago pago)
        {
            try
            {
                if (pago == null || id != pago.Id)
                    return BadRequest("Los datos enviados no coinciden.");

                pago.UpdatedAt = DateTime.Now;
                _pagoNegocio.Modificar(pago);

                return Ok(new { mensaje = "Pago actualizado correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        // ==============================
        // ❌ DELETE - ELIMINAR 
        // ==============================

        [HttpDelete("{id}")]
        public IActionResult EliminarPago(long id)
        {
            try
            {
                _pagoNegocio.Eliminar(id);
                return Ok(new { mensaje = "Pago eliminado correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
