using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using MonoCMS.Libraries.WebServer;

namespace MonoCMS.Libraries.WebServer
{
    class WebServerClient
    {

        public static Regex regex = new Regex(@"^(\S+)\s(\S+)\s(\S+)\r\n([\s\S]+)\r\n\r\n", RegexOptions.None);

        public string method;
        public string protocol;
        public string url;
        public Dictionary<string, string> requestHeaders = new Dictionary<string, string>();
        public Dictionary<string, string> responseHeaders = new Dictionary<string, string>();
        public TcpClient tcpClietn;
        public string body;
        public bool isHaveBody = false;

        private WebServer webServer;
        private byte[] buffer;

        public WebServerClient(WebServer webserver, TcpClient tcpClietn)
        {

            this.tcpClietn = tcpClietn;
            this.webServer = webserver;

            webServer.activeClients += 1;
            webServer.totalClients += 1;

        }

        public void process()
        {
            
            string request = "";
            buffer = new byte[Config.webServer.requestBufferSize];
            int count;
            int headersLength = 0;

            // read headers and content length
            while ((count = tcpClietn.GetStream().Read(buffer, 0, buffer.Length)) > 0)
            {
                request += Encoding.UTF8.GetString(buffer, 0, count);
                // if have end of headers
                headersLength = request.IndexOf("\r\n\r\n");
                if (headersLength > -1)
                {
                    break;
                }

                // if headers to long
                if (request.Length > Config.webServer.headersSizeLimit)
                {
                    sendStatusCodeAndClose(414);
                    return;
                }

                // if client to slow
                if (false)
                {
                    sendStatusCodeAndClose(408);
                    return;
                }
                // todo
            }

            // parse request            
            MatchCollection matches = regex.Matches(request);
            if (matches.Count == 1)
            {
                GroupCollection groups = matches[0].Groups;
                if (groups.Count == 5) // correct parsed headers
                {
                    isHaveBody = groups[0].Length != (headersLength + 4);
                    method = groups[1].Value;
                    url = groups[2].Value;
                    protocol = groups[3].Value;
                    requestHeaders.Add("all", groups[4].Value);
                }
                else // uncorrect parsed headers
                {
                    sendStatusCodeAndClose(431);
                    return;
                }                
            }
            else // error on parse request
            {
                sendStatusCodeAndClose(400);
                return;
            }

            Console.WriteLine($"{isHaveBody} {method} {url} {protocol}");
            
            // continue read request body if needed
            if (isHaveBody)
            {
                // todo: write code for request with headers
            } else
            {
                if (webServer.listenersList.ContainsKey(method))
                {
                    if (webServer.listenersList[method].ContainsKey(url))
                    {
                        sendResponseAndClose(webServer.listenersList[method][url](this));
                    } else
                    {
                        sendStatusCodeAndClose(404);
                        return;
                    }
                } else
                {
                    sendStatusCodeAndClose(404);
                    return;
                }
            }

            // request handler
            sendStatusCodeAndClose(500);
        }

        public void sendStatusCodeAndClose(int statusCode) {
            if (tcpClietn.Connected)
            {
                StringBuilder html = new StringBuilder(300);
                html.Append("<html><body style=\"background:linear-gradient(135deg, #ffffff 0%,#BFC7CE 100%);text-align:center\">");
                html.Append("<h1 style=\"font-size:3em;font-family:sans-serif;color:#7F8888;padding-top:20%\">");
                html.Append(Models.StatusCodeDictionary.codes[statusCode]);
                html.Append("</h1></body></html>");

                string Str = $"HTTP/1.1 {statusCode} OK\nContent-type: text/html\nContent-Length:{html.Length.ToString()}\n\n" + html;
                buffer = Encoding.UTF8.GetBytes(Str);
                tcpClietn.GetStream().Write(buffer, 0, buffer.Length);
                close();
            }
        }

        public void sendResponseAndClose(string responseText)
        {
            StringBuilder headersString = new StringBuilder(300);

            foreach (string key in responseHeaders.Keys)
            {
                headersString.Append($"{key}:{responseHeaders[key]}\n");
            }

            string Str = $"HTTP/1.1 200 OK\n{headersString}Content-Length:{responseText.Length.ToString()}\n\n" + responseText;
            buffer = Encoding.UTF8.GetBytes(Str);
            tcpClietn.GetStream().Write(buffer, 0, buffer.Length);
            close();
        }
        
        private void close()
        {
            tcpClietn.Close();
            webServer.activeClients -= 1;
        }

        ~WebServerClient()
        {
            if (tcpClietn.Connected)
            {
                tcpClietn.Close();
            }
            webServer.totalClients -= 1;

        }
    }
}
