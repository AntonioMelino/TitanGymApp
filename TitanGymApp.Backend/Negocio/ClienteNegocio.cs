using System;
using System.Collections.Generic;
using TitanGymApp.Backend.Acceso_Datos;
using TitanGymApp.Backend.Dominio;

namespace TitanGymApp.Backend.Negocio
{
    public class ClienteNegocio
    {
        // 🔹 Método para listar todos los clientes
        public List<Cliente> Listar()
        {
            List<Cliente> lista = new List<Cliente>();
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT * FROM clientes");
                datos.ejecutarLectura();

                while (datos.Lector.Read())
                {
                    Cliente aux = new Cliente
                    {
                        Id = Convert.ToInt64(datos.Lector["Id"]),
                        DNI = Convert.ToInt32(datos.Lector["DNI"]),
                        Nombre = Convert.ToString(datos.Lector["Nombre"]),
                        Apellido = Convert.ToString(datos.Lector["Apellido"]),
                        Direccion = Convert.ToString(datos.Lector["Direccion"]),
                        Telefono = Convert.ToString(datos.Lector["Telefono"]),
                        Correo = Convert.ToString(datos.Lector["Correo"]),
                        Fecha_Alta = Convert.ToDateTime(datos.Lector["Fecha_Alta"]),
                        Activo = Convert.ToBoolean(datos.Lector["Activo"])
                    };
                    lista.Add(aux);
                }

                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar clientes: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        private bool ExisteDNI(int dni)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT COUNT(*) FROM clientes WHERE DNI = @dni");
                datos.setearParametro("@dni", dni);

                datos.ejecutarLectura();
                if (datos.Lector.Read())
                {
                    return Convert.ToInt32(datos.Lector[0]) > 0;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar DNI: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }


        private bool ExisteEmail(string correo)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT COUNT(*) FROM clientes WHERE Correo = @correo");
                datos.setearParametro("@correo", correo);

                datos.ejecutarLectura();
                if (datos.Lector.Read())
                {
                    return Convert.ToInt32(datos.Lector[0]) > 0;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar correo: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        private bool ExisteDNIParaOtro(long id, int dni)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT COUNT(*) FROM clientes WHERE DNI = @dni AND Id <> @id");
                datos.setearParametro("@dni", dni);
                datos.setearParametro("@id", id);

                datos.ejecutarLectura();
                if (datos.Lector.Read())
                {
                    return Convert.ToInt32(datos.Lector[0]) > 0;
                }

                return false;
            }
            finally { datos.cerrarConexion(); }
        }

        private bool ExisteEmailParaOtro(long id, string correo)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT COUNT(*) FROM clientes WHERE Correo = @correo AND Id <> @id");
                datos.setearParametro("@correo", correo);
                datos.setearParametro("@id", id);

                datos.ejecutarLectura();
                if (datos.Lector.Read())
                {
                    return Convert.ToInt32(datos.Lector[0]) > 0;
                }

                return false;
            }
            finally { datos.cerrarConexion(); }
        }

        // 🔹 Método para agregar un nuevo cliente
        public void Agregar(Cliente nuevo)
        {

            // VALIDACIONES
            if (nuevo.DNI <= 0)
                throw new Exception("El DNI es obligatorio y debe ser válido");

            if (string.IsNullOrWhiteSpace(nuevo.Nombre))
                throw new Exception("El nombre es obligatorio");

            if (string.IsNullOrWhiteSpace(nuevo.Apellido))
                throw new Exception("El apellido es obligatorio");

            if (string.IsNullOrWhiteSpace(nuevo.Correo))
                throw new Exception("El correo es obligatorio");

            if (ExisteDNI(nuevo.DNI))
                throw new Exception("Ya existe un cliente con ese DNI");

            if (ExisteEmail(nuevo.Correo))
                throw new Exception("Ese correo ya está registrado");

            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("INSERT INTO clientes (DNI, Nombre, Apellido, Direccion, Telefono, Correo, Fecha_Alta, Activo) " +
                                     "VALUES (@DNI, @Nombre, @Apellido, @Direccion, @Telefono, @Correo, @Fecha_Alta, @Activo)");
                datos.setearParametro("@DNI", nuevo.DNI);
                datos.setearParametro("@Nombre", nuevo.Nombre);
                datos.setearParametro("@Apellido", nuevo.Apellido);
                datos.setearParametro("@Direccion", nuevo.Direccion);
                datos.setearParametro("@Telefono", nuevo.Telefono);
                datos.setearParametro("@Correo", nuevo.Correo);
                datos.setearParametro("@Fecha_Alta", nuevo.Fecha_Alta);
                datos.setearParametro("@Activo", nuevo.Activo);

                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar cliente: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 🔹 Método para eliminar (baja lógica)
        public void Eliminar(long id)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("UPDATE clientes SET Activo = false WHERE Id = @Id");
                datos.setearParametro("@Id", id);
                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar cliente: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 🔹 Método para modificar un cliente existente
        public void Modificar(Cliente cliente)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                // ---------- VALIDACIONES -----------

                if (cliente == null)
                    throw new Exception("Los datos del cliente son inválidos");

                if (cliente.DNI <= 0)
                    throw new Exception("El DNI es obligatorio y debe ser válido");

                if (string.IsNullOrWhiteSpace(cliente.Nombre))
                    throw new Exception("El nombre es obligatorio");

                if (string.IsNullOrWhiteSpace(cliente.Apellido))
                    throw new Exception("El apellido es obligatorio");

                if (!string.IsNullOrWhiteSpace(cliente.Correo) && ExisteEmailParaOtro(cliente.Id, cliente.Correo))
                    throw new Exception("El correo ya está registrado por otro cliente");

                if (ExisteDNIParaOtro(cliente.Id, cliente.DNI))
                    throw new Exception("Ya existe otro cliente con ese DNI");


                // ---------- UPDATE EN BD -----------

                datos.setearConsulta(
                    "UPDATE clientes SET DNI=@DNI, Nombre=@Nombre, Apellido=@Apellido, Direccion=@Direccion, " +
                    "Telefono=@Telefono, Correo=@Correo, Activo=@Activo WHERE Id=@Id"
                );

                datos.setearParametro("@DNI", cliente.DNI);
                datos.setearParametro("@Nombre", cliente.Nombre);
                datos.setearParametro("@Apellido", cliente.Apellido);
                datos.setearParametro("@Direccion", cliente.Direccion);
                datos.setearParametro("@Telefono", cliente.Telefono);
                datos.setearParametro("@Correo", cliente.Correo);
                datos.setearParametro("@Activo", cliente.Activo);
                datos.setearParametro("@Id", cliente.Id);

                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al modificar cliente: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

    }
}

