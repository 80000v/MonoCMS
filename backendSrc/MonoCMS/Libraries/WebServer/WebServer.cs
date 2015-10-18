using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;

namespace MonoCMS.Libraries.WebServer
{
    class WebServer
    {

        private TcpListener tcpListener;

        public WebServer(string ip, int port)
        {
            tcpListener = new TcpListener(IPAddress.Parse(ip), port);

            Console.WriteLine("Server successfully start on address {0}:{1}.", ip, port);
        }
    }
}
