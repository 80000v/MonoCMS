using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;

namespace MonoCMS.Libraries.WebServer.Models
{
    class DBConnection
    {

        public bool isFree = true;
        public NpgsqlConnection connection;

        public DBConnection(string connectionString)
        {
            connection = new NpgsqlConnection(connectionString);
            connection.Open();
        }

    }
}
