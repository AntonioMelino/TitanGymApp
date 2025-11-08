using MySql.Data.MySqlClient;
using System;
using System.Data;

namespace TitanGymApp.Backend.Acceso_Datos
{
    public class AccesoDatos
    {
        private MySqlConnection conexion;
        private MySqlCommand comando;
        private MySqlDataReader lector;

        public MySqlDataReader Lector
        {
            get { return lector; }
        }

        public AccesoDatos()
        {
            // ⚠️ Ajustá usuario y contraseña según tu instalación de MySQL
            string cadenaConexion = "server=localhost; database=titangymapp; user=root; password=root;";
            conexion = new MySqlConnection(cadenaConexion);
            comando = new MySqlCommand();
        }

        public void setearConsulta(string consulta)
        {
            comando.CommandType = CommandType.Text;
            comando.CommandText = consulta;
        }

        public void ejecutarLectura()
        {
            comando.Connection = conexion;
            try
            {
                conexion.Open();
                lector = comando.ExecuteReader();
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
            finally
            {
                conexion.Close();
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
    }
}
