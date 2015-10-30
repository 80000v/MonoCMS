using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoCMS.Models.ConfigModels
{
    class WebServerConfig
    {

        public string ipAddress = "127.0.0.1";
        public ushort port = 8000;
        public uint requestBufferSize = 4096;
        public uint headersSizeLimit = 4096;

    }
}
