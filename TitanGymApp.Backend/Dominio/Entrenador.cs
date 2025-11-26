using System;

namespace TitanGymApp.Backend.Dominio
{
    public class Entrenador
    {
        public long Id { get; set; }
        public int DNI { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string Especialidad { get; set; } = string.Empty;
        public int Experiencia_Anios { get; set; } = 0;
        public DateTime? Fecha_Nacimiento { get; set; } = null;
        public DateTime Fecha_Alta { get; set; } = DateTime.Now;
        public decimal Sueldo { get; set; } = 0.00M;

        // AHORA SIN SEGUNDOS → HH:mm
        public TimeSpan Hora_Inicio { get; set; } = TimeSpan.Parse("08:00");
        public TimeSpan Hora_Fin { get; set; } = TimeSpan.Parse("18:00");

        public bool Activo { get; set; } = true;

        // Propiedad calculada
        public string NombreCompleto => $"{Nombre} {Apellido}".Trim();

        // Ahora devuelve solo HH:mm
        public string RangoHorario => $"{Hora_Inicio:hh\\:mm} - {Hora_Fin:hh\\:mm}";

        public Entrenador() { }

        public Entrenador(int dni, string nombre, string apellido, string direccion = "", string telefono = "", string correo = "",
                          string especialidad = "", int experienciaAnios = 0, DateTime? fechaNacimiento = null,
                          decimal sueldo = 0.00M, TimeSpan? horaInicio = null, TimeSpan? horaFin = null, bool activo = true)
        {
            DNI = dni;
            Nombre = nombre;
            Apellido = apellido;
            Direccion = direccion;
            Telefono = telefono;
            Correo = correo;
            Especialidad = especialidad;
            Experiencia_Anios = experienciaAnios;
            Fecha_Nacimiento = fechaNacimiento;
            Fecha_Alta = DateTime.Now;
            Sueldo = sueldo;

            // También aquí quitamos los segundos
            Hora_Inicio = horaInicio ?? TimeSpan.Parse("08:00");
            Hora_Fin = horaFin ?? TimeSpan.Parse("18:00");

            Activo = activo;
        }

        public override string ToString()
        {
            return $"{Id} - {NombreCompleto} (DNI: {DNI}) - {Especialidad} - {RangoHorario}";
        }
    }
}
