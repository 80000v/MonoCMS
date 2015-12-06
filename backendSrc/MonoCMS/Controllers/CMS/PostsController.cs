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

    class PostsController
    {

        public static string basepath = "posts/";

        public static string getPost(WebServerClient webServerClient)
        {
            Console.WriteLine("1111111111111111 request handler");
            return "11111111111111111111111111111111";
        }

        public static string getPosts(WebServerClient webServerClient)
        {
            webServerClient.responseHeaders.Add("Content-Type", MIMETypes.application.json);
            return PostsService.getPosts();
        }

        public static string newPost(WebServerClient webServerClient)
        {
            Console.WriteLine("333333333333333 request handler");
            return "3333333333333333333333333333333333";
        }

        public static string editPost(WebServerClient webServerClient)
        {
            Console.WriteLine("44444444444444444 request handler");
            return "44444444444444444444444444444444444444444";
        }

        public static void init()
        {
            WebServerService.addRequestHandler("GET", basepath + "getPost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPosts", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "newPost", getPosts);
            WebServerService.addRequestHandler("POST", basepath + "editPost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "deletePost", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostType", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostTypes", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostFormats", getPosts);
            WebServerService.addRequestHandler("GET", basepath + "getPostStatusList", getPosts);
        }

    }
}
