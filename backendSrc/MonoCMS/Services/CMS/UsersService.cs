using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Repositories.CMS;
using MonoCMS.Models.CMS;

namespace MonoCMS.Services.CMS
{
    class UsersService
    {

        public static string getAllUsers()
        {
            return UsersRepository.getAllUsers();
        }

        public static string createUser(User user)
        {
            return UsersRepository.createUser(user);
        }

    }
}
