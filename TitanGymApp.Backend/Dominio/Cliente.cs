using System;

namespace TitanGymApp.Backend.Dominio
{
    public class Cliente
    {
        public long Id { get; set; }
        public int DNI { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public DateTime Fecha_Alta { get; set; } = DateTime.Now;
        public bool Activo { get; set; } = true;

        // 🔹 Propiedad de solo lectura: nombre completo
        public string NombreCompleto => $"{Nombre} {Apellido}".Trim();

        // 🔹 Constructor vacío
        public Cliente() { }

        // 🔹 Constructor con parámetros
        public Cliente(int dni, string nombre, string apellido, string direccion, string telefono, string correo)
        {
            DNI = dni;
            Nombre = nombre;
            Apellido = apellido;
            Direccion = direccion;
            Telefono = telefono;
            Correo = correo;
            Fecha_Alta = DateTime.Now;
            Activo = true;
        }

        // 🔹 Método auxiliar (útil para debug o logs)
        public override string ToString()
        {
            return $"{Id} - {NombreCompleto} ({DNI}) - {Correo}";
        }
    }
}
