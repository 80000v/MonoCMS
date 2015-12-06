using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Repositories.CMS;

namespace MonoCMS.Services.CMS
{
    class PostsService
    {

        public static string getPosts()
        {
            return PostRepository.getPosts();
        }

    }
}
