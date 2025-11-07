using Microsoft.AspNetCore.Mvc;
using TitanGymApp.Backend.Negocio;
using TitanGymApp.Backend.Dominio;

namespace TitanGymApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly ClienteNegocio _negocio = new ClienteNegocio();

        // 🔹 GET: api/clientes
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var lista = _negocio.Listar();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener clientes: {ex.Message}");
            }
        }

        // 🔹 GET: api/clientes/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            try
            {
                var lista = _negocio.Listar();
                var cliente = lista.FirstOrDefault(c => c.Id == id);

                if (cliente == null)
                    return NotFound($"No se encontró un cliente con ID {id}");

                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener cliente: {ex.Message}");
            }
        }

        // 🔹 POST: api/clientes
        [HttpPost]
        public IActionResult Post([FromBody] Cliente nuevo)
        {
            try
            {
                if (nuevo == null)
                    return BadRequest("El cliente no puede ser nulo");

                _negocio.Agregar(nuevo);
                return Ok("Cliente agregado correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al agregar cliente: {ex.Message}");
            }
        }

        // 🔹 PUT: api/clientes/{id}
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Cliente cliente)
        {
            try
            {
                if (cliente == null)
                    return BadRequest("Datos del cliente inválidos");

                cliente.Id = id;
                _negocio.Modificar(cliente);
                return Ok("Cliente actualizado correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al modificar cliente: {ex.Message}");
            }
        }

        // 🔹 DELETE: api/clientes/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                _negocio.Eliminar(id);
                return Ok("Cliente eliminado correctamente (baja lógica)");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar cliente: {ex.Message}");
            }
        }

        // 🔹 GET: api/clientes/test
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { mensaje = "API funcionando correctamente 🚀" });
        }

    }
}

