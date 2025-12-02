using Microsoft.AspNetCore.Mvc;
using TitanGymApp.Backend.Dominio;
using TitanGymApp.Backend.Negocio;
using TitanGymApp.Backend.Dtos;
using TitanGymApp.Backend.Mappers;
using System;

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

        [HttpGet]
        public IActionResult GetPagos()
        {
            try
            {
                var lista = _pagoNegocio.Listar();
                var dtos = PagoMapper.ToDtoList(lista);
                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpGet("cliente/{clienteId}")]
        public IActionResult GetPagosPorCliente(long clienteId)
        {
            try
            {
                var lista = _pagoNegocio.ListarPorCliente(clienteId);
                var dtos = PagoMapper.ToDtoList(lista);
                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult AgregarPago([FromBody] PagoDto pagoDto)
        {
            try
            {
                if (pagoDto == null)
                    return BadRequest("Los datos enviados son inválidos.");

                // Mapear DTO -> Entidad
                var entidad = PagoMapper.ToEntity(pagoDto);
                entidad.CreatedAt = DateTime.Now;
                entidad.UpdatedAt = DateTime.Now;

                _pagoNegocio.Agregar(entidad);

                var resultadoDto = PagoMapper.ToDto(entidad);
                return CreatedAtAction(nameof(GetPagosPorCliente), new { clienteId = entidad.ClienteId }, resultadoDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult ModificarPago(long id, [FromBody] PagoDto pagoDto)
        {
            try
            {
                if (pagoDto == null || id != pagoDto.Id)
                    return BadRequest("Los datos enviados no coinciden.");

                // Obtener entidad existente (desde negocio)
                var lista = _pagoNegocio.Listar();
                var existente = lista.Find(p => p.Id == id);
                if (existente == null) return NotFound("Pago no encontrado.");

                // Actualizar entidad con datos del DTO
                PagoMapper.UpdateEntity(existente, pagoDto);
                existente.UpdatedAt = DateTime.Now;
                _pagoNegocio.Modificar(existente);

                var resultadoDto = PagoMapper.ToDto(existente);
                return Ok(resultadoDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

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
