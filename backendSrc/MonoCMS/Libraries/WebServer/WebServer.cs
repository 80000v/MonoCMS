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

        /**
          {
            "get":
            [
               "api/get/post": Func
            ]
          }
        */
        public Dictionary<
            string, Dictionary<
                string, Func<
                    WebServerClient, string
                    >
                >
            > listenersList = new Dictionary<
                string, Dictionary<
                    string, Func<
                        WebServerClient, string
                        >
                    >
                >();

        public uint activeClients = 0;
        public uint totalClients = 0;

        private TcpListener tcpListener;
        
        public WebServer(string ip, int port)
        {
            Models.StatusCodeDictionary.init();
            tcpListener = new TcpListener(ip == "any" ? IPAddress.Any : IPAddress.Parse(ip), port);
            Thread listenerThread = new Thread(startListening);
            listenerThread.Start();
        }


        public void addRequestHandler(string method, string path, Func<WebServerClient, string> handler)
        {
            
            // check on exists methods list
            if (!listenersList.ContainsKey(method))
            {
                listenersList.Add(method, new Dictionary<string, Func<WebServerClient, string>>());
            }

            // check on exists url handler in methods
            if (listenersList[method].ContainsKey(path))
            {
                Console.WriteLine("!!! Warning: redefinition method {0} url {1}.", method, path);
            }

            // add / redefine request handler
            Console.WriteLine($"Bind request handler on method \"{method}\" by url \"{path}\"");
            listenersList[method][path] = handler;

        }

        private void startListening()
        {

            tcpListener.Start();
            
            while (true)
            {
                TcpClient client = tcpListener.AcceptTcpClient();
                WebServerClient webClient = new WebServerClient(this, client);
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
