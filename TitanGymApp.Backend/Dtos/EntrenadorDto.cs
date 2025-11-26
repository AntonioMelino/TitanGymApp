using System;

namespace TitanGymApp.Backend.Dtos
{
    public class EntrenadorDto
    {
        public int Dni { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string Especialidad { get; set; } = string.Empty;
        public int ExperienciaAnios { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public decimal Sueldo { get; set; }
        public string HoraInicio { get; set; } = "08:00";
        public string HoraFin { get; set; } = "18:00";
        public bool Activo { get; set; } = true;
    }
}
