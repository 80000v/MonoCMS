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

        public static string getById(int id)
        {
            return UsersRepository.getById(id);
        }

        public static void createUser(User user)
        {
            UsersRepository.createUser(user);
        }

        public static void updateUser(User user)
        {
            UsersRepository.updateUser(user);
        }

        public static void deleteUser(int id)
        {
            UsersRepository.deleteUser(id);
        }

    }
}
