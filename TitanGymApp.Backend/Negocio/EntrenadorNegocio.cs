using System;
using System.Collections.Generic;
using TitanGymApp.Backend.Acceso_Datos;
using TitanGymApp.Backend.Dominio;

namespace TitanGymApp.Backend.Negocio
{
    public class EntrenadorNegocio
    {
        // 🔹 LISTAR ENTRENADORES
        public List<Entrenador> Listar()
        {
            List<Entrenador> lista = new List<Entrenador>();
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("SELECT * FROM entrenadores");
                datos.ejecutarLectura();

                while (datos.Lector.Read())
                {
                    Entrenador aux = new Entrenador
                    {
                        Id = Convert.ToInt64(datos.Lector["Id"]),
                        DNI = Convert.ToInt32(datos.Lector["DNI"]),
                        Nombre = datos.Lector["Nombre"].ToString() ?? "",
                        Apellido = datos.Lector["Apellido"].ToString() ?? "",
                        Direccion = datos.Lector["Direccion"].ToString() ?? "",
                        Telefono = datos.Lector["Telefono"].ToString() ?? "",
                        Correo = datos.Lector["Correo"].ToString() ?? "",
                        Especialidad = datos.Lector["Especialidad"].ToString() ?? "",
                        Experiencia_Anios = Convert.ToInt32(datos.Lector["Experiencia_Anios"]),
                        Fecha_Nacimiento = datos.Lector["Fecha_Nacimiento"] == DBNull.Value
                            ? null
                            : Convert.ToDateTime(datos.Lector["Fecha_Nacimiento"]),
                        Fecha_Alta = Convert.ToDateTime(datos.Lector["Fecha_Alta"]),
                        Sueldo = Convert.ToDecimal(datos.Lector["Sueldo"]),
                        Hora_Inicio = TimeSpan.Parse(datos.Lector["Hora_Inicio"].ToString()),
                        Hora_Fin = TimeSpan.Parse(datos.Lector["Hora_Fin"].ToString()),
                        Activo = Convert.ToBoolean(datos.Lector["Activo"])
                    };

                    lista.Add(aux);
                }

                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al listar entrenadores: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 🔹 AGREGAR ENTRENADOR
        public void Agregar(Entrenador nuevo)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta(@"
                    INSERT INTO entrenadores 
                    (DNI, Nombre, Apellido, Direccion, Telefono, Correo, Especialidad, Experiencia_Anios, Fecha_Nacimiento, Sueldo, Hora_Inicio, Hora_Fin, Activo)
                    VALUES
                    (@DNI, @Nombre, @Apellido, @Direccion, @Telefono, @Correo, @Especialidad, @Experiencia, @FechaNac, @Sueldo, @HoraInicio, @HoraFin, @Activo)
                ");

                datos.setearParametro("@DNI", nuevo.DNI);
                datos.setearParametro("@Nombre", nuevo.Nombre);
                datos.setearParametro("@Apellido", nuevo.Apellido);
                datos.setearParametro("@Direccion", nuevo.Direccion);
                datos.setearParametro("@Telefono", nuevo.Telefono);
                datos.setearParametro("@Correo", nuevo.Correo);
                datos.setearParametro("@Especialidad", nuevo.Especialidad);
                datos.setearParametro("@Experiencia", nuevo.Experiencia_Anios);
                datos.setearParametro("@FechaNac", nuevo.Fecha_Nacimiento);
                datos.setearParametro("@Sueldo", nuevo.Sueldo);
                datos.setearParametro("@HoraInicio", nuevo.Hora_Inicio);
                datos.setearParametro("@HoraFin", nuevo.Hora_Fin);
                datos.setearParametro("@Activo", nuevo.Activo);

                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar entrenador: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 🔹 MODIFICAR ENTRENADOR
        public void Modificar(Entrenador entrenador)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta(@"
                    UPDATE entrenadores SET 
                        DNI=@DNI, Nombre=@Nombre, Apellido=@Apellido, Direccion=@Direccion, Telefono=@Telefono, Correo=@Correo,
                        Especialidad=@Especialidad, Experiencia_Anios=@Experiencia, Fecha_Nacimiento=@FechaNac,
                        Sueldo=@Sueldo, Hora_Inicio=@HoraInicio, Hora_Fin=@HoraFin, Activo=@Activo
                    WHERE Id=@Id");

                datos.setearParametro("@DNI", entrenador.DNI);
                datos.setearParametro("@Nombre", entrenador.Nombre);
                datos.setearParametro("@Apellido", entrenador.Apellido);
                datos.setearParametro("@Direccion", entrenador.Direccion);
                datos.setearParametro("@Telefono", entrenador.Telefono);
                datos.setearParametro("@Correo", entrenador.Correo);
                datos.setearParametro("@Especialidad", entrenador.Especialidad);
                datos.setearParametro("@Experiencia", entrenador.Experiencia_Anios);
                datos.setearParametro("@FechaNac", entrenador.Fecha_Nacimiento);
                datos.setearParametro("@Sueldo", entrenador.Sueldo);
                datos.setearParametro("@HoraInicio", entrenador.Hora_Inicio);
                datos.setearParametro("@HoraFin", entrenador.Hora_Fin);
                datos.setearParametro("@Activo", entrenador.Activo);
                datos.setearParametro("@Id", entrenador.Id);

                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al modificar entrenador: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 🔹 ELIMINAR (BAJA LÓGICA)
        public void Eliminar(long id)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("UPDATE entrenadores SET Activo = false WHERE Id = @Id");
                datos.setearParametro("@Id", id);
                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar entrenador: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }

        // 🔹 REACTIVAR ENTRENADOR
        public void Activar(long id)
        {
            AccesoDatos datos = new AccesoDatos();

            try
            {
                datos.setearConsulta("UPDATE entrenadores SET Activo = true WHERE Id = @Id");
                datos.setearParametro("@Id", id);
                datos.ejecutarAccion();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al activar entrenador: " + ex.Message);
            }
            finally
            {
                datos.cerrarConexion();
            }
        }
    }
}
