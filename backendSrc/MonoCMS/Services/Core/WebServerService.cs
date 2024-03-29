﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Libraries.WebServer;

namespace MonoCMS.Services.Core
{
    class WebServerService
    {

        private static WebServer webServer;

        public static void init()
        {

            Console.WriteLine("\nBegin web server service initialization...");
            Console.WriteLine("Launch web server on address {0}:{1}...", Config.webServer.ipAddress, Config.webServer.port);

            webServer = new WebServer(Config.webServer.ipAddress, Config.webServer.port);

            Console.WriteLine("Web server service initialized successfully.");
        }

        public static void addRequestHandler(string method, string path, Func<WebServerClient, string> handler)
        {
            webServer.addRequestHandler(method, "/api/" + path, handler);
        }

    }
}
