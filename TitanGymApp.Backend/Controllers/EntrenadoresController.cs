using Microsoft.AspNetCore.Mvc;
using TitanGymApp.Backend.Negocio;
using TitanGymApp.Backend.Dominio;

namespace TitanGymApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntrenadoresController : ControllerBase
    {
        private readonly EntrenadorNegocio _negocio = new EntrenadorNegocio();

        // 🔹 GET: api/entrenadores
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
                return StatusCode(500, $"Error al obtener entrenadores: {ex.Message}");
            }
        }

        // 🔹 GET: api/entrenadores/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            try
            {
                var lista = _negocio.Listar();
                var entrenador = lista.FirstOrDefault(e => e.Id == id);

                if (entrenador == null)
                    return NotFound($"No se encontró un entrenador con ID {id}");

                return Ok(entrenador);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener entrenador: {ex.Message}");
            }
        }

        // 🔹 POST: api/entrenadores
        [HttpPost]
        public IActionResult Post([FromBody] Entrenador nuevo)
        {
            try
            {
                if (nuevo == null)
                    return BadRequest("El entrenador no puede ser nulo");

                _negocio.Agregar(nuevo);
                return Ok("Entrenador agregado correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al agregar entrenador: {ex.Message}");
            }
        }

        // 🔹 PUT: api/entrenadores/{id}
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Entrenador entrenador)
        {
            try
            {
                if (entrenador == null)
                    return BadRequest("Datos del entrenador inválidos");

                entrenador.Id = id;
                _negocio.Modificar(entrenador);
                return Ok("Entrenador actualizado correctamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al modificar entrenador: {ex.Message}");
            }
        }

        // 🔹 DELETE: api/entrenadores/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                _negocio.Eliminar(id);
                return Ok("Entrenador eliminado correctamente (baja lógica)");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar entrenador: {ex.Message}");
            }
        }

        // 🔹 GET: api/entrenadores/test
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { mensaje = "API de entrenadores funcionando correctamente 💪🔥" });
        }
    }
}
