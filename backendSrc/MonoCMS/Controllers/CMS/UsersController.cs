using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Libraries.WebServer;
using MonoCMS.Services.Core;
using MonoCMS.Services.CMS;
using Newtonsoft.Json;
using MonoCMS.Models.CMS;

namespace MonoCMS.Controllers.CMS
{
    class UsersController
    {

        public static string basepath = "users/";

        public static string getAllUsers(WebServerClient webServerClient)
        {
            return UsersService.getAllUsers();
        }

        public static string createUser(WebServerClient webServerClient)
        {

            User user = JsonConvert.DeserializeObject<User>(webServerClient.body);
            Console.WriteLine(user);
            // UsersService.createUser(user);
            webServerClient.sendStatusCodeAndClose(200);
            return "user successfully created";

        }

        public static string updateUser(WebServerClient webServerClient)
        {

            User user = JsonConvert.DeserializeObject<User>(webServerClient.body);
            Console.WriteLine(user);
            // UsersService.createUser(user);
            webServerClient.sendStatusCodeAndClose(200);
            return "user successfully updated";

        }

        public static void init()
        {
            WebServerService.addRequestHandler("GET", basepath + "all", getAllUsers);
            WebServerService.addRequestHandler("POST", basepath + "create", createUser);
            WebServerService.addRequestHandler("POST", basepath + "update", updateUser);
        }

    }
}
