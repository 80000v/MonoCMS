using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Libraries.WebServer;
using MonoCMS.Services.Core;
using MonoCMS.Services.CMS;

namespace MonoCMS.Controllers.CMS
{
    class UsersController
    {

        public static string basepath = "users/";

        public static string getAllUsers(WebServerClient webServerClient)
        {
            return UsersService.getAllUsers();
        }
        
        public static void init()
        {
            WebServerService.addRequestHandler("GET", basepath + "all", getAllUsers);
        }

    }
}
