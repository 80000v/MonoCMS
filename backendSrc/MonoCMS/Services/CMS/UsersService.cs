using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Repositories.CMS;

namespace MonoCMS.Services.CMS
{
    class UsersService
    {

        public static string getAllUsers()
        {
            return UsersRepository.getAllUsers();
        }

    }
}
