using System;

namespace TitanGymApp.Backend.Dtos
{
    public class PagoDto
    {
        public long Id { get; set; }
        public long ClienteId { get; set; }
        public decimal Monto { get; set; }
        public string MetodoPago { get; set; } = "Efectivo";
        public DateTime FechaPago { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public string Observaciones { get; set; } = string.Empty;
        public string RegistradoPor { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Nota: no incluimos "Estado" como propiedad asignable, lo calculamos en el dominio si es necesario.
    }
}
