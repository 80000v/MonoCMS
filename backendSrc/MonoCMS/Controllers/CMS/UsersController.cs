using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Collections.Specialized;
using MonoCMS.Libraries.WebServer;
using MonoCMS.Services.Core;
using MonoCMS.Services.CMS;
using MonoCMS.Models.CMS;
using Newtonsoft.Json;

namespace MonoCMS.Controllers.CMS
{
    class UsersController
    {

        public static string basepath = "users/";

        public static string getAllUsers(WebServerClient webServerClient)
        {
            return UsersService.getAllUsers();
        }

        public static string getById(WebServerClient webServerClient)
        {
            NameValueCollection queryString = HttpUtility.ParseQueryString(webServerClient.queryParams);
            string idString = queryString.Get("id");
            if (idString != null)
            {
                int id;
                int.TryParse(idString, out id);
                return UsersService.getById(id);
            }
            else
            {
                throw new Exception("Wrong query parameters.");
            }            
        }

        public static string createUser(WebServerClient webServerClient)
        {

            User user = JsonConvert.DeserializeObject<User>(webServerClient.body);
            UsersService.createUser(user);
            return null;

        }

        public static string updateUser(WebServerClient webServerClient)
        {

            User user = JsonConvert.DeserializeObject<User>(webServerClient.body);
            UsersService.updateUser(user);
            return null;

        }

        public static string deleteUser(WebServerClient webServerClient)
        {
            
            NameValueCollection queryString = HttpUtility.ParseQueryString(webServerClient.queryParams);
            string idString = queryString.Get("id");
            if (idString != null)
            {
                int id;
                int.TryParse(idString, out id);
                UsersService.deleteUser(id);
            } else
            {
                throw new Exception("Wrong query parameters.");
            }
            
            return null;
        }

        public static string deleteUsers(WebServerClient webServerClient)
        {
            int id;
            int.TryParse(webServerClient.body, out id);
            UsersService.deleteUser(id);
            return null;
        }

        public static void init()
        {
            WebServerService.addRequestHandler("GET", basepath + "all", getAllUsers);
            WebServerService.addRequestHandler("GET", basepath + "get", getById);
            WebServerService.addRequestHandler("POST", basepath + "create", createUser);
            WebServerService.addRequestHandler("POST", basepath + "update", updateUser);
            WebServerService.addRequestHandler("GET", basepath + "delete", deleteUser);
            WebServerService.addRequestHandler("POST", basepath + "delete", deleteUsers);
        }

    }
}
