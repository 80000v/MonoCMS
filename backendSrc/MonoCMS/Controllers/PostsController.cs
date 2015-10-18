using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Services.Core;

namespace MonoCMS.Controllers
{
    class PostsController
    {

        public static string basepath = "posts/";

        public static int getPosts()
        {
            return 1;
        }

        public static void init()
        {
            WebServerService.addRequestHandler("GET", basepath + "posts", getPosts);
        }

    }
}
