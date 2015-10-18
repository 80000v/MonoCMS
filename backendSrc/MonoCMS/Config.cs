using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using MonoCMS.Models.ConfigModels;
using MonoCMS.Services.Core;

namespace MonoCMS
{
    class Config
    {

        public static DBConfig db;
        public static LogsConfig logs;
        public static WebServerConfig webServer;

        public static void init()
        {

            string path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);

            try
            {

                Console.WriteLine("\nBegin config initialization...");

                // Open the text file using a stream reader.
                using (StreamReader sr = new StreamReader(path + Path.DirectorySeparatorChar + "config.json"))
                {
                    // Read the stream to a string, and write the string to the console.
                    String line = sr.ReadToEnd();
                    CommonConfig commonConfig = JsonConvert.DeserializeObject<CommonConfig>(line);

                    db = commonConfig.dbConfig;
                    logs = commonConfig.logsConfig;
                    webServer = commonConfig.webServer;

                    Console.WriteLine("Config initialized successfully.");
                }
            }
            catch (Exception e)
            {

                Console.WriteLine("\nError on read \"config.json\", program can not by start:");
                Console.WriteLine(e.Message);

                LoggerService.writeError(e.Message, e.StackTrace);

                // Console app
                System.Environment.Exit(1);
            }

        }

    }
}
