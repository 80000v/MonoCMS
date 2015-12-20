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

        public static Regex regexRequest = new Regex(@"^(\S+)\s(\S+)\s(\S+)\r\n([\s\S]+)\r\n\r\n", RegexOptions.None);
        public static Regex regexHeaders = new Regex(@"^([\s\S]+?):([\s\S]+?)\n?$", RegexOptions.Multiline);

        public string method;
        public string protocol;
        public string url;
        public string queryParams = "";
        public Dictionary<string, string> requestHeaders = new Dictionary<string, string>();
        public Dictionary<string, string> responseHeaders = new Dictionary<string, string>();
        public TcpClient tcpClietn;
        public string body;
        public bool isHaveBody = false;

        private WebServer webServer;
        private byte[] buffer;
        private string encoding;
        private int contentLength;

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

            /**
            *
            * Part 1: read headers and content length
            *
            */
            NetworkStream clientStream = tcpClietn.GetStream();

            while ((count = clientStream.Read(buffer, 0, buffer.Length)) > 0)
            {
                request += Encoding.UTF8.GetString(buffer, 0, count);
                // if have end of headers
                headersLength = request.IndexOf("\r\n\r\n");
                if (headersLength > -1)
                {
                    headersLength += 4;
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

            /**
            *
            * Part 2: parse headers
            *
            */
            MatchCollection matchesRequest = regexRequest.Matches(request);
            if (matchesRequest.Count == 1)
            {

                GroupCollection groupsRequest = matchesRequest[0].Groups;
                if (groupsRequest.Count == 5) // correct parsed headers
                {

                    method = groupsRequest[1].Value;
                    int queryBeginPosition = groupsRequest[2].Value.IndexOf("?");
                    if (queryBeginPosition == -1)
                    {
                        url = groupsRequest[2].Value;
                    }
                    else
                    {
                        url = groupsRequest[2].Value.Substring(0, queryBeginPosition);
                        queryParams = groupsRequest[2].Value.Substring(queryBeginPosition);
                    }
                    protocol = groupsRequest[3].Value;

                    MatchCollection matchesHeaders = regexHeaders.Matches(groupsRequest[4].Value);
                    if (matchesHeaders.Count > -1)
                    {
                        for (ushort i = 0; i < matchesHeaders.Count; i += 1)
                        {

                            requestHeaders.Add(matchesHeaders[i].Groups[1].Value, matchesHeaders[i].Groups[2].Value);

                            if (matchesHeaders[i].Groups[1].Value == "Content-Length")
                            {
                                bool succes = int.TryParse(matchesHeaders[i].Groups[2].Value, out contentLength);

                                if (!succes)
                                {
                                    sendStatusCodeAndClose(400);
                                    return;
                                }

                                isHaveBody = true;

                            }

                        }

                    }
                    else
                    {
                        sendStatusCodeAndClose(431);
                        return;
                    }

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

            Console.WriteLine($"{method} {url} {queryParams} {protocol} haveBody:{isHaveBody}");

            /**
            *
            * Part 3: check method handler, wait body (if needed) and process request
            *
            */
            if (
                webServer.listenersList.ContainsKey(method) &&
                webServer.listenersList[method].ContainsKey(url)
                )
            {

                // continue read request body if needed
                if (isHaveBody)
                {

                    // if complete request body
                    if (request.Length == headersLength + contentLength)
                    {
                        body = request.Substring(headersLength);
                    }
                    else
                    {
                        while ((count = clientStream.Read(buffer, 0, buffer.Length)) > 0)
                        {

                            request += Encoding.UTF8.GetString(buffer, 0, count);

                            // if content length equal body size
                            if (request.Length == headersLength + contentLength) // + content length
                            {
                                body = request.Substring(headersLength, request.Length);
                                Console.WriteLine(body);
                                break;
                            }

                            // if content length equal body size
                            if (request.Length > headersLength + this.contentLength) // + content length
                            {
                                sendStatusCodeAndClose(413);
                                return;
                            }

                            // if client to slow
                            if (false)
                            {
                                sendStatusCodeAndClose(408);
                                return;
                            }

                        }
                    }
                }

                try
                {
                    sendResponseAndClose(webServer.listenersList[method][url](this));
                }
                catch (Exception exc)
                {
                    Console.WriteLine("Error on handle request: \n{0}", exc);
                    sendStatusCodeAndClose(500);
                    return;
                }

            }
            else
            {
                sendStatusCodeAndClose(405);
                return;
            }

            // request handler
            sendStatusCodeAndClose(500);

        }

        public void sendStatusCodeAndClose(int statusCode)
        {

            if (tcpClietn.Connected)
            {
                string html = String.Concat(
                    "<html><body style=\"background:linear-gradient(135deg, #ffffff 0%,#BFC7CE 100%);text-align:center\">",
                    "<h1 style=\"font-size:3em;font-family:sans-serif;color:#7F8888;padding-top:20%\">",
                    Models.StatusCodeDictionary.codes[statusCode],
                    "</h1></body></html>"
                );

                string Str = $"HTTP/1.1 {statusCode} {Models.StatusCodeDictionary.codes[statusCode]}\n" +
                                $"Content-type: text/html\nContent-Length:{html.Length.ToString()}\n\n" +
                                html;
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

            string responseString;
            if (responseText == null)
            {
                responseString = $"HTTP/1.1 200 OK\n{headersString}\n";
            } else
            {
                responseString = $"HTTP/1.1 200 OK\n{headersString}Content-Length:{responseText.Length.ToString()}\n\n" + responseText;
            }
            
            buffer = Encoding.UTF8.GetBytes(responseString);
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
