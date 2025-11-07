using System;
using System.Data;
using MySql.Data.MySqlClient;

namespace TitanGymApp.Backend.Acceso_Datos
{
    public class AccesoDatos
    {
        private MySqlConnection conexion;
        private MySqlCommand comando;
        private MySqlDataReader lector;

        public MySqlDataReader Lector => lector;

        public AccesoDatos()
        {
            // Ajustá user/password/host según tu MySQL local
            conexion = new MySqlConnection("server=localhost; database=titangym; user=root; password=;");
            comando = new MySqlCommand();
        }

        public void setearConsulta(string consulta)
        {
            comando.CommandType = CommandType.Text;
            comando.CommandText = consulta;
        }

        public void setearProcedimiento(string sp)
        {
            comando.CommandType = CommandType.StoredProcedure;
            comando.CommandText = sp;
        }

        public void ejecutarLectura()
        {
            comando.Connection = conexion;
            try
            {
                conexion.Open();
                lector = (MySqlDataReader)comando.ExecuteReader();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ejecutarAccion()
        {
            comando.Connection = conexion;
            try
            {
                conexion.Open();
                comando.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void setearParametro(string nombre, object valor)
        {
            comando.Parameters.AddWithValue(nombre, valor);
        }

        public void cerrarConexion()
        {
            if (lector != null)
                lector.Close();
            conexion.Close();
        }

        public object ejecutarEscalar()
        {
            comando.Connection = conexion;
            try
            {
                conexion.Open();
                return comando.ExecuteScalar();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conexion.Close();
            }
        }
    }
}
