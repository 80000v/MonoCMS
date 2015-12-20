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
                                                                $"t.login AS {nameof(User.login)}," +
                                                                $"t.pass AS {nameof(User.password)}," +
                                                                $"t.nicename AS {nameof(User.nicename)}," +
                                                                $"t.email AS {nameof(User.email)}," +
                                                                $"t.url AS {nameof(User.url)}," +
                                                                $"t.registered AS {nameof(User.registered)}," +
                                                                $"t.activation_key AS {nameof(User.activationKey)}," +
                                                                $"t.status AS {nameof(User.status)}," +
                                                                $"t.display_name AS {nameof(User.viewName)} " +
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
            }
            else
            {
                result = "[]";
            }

            reader.Close();
            DBConnectionService.returnConnection(connection);

            return result;
        }

        private static string getByIdCommand = "SELECT to_json(r)" +
                                                     "FROM (SELECT " +
                                                                $"t.id AS {nameof(User.id)}, " +
                                                                $"t.login AS {nameof(User.login)}," +
                                                                $"t.pass AS {nameof(User.password)}," +
                                                                $"t.nicename AS {nameof(User.nicename)}," +
                                                                $"t.email AS {nameof(User.email)}," +
                                                                $"t.url AS {nameof(User.url)}," +
                                                                $"t.registered AS {nameof(User.registered)}," +
                                                                $"t.activation_key AS {nameof(User.activationKey)}," +
                                                                $"t.status AS {nameof(User.status)}," +
                                                                $"t.display_name AS {nameof(User.viewName)} " +
                                                            $"FROM \"{schemeName}\".users as t " +
                                                            "WHERE id = @id" +
                                                            ") r";

        public static string getById(int id)
        {

            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(getByIdCommand, connection);

            command.Parameters.AddWithValue("@id", NpgsqlTypes.NpgsqlDbType.Integer, id);

            NpgsqlDataReader reader = command.ExecuteReader();

            string result;
            if (reader.HasRows)
            {
                reader.Read();
                result = reader.GetString(0);
            }
            else
            {
                result = null;
            }

            reader.Close();
            DBConnectionService.returnConnection(connection);

            return result;
        }

        private static string createUsersCommand = $"INSERT INTO \"{schemeName}\".users" +
            "(login, pass, nicename, email, url, registered, activation_key, status, display_name) " +
            "VALUES(@login, @pass, @nicename, @email, @url, @registered, @activation_key, @status, @display_name);";

        public static void createUser(User user)
        {

            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(createUsersCommand, connection);

            // cmd.Parameters.Add(new NpgsqlParameter("pw", tb2.Text));
            command.Parameters.AddWithValue("@login", NpgsqlTypes.NpgsqlDbType.Text, user.login);
            command.Parameters.AddWithValue("@pass", NpgsqlTypes.NpgsqlDbType.Text, user.password);
            command.Parameters.AddWithValue("@nicename", NpgsqlTypes.NpgsqlDbType.Text, user.nicename);
            command.Parameters.AddWithValue("@email", NpgsqlTypes.NpgsqlDbType.Text, user.email);
            command.Parameters.AddWithValue("@url", NpgsqlTypes.NpgsqlDbType.Text, user.url);
            command.Parameters.AddWithValue("@registered", NpgsqlTypes.NpgsqlDbType.TimestampTZ, user.registered);
            command.Parameters.AddWithValue("@activation_key", NpgsqlTypes.NpgsqlDbType.Text, user.activationKey);
            command.Parameters.AddWithValue("@status", NpgsqlTypes.NpgsqlDbType.Integer, user.status);
            command.Parameters.AddWithValue("@display_name", NpgsqlTypes.NpgsqlDbType.Text, user.viewName);
            int result = command.ExecuteNonQuery();
            
            DBConnectionService.returnConnection(connection);
        }

        private static string updateUsersCommand = $"UPDATE \"{schemeName}\".users " +
            "SET login = @login, pass = @pass, nicename = @nicename, email = @email, url = @url, registered = @registered, activation_key = @activation_key, " +
                "status = @status, display_name = @display_name " +
            "WHERE id = @id;";

        public static void updateUser(User user)
        {

            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(updateUsersCommand, connection);

            // cmd.Parameters.Add(new NpgsqlParameter("pw", tb2.Text));
            command.Parameters.AddWithValue("@id", NpgsqlTypes.NpgsqlDbType.Integer, user.id);
            command.Parameters.AddWithValue("@login", NpgsqlTypes.NpgsqlDbType.Text, user.login);
            command.Parameters.AddWithValue("@pass", NpgsqlTypes.NpgsqlDbType.Text, user.password);
            command.Parameters.AddWithValue("@nicename", NpgsqlTypes.NpgsqlDbType.Text, user.nicename);
            command.Parameters.AddWithValue("@email", NpgsqlTypes.NpgsqlDbType.Text, user.email);
            command.Parameters.AddWithValue("@url", NpgsqlTypes.NpgsqlDbType.Text, user.url);
            command.Parameters.AddWithValue("@registered", NpgsqlTypes.NpgsqlDbType.TimestampTZ, user.registered);
            command.Parameters.AddWithValue("@activation_key", NpgsqlTypes.NpgsqlDbType.Text, user.activationKey);
            command.Parameters.AddWithValue("@status", NpgsqlTypes.NpgsqlDbType.Integer, user.status);
            command.Parameters.AddWithValue("@display_name", NpgsqlTypes.NpgsqlDbType.Text, user.viewName);
            int result = command.ExecuteNonQuery();

            if (result != 1)
            {
                throw new Exception("Error on user update");
            }

            DBConnectionService.returnConnection(connection);
        }

        private static string deleteUserCommand = $"DELETE FROM \"{schemeName}\".users " +
                                                         "WHERE id = @id;";

        public static void deleteUser(int id)
        {

            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(deleteUserCommand, connection);

            // cmd.Parameters.Add(new NpgsqlParameter("pw", tb2.Text));
            command.Parameters.AddWithValue("@id", NpgsqlTypes.NpgsqlDbType.Integer, id);

            int result = command.ExecuteNonQuery();
            
            if (result != 1)
            {
                throw new Exception("Error on user update");
            }

            DBConnectionService.returnConnection(connection);
        }

    }
}
