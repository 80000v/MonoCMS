using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace MonoCMS.Services.Core
{
    class LoggerService
    {

        private static string logPatch = "logs";
        private static string logErrorsFile = logPatch + "errors.log";
        private static string logWarningsFile = logPatch + "warnings.log";
        private static string logSuccesFile = logPatch + "succes.log";

        public static void init()
        {

            Console.WriteLine("\nBegin logger service initialization...");
            
            string path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            
            // get parameters from string
            logPatch = path + Path.DirectorySeparatorChar + Config.logs.logsPath;
            logErrorsFile = path + Path.DirectorySeparatorChar + Config.logs.logsPath + Path.DirectorySeparatorChar + Config.logs.errorFileName;
            logWarningsFile = path + Path.DirectorySeparatorChar + Config.logs.logsPath + Path.DirectorySeparatorChar + Config.logs.warningFileName;
            logSuccesFile = path + Path.DirectorySeparatorChar + Config.logs.logsPath + Path.DirectorySeparatorChar + Config.logs.succesFileName;

            Console.WriteLine("Errors log will by writes in file: {0}.", logErrorsFile);
            Console.WriteLine("Warnings log will by writes in file: {0}.", logErrorsFile);
            Console.WriteLine("Success log will by writes in file: {0}.", logErrorsFile);

            watchUnexpectedError();

            Console.WriteLine("Logger service initialized successfully.");
        }

        public static void writeError(string text, string stack)
        {
            // check directory on exist
            if (!Directory.Exists(logPatch))
            {
                Directory.CreateDirectory(logPatch);
            }

            // check file on exist
            if (!File.Exists(logErrorsFile)) //No File? Create
            {
                using (FileStream fileStream = File.Create(logErrorsFile))
                {
                    fileStream.Close();
                }
            }

            // write log
            using (StreamWriter streamWriter = File.AppendText(logErrorsFile))
            {
                streamWriter.WriteLine("");
                streamWriter.WriteLine(DateTime.Now);
                streamWriter.WriteLine("{0}:", text);
                streamWriter.WriteLine(stack);
                streamWriter.Close();
            }

        }

        private static void catchException(object sender, UnhandledExceptionEventArgs args)
        {
            Exception e = (Exception)args.ExceptionObject;
            Console.WriteLine("Log unexpected error: " + e.Message);
            writeError(e.Message, e.StackTrace);
        }

        private static void watchUnexpectedError()
        {
            AppDomain.CurrentDomain.UnhandledException += new UnhandledExceptionEventHandler(catchException);
        }

    }
}
