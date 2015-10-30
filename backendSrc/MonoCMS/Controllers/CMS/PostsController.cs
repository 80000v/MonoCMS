using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Services.Core;
using MonoCMS.Libraries.WebServer;

namespace MonoCMS.Controllers.CMS
{

    class PostsController
    {

        public static string basepath = "posts/";

        public static string getPosts(WebServerClient webServerClient)
        {
            Console.WriteLine("1111111111111111 request handler");
            return "11111111111111111111111111111111";
        }

        public static void init()
        {
            WebServerService.addRequestHandler("GET", basepath + "getPost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPosts", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "newPost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "editPost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "deletePost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostType", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostTypes", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostFormats", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostStatusList", getPosts);
        }

    }
}
