using System;

namespace TitanGymApp.Backend.Dominio
{
    public class Pago
    {
        public long Id { get; set; }
        public long ClienteId { get; set; }
        public decimal Monto { get; set; }
        public string MetodoPago { get; set; } = "Efectivo";
        public DateTime FechaPago { get; set; } = DateTime.Now;
        public DateTime FechaVencimiento { get; set; }
        public string Observaciones { get; set; } = string.Empty;
        public string RegistradoPor { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // 🔹 Relación (opcional si usás EF o DTOs)
        public Cliente? Cliente { get; set; }

        // 🔹 Propiedad calculada: estado del pago
        public string Estado =>
            DateTime.Now > FechaVencimiento
                ? "Vencido"
                : (FechaVencimiento - DateTime.Now).TotalDays <= 5
                    ? "Próximo a vencer"
                    : "Activo";

        // 🔹 Constructor vacío
        public Pago() { }

        // 🔹 Constructor simplificado (pagos rápidos)
        public Pago(long clienteId, decimal monto, DateTime fechaVencimiento, string metodoPago = "Efectivo")
        {
            ClienteId = clienteId;
            Monto = monto;
            MetodoPago = metodoPago;
            FechaPago = DateTime.Now;
            FechaVencimiento = fechaVencimiento;
        }

        // 🔹 Para debug/logs
        public override string ToString()
        {
            return $"Pago #{Id} - Cliente {ClienteId} - ${Monto} - Estado: {Estado}";
        }
    }
}
