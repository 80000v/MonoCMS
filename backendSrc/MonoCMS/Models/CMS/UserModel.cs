using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoCMS.Models.CMS
{
    class User
    {

        public int id = -1;
        public string login = "New User";
        public string password = "";
        public string nicename = "";
        public string email = "";
        public string url = "";
        public string registered = "";
        public string activationKey = "";
        public int status = 0;
        public string viewName = "";

        User()
        {
            
        }
        
    }

}
