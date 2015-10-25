using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using MonoCMS.Libraries.WebServer;

namespace MonoCMS.Libraries.WebServer
{
    class WebServerClient
    {

        public static uint activeClients = 0;
        public static uint totalClients = 0;
        
        public string method;
        public string protocol;
        public string url;
        public Dictionary<string, string> headers;
        public TcpClient tcpClietn;

        public WebServerClient(TcpClient tcpClietn)
        {

            this.tcpClietn = tcpClietn;

            WebServerClient.activeClients += 1;
            WebServerClient.totalClients += 1;

        }

        public void process(Object stateInfo)
        {

            Console.WriteLine("Actives: {0}, total: {1}", WebServerClient.activeClients, WebServerClient.totalClients);

            string Request = "";
            byte[] Buffer = new byte[1024];
            int Count;
            while ((Count = tcpClietn.GetStream().Read(Buffer, 0, Buffer.Length)) > 0)
            {
                Request += Encoding.ASCII.GetString(Buffer, 0, Count);
                if (Request.IndexOf("\r\n\r\n") >= 0 || Request.Length > 4096)
                {
                    break;
                }
            }

            string Html = "<html><body><h1>It works!</h1></body></html>";
            string Str = "HTTP/1.1 200 OK\nContent-type: text/html\nContent-Length:" + Html.Length.ToString() + "\n\n" + Html;
            Buffer = Encoding.ASCII.GetBytes(Str);
            tcpClietn.GetStream().Write(Buffer, 0, Buffer.Length);
            tcpClietn.Close();

            WebServerClient.activeClients -= 1;

        }

        ~WebServerClient()
        {

            WebServerClient.totalClients -= 1;

        }
    }
}
