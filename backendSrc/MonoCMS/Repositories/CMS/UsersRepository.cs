using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Services.Core;
using MonoCMS.Models.CMS;
using Npgsql;

namespace MonoCMS.Repositories.CMS
{
    class UsersRepository
    {

        private static string schemeName = Config.db.scheme;
        
        private static string getAllUsersCommand = "SELECT json_agg(r)" +
                                                     "FROM (SELECT " +
                                                                $"t.id AS {nameof(User.id)}, " +
                                                                "t.login AS login," +
                                                                "t.pass AS pass," +
                                                                "t.nicename AS nicename," +
                                                                "t.email AS email," +
                                                                "t.url AS url," +
                                                                "t.registered AS registered," +
                                                                "t.activation_key AS activation_key," +
                                                                "t.status AS status," +
                                                                "t.display_name AS viewName " +
                                                            $"FROM \"{schemeName}\".users as t" +
                                                            ") r";

        public static string getAllUsers()
        {
            
            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(getAllUsersCommand, connection);
            NpgsqlDataReader reader = command.ExecuteReader();
            
            string result;
            if (reader.HasRows)
            {
                reader.Read();
                result = reader.GetString(0);
            } else
            {
                result = "[]";
            }

            reader.Close();
            DBConnectionService.returnConnection(connection);

            return result;
        }

        private static string createUsersCommand = "SELECT json_agg(r)" +
                                                     "FROM (SELECT " +
                                                                "t.id AS id, " +
                                                                "t.login AS login," +
                                                                "t.pass AS pass," +
                                                                "t.nicename AS nicename," +
                                                                "t.email AS email," +
                                                                "t.url AS url," +
                                                                "t.registered AS registered," +
                                                                "t.activation_key AS activation_key," +
                                                                "t.status AS status," +
                                                                "t.display_name AS viewName " +
                                                            $"FROM \"{schemeName}\".users as t" +
                                                            ") r";

        public static string createUser(User user)
        {

            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(getAllUsersCommand, connection);
            NpgsqlDataReader reader = command.ExecuteReader();

            string result;
            if (reader.HasRows)
            {
                reader.Read();
                result = reader.GetString(0);
            }
            else
            {
                result = "[]";
            }

            reader.Close();
            DBConnectionService.returnConnection(connection);

            return result;
        }

    }
}
