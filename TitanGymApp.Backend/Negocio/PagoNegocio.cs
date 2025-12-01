using System;
using System.Collections.Generic;
using TitanGymApp.Backend.Acceso_Datos;
using TitanGymApp.Backend.Dominio;

namespace TitanGymApp.Backend.Negocio
{
    public class PagoNegocio
    {
        // ==============================
        // 🔍 VALIDACIONES
        // ==============================

        private bool ClienteExiste(long clienteId)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT COUNT(*) FROM clientes WHERE Id = @id AND Activo = 1");
                datos.setearParametro("@id", clienteId);

                datos.ejecutarLectura();
                if (datos.Lector.Read())
                    return Convert.ToInt32(datos.Lector[0]) > 0;

                return false;
            }
            finally { datos.cerrarConexion(); }
        }

        private bool PagoDuplicado(long clienteId, DateTime fechaVencimiento)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta(@"SELECT COUNT(*) FROM pagos 
                                       WHERE ClienteId = @clienteId AND FechaVencimiento = @fecha");

                datos.setearParametro("@clienteId", clienteId);
                datos.setearParametro("@fecha", fechaVencimiento);

                datos.ejecutarLectura();
                if (datos.Lector.Read())
                    return Convert.ToInt32(datos.Lector[0]) > 0;

                return false;
            }
            finally { datos.cerrarConexion(); }
        }

        // ==============================
        // 📌 LISTAR PAGOS
        // ==============================

        public List<Pago> Listar()
        {
            List<Pago> lista = new List<Pago>();
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT * FROM pagos");
                datos.ejecutarLectura();

                while (datos.Lector.Read())
                {
                    Pago aux = new Pago
                    {
                        Id = Convert.ToInt64(datos.Lector["Id"]),
                        ClienteId = Convert.ToInt64(datos.Lector["ClienteId"]),
                        Monto = Convert.ToDecimal(datos.Lector["Monto"]),
                        MetodoPago = Convert.ToString(datos.Lector["MetodoPago"]),
                        FechaPago = Convert.ToDateTime(datos.Lector["FechaPago"]),
                        FechaVencimiento = Convert.ToDateTime(datos.Lector["FechaVencimiento"]),
                        Observaciones = Convert.ToString(datos.Lector["Observaciones"]),
                        RegistradoPor = Convert.ToString(datos.Lector["RegistradoPor"]),
                        CreatedAt = Convert.ToDateTime(datos.Lector["CreatedAt"]),
                        UpdatedAt = Convert.ToDateTime(datos.Lector["UpdatedAt"])
                    };

                    lista.Add(aux);
                }

                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar pagos: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 📌 Listar por Cliente
        public List<Pago> ListarPorCliente(long clienteId)
        {
            if (!ClienteExiste(clienteId))
                throw new Exception("El cliente no existe o está inactivo.");

            List<Pago> lista = new List<Pago>();
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT * FROM pagos WHERE ClienteId = @id ORDER BY FechaVencimiento DESC");
                datos.setearParametro("@id", clienteId);
                datos.ejecutarLectura();

                while (datos.Lector.Read())
                {
                    lista.Add(new Pago
                    {
                        Id = Convert.ToInt64(datos.Lector["Id"]),
                        ClienteId = Convert.ToInt64(datos.Lector["ClienteId"]),
                        Monto = Convert.ToDecimal(datos.Lector["Monto"]),
                        MetodoPago = Convert.ToString(datos.Lector["MetodoPago"]),
                        FechaPago = Convert.ToDateTime(datos.Lector["FechaPago"]),
                        FechaVencimiento = Convert.ToDateTime(datos.Lector["FechaVencimiento"]),
                        Observaciones = Convert.ToString(datos.Lector["Observaciones"]),
                        RegistradoPor = Convert.ToString(datos.Lector["RegistradoPor"])
                    });
                }

                return lista;
            }
            finally { datos.cerrarConexion(); }
        }

        // ==============================
        // ➕ AGREGAR PAGO
        // ==============================

        public void Agregar(Pago nuevo)
        {
            if (!ClienteExiste(nuevo.ClienteId))
                throw new Exception("No se puede registrar el pago porque el cliente no existe o está inactivo.");

            if (nuevo.Monto <= 0)
                throw new Exception("El monto debe ser mayor a 0.");

            if (PagoDuplicado(nuevo.ClienteId, nuevo.FechaVencimiento))
                throw new Exception("Ya existe un pago registrado para ese mes/periodo.");

            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta(@"
                    INSERT INTO pagos 
                    (ClienteId, Monto, MetodoPago, FechaPago, FechaVencimiento, Observaciones, RegistradoPor, CreatedAt, UpdatedAt)
                    VALUES
                    (@ClienteId, @Monto, @MetodoPago, @FechaPago, @FechaVencimiento, @Obs, @User, @Created, @Updated)");

                datos.setearParametro("@ClienteId", nuevo.ClienteId);
                datos.setearParametro("@Monto", nuevo.Monto);
                datos.setearParametro("@MetodoPago", nuevo.MetodoPago);
                datos.setearParametro("@FechaPago", nuevo.FechaPago);
                datos.setearParametro("@FechaVencimiento", nuevo.FechaVencimiento);
                datos.setearParametro("@Obs", nuevo.Observaciones);
                datos.setearParametro("@User", nuevo.RegistradoPor);
                datos.setearParametro("@Created", nuevo.CreatedAt);
                datos.setearParametro("@Updated", nuevo.UpdatedAt);

                datos.ejecutarAccion();
            }
            finally { datos.cerrarConexion(); }
        }

        // ==============================
        // 🔄 MODIFICAR
        // ==============================

        public void Modificar(Pago pago)
        {
            if (pago == null)
                throw new Exception("Los datos son inválidos.");

            if (pago.Monto <= 0)
                throw new Exception("El monto debe ser mayor a 0.");

            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta(@"
                    UPDATE pagos SET 
                    Monto=@Monto, MetodoPago=@Metodo, FechaPago=@FechaPago,
                    FechaVencimiento=@Venc, Observaciones=@Obs, UpdatedAt=@Now
                    WHERE Id=@Id");

                datos.setearParametro("@Monto", pago.Monto);
                datos.setearParametro("@Metodo", pago.MetodoPago);
                datos.setearParametro("@FechaPago", pago.FechaPago);
                datos.setearParametro("@Venc", pago.FechaVencimiento);
                datos.setearParametro("@Obs", pago.Observaciones);
                datos.setearParametro("@Now", DateTime.Now);
                datos.setearParametro("@Id", pago.Id);

                datos.ejecutarAccion();
            }
            finally { datos.cerrarConexion(); }
        }

        // ==============================
        // ❌ BAJA - ELIMINACIÓN LÓGICA (OPCIONAL)
        // ==============================

        public void Eliminar(long id)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("DELETE FROM pagos WHERE Id = @Id");
                datos.setearParametro("@Id", id);
                datos.ejecutarAccion();
            }
            finally { datos.cerrarConexion(); }
        }
    }
}
