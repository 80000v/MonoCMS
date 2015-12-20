using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using MonoCMS.Services.Core;
using MonoCMS.Controllers.CMS;
using System.Diagnostics;

namespace MonoCMS
{
    class Program
    {
        static void Main(string[] args)
        {

            Console.WriteLine("Starting MonoCMS...");
            
            // launch services
            Config.init();
            LoggerService.init();
            DBConnectionService.init();
            WebServerService.init();

            // bind controllers
            Console.WriteLine("\nBegin controllers initialization...");
            PostsController.init();
            UsersController.init();

            Console.WriteLine("\nControllers initialized successfully.!");

            Console.WriteLine("\nMonoCMS successfully started.");
            Console.WriteLine("\nPress any key for exit...");
            Console.ReadLine();

        }
    }
    
}
