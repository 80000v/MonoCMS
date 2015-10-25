using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;

namespace MonoCMS.Services.Core
{
    class DBConnectionService
    {

        private static string connectionParams = "Host=127.0.0.1;Username=postgres;Password=postgres;Database=postgres";

        private static List<NpgsqlConnection> connections = new List<NpgsqlConnection>();

        public static void init()
        {

            Console.WriteLine("\nBegin DB connection service initialization...");
            Console.WriteLine(String.Format(
                "Connect to DB with parameters: Host={0};Username={1};Password=*****;Database={2}",
                Config.db.host,
                Config.db.user,
                Config.db.database
                ));

            connectionParams = String.Format(
                "Host={0};Username={1};Password={2};Database={3}",
                Config.db.host,
                Config.db.user,
                Config.db.password,
                Config.db.database
                );

            for (int i = 0; i < 10; i += 1)
            {
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionParams))
                {
                    conn.Open();
                    connections.Add(conn);

                    Console.WriteLine("Connection {0} have status: {1}.", i, conn.State);

                }
            }
            
            Console.WriteLine("DB connection service initialized successfully.");

        }
        
    }
}
