using Microsoft.AspNetCore.Mvc;
using TitanGymApp.Backend.Negocio;
using TitanGymApp.Backend.Dominio;
using TitanGymApp.Backend.Dtos;
using TitanGymApp.Backend.Mappers;

namespace TitanGymApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntrenadoresController : ControllerBase
    {
        private readonly EntrenadorNegocio _negocio = new EntrenadorNegocio();

        [HttpGet]
        public IActionResult Get()
        {
            var lista = _negocio.Listar();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            var entrenador = _negocio.Listar().FirstOrDefault(e => e.Id == id);

            if (entrenador == null)
                return NotFound($"Entrenador con ID {id} no encontrado");

            return Ok(entrenador);
        }

        [HttpPost]
        public IActionResult Post([FromBody] EntrenadorDto dto)
        {
            if (dto == null)
                return BadRequest("Datos inválidos");

            var entrenador = EntrenadorMapper.ToModel(dto);
            _negocio.Agregar(entrenador);

            return CreatedAtAction(nameof(GetById), new { id = entrenador.Id }, entrenador);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] EntrenadorDto dto)
        {
            var entrenadorExistente = _negocio.Listar().FirstOrDefault(e => e.Id == id);

            if (entrenadorExistente == null)
                return NotFound($"No existe entrenador con ID {id}");

            EntrenadorMapper.UpdateModel(entrenadorExistente, dto);
            _negocio.Modificar(entrenadorExistente);

            return Ok(entrenadorExistente);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _negocio.Eliminar(id);
            return Ok("Entrenador eliminado correctamente");
        }
    }
}
