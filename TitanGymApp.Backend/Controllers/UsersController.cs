using Microsoft.AspNetCore.Mvc;

namespace TitanGymApp.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = new List<object>
            {
                new { Id = 1, Name = "Antonio Melino", Role = "Admin" },
                new { Id = 2, Name = "Marcos Díaz", Role = "Trainer" },
                new { Id = 3, Name = "Lucía Pérez", Role = "User" }
            };

            return Ok(users);
        }
    }
}
