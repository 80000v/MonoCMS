using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoCMS.Models.ConfigModels
{
    
    class MinMax
    {
        public int min = 2;
        public int max = 4;
    }

    class DBConfig
    {

        public string host = "127.0.0.1";
        public ushort port = 5632;

        public string user = "postgres";
        public string password = "postgres";

        public string database = "postgres";
        public string scheme = "MonoCMS";

        public MinMax connectionReservation = new MinMax();

    }
}
