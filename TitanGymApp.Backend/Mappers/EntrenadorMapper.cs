using TitanGymApp.Backend.Dominio;
using TitanGymApp.Backend.Dtos;
using System;

namespace TitanGymApp.Backend.Mappers
{
    public static class EntrenadorMapper
    {
        public static Entrenador ToModel(EntrenadorDto dto)
        {
            return new Entrenador
            {
                DNI = dto.Dni,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Direccion = dto.Direccion,
                Telefono = dto.Telefono,
                Correo = dto.Correo,
                Especialidad = dto.Especialidad,
                Experiencia_Anios = dto.ExperienciaAnios,
                Fecha_Nacimiento = dto.FechaNacimiento,
                Sueldo = dto.Sueldo,
                Hora_Inicio = TimeSpan.Parse(dto.HoraInicio),
                Hora_Fin = TimeSpan.Parse(dto.HoraFin),
                Activo = dto.Activo
            };
        }

        public static void UpdateModel(Entrenador model, EntrenadorDto dto)
        {
            model.DNI = dto.Dni;
            model.Nombre = dto.Nombre;
            model.Apellido = dto.Apellido;
            model.Direccion = dto.Direccion;
            model.Telefono = dto.Telefono;
            model.Correo = dto.Correo;
            model.Especialidad = dto.Especialidad;
            model.Experiencia_Anios = dto.ExperienciaAnios;
            model.Fecha_Nacimiento = dto.FechaNacimiento;
            model.Sueldo = dto.Sueldo;
            model.Hora_Inicio = TimeSpan.Parse(dto.HoraInicio);
            model.Hora_Fin = TimeSpan.Parse(dto.HoraFin);
            model.Activo = dto.Activo;
        }
    }
}
