using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoCMS.Models.ConfigModels
{
    class LogsConfig
    {

        public string logsPath = "logs/";

        public string errorFileName = "errors.log";
        public string warningFileName = "warnings.log";
        public string succesFileName = "succes.log";


    }
}
