using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Net;
using System.Net.Sockets;
using System.Diagnostics;

namespace MonoCMS.Libraries.WebServer
{
    class WebServer
    {

        private TcpListener tcpListener;
        
        public WebServer(string ip, int port)
        {
            tcpListener = new TcpListener(IPAddress.Parse(ip), port);
            Thread listenerThread = new Thread(startListening);
            listenerThread.Start();
        }

        private void startListening()
        {

            tcpListener.Start();
            
            while (true)
            {
                TcpClient client = tcpListener.AcceptTcpClient();
                WebServerClient webClient = new WebServerClient(client);
                Thread Thread = new Thread(webClient.process);
                Thread.Start();
            }

        }

        ~WebServer()
        {

            if (tcpListener != null)
            {
                tcpListener.Stop();
            }
        }

    }
}
