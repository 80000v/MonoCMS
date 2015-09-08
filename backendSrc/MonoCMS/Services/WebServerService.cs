using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Libraries.WebServer;

namespace MonoCMS.Services
{
    class WebServerService
    {
        private static WebServer webServer;

        public static void init()
        {
            webServer = new WebServer();
        }
    }
}
