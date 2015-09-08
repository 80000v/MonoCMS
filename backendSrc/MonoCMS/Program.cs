using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Services;

namespace MonoCMS
{
    class Program
    {
        static void Main(string[] args)
        {

            // launch services
            WebServerService.init();
            LoggerService.init();

            // bind controllers


        }
    }
}
