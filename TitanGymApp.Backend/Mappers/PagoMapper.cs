using System;
using System.Collections.Generic;
using System.Linq;
using TitanGymApp.Backend.Dominio;
using TitanGymApp.Backend.Dtos;

namespace TitanGymApp.Backend.Mappers
{
    public static class PagoMapper
    {
        // Entity -> DTO
        public static PagoDto ToDto(Pago p)
        {
            if (p == null) return null;

            return new PagoDto
            {
                Id = p.Id,
                ClienteId = p.ClienteId,
                Monto = p.Monto,
                MetodoPago = p.MetodoPago,
                FechaPago = p.FechaPago,
                FechaVencimiento = p.FechaVencimiento,
                Observaciones = p.Observaciones,
                RegistradoPor = p.RegistradoPor,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            };
        }

        // List<Entity> -> List<Dto>
        public static List<PagoDto> ToDtoList(IEnumerable<Pago> pagos)
        {
            if (pagos == null) return new List<PagoDto>();
            return pagos.Select(p => ToDto(p)).ToList();
        }

        // DTO -> Entity (nueva entidad)
        public static Pago ToEntity(PagoDto dto)
        {
            if (dto == null) return null;

            return new Pago
            {
                Id = dto.Id,
                ClienteId = dto.ClienteId,
                Monto = dto.Monto,
                MetodoPago = dto.MetodoPago,
                FechaPago = dto.FechaPago == default ? DateTime.Now : dto.FechaPago,
                FechaVencimiento = dto.FechaVencimiento,
                Observaciones = dto.Observaciones,
                RegistradoPor = dto.RegistradoPor,
                CreatedAt = dto.CreatedAt == default ? DateTime.Now : dto.CreatedAt,
                UpdatedAt = dto.UpdatedAt == default ? DateTime.Now : dto.UpdatedAt
            };
        }

        // List<Dto> -> List<Entity>
        public static List<Pago> ToEntityList(IEnumerable<PagoDto> dtos)
        {
            if (dtos == null) return new List<Pago>();
            return dtos.Select(d => ToEntity(d)).ToList();
        }

        // Update existing entity with dto values (no tocar propiedades calculadas)
        public static void UpdateEntity(Pago entity, PagoDto dto)
        {
            if (entity == null || dto == null) return;

            // No asignamos Estado (solo lectura)
            entity.ClienteId = dto.ClienteId;
            entity.Monto = dto.Monto;
            entity.MetodoPago = dto.MetodoPago;
            entity.FechaPago = dto.FechaPago == default ? entity.FechaPago : dto.FechaPago;
            entity.FechaVencimiento = dto.FechaVencimiento;
            entity.Observaciones = dto.Observaciones;
            entity.RegistradoPor = dto.RegistradoPor;
            entity.UpdatedAt = dto.UpdatedAt == default ? DateTime.Now : dto.UpdatedAt;
        }
    }
}
