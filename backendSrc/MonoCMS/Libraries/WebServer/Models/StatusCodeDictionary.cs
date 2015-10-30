using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoCMS.Libraries.WebServer.Models
{

    class StatusCodeDictionary
    {

        public static Dictionary<int, string> codes = new Dictionary<int, string>();

        public static void init()
        {

            // https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP

            codes.Add(100, "Continue");
            codes.Add(101, "Switching Protocols");
            codes.Add(102, "Processing");
            codes.Add(105, "Name Not Resolved");
            codes.Add(200, "OK");
            codes.Add(201, "Created");
            codes.Add(202, "Accepted");
            codes.Add(203, "Non - Authoritative Information");
            codes.Add(204, "No Content");
            codes.Add(205, "Reset Content");
            codes.Add(206, "Partial Content");
            codes.Add(207, "Multi - Status");
            codes.Add(226, "IM Used");
            codes.Add(300, "Multiple Choices");
            codes.Add(301, "Moved Permanently");
            codes.Add(302, "Moved Temporarily");
            codes.Add(303, "See Other");
            codes.Add(304, "Not Modified");
            codes.Add(305, "Use Proxy");
            codes.Add(307, "Temporary Redirect");
            codes.Add(400, "Bad Request");
            codes.Add(401, "Unauthorized");
            codes.Add(402, "Payment Required");
            codes.Add(403, "Forbidden");
            codes.Add(404, "Not Found");
            codes.Add(405, "Method Not Allowed");
            codes.Add(406, "Not Acceptable");
            codes.Add(407, "Proxy Authentication Required");
            codes.Add(408, "Request Timeout");
            codes.Add(409, "Conflict");
            codes.Add(410, "Gone");
            codes.Add(411, "Length Required");
            codes.Add(412, "Precondition Failed");
            codes.Add(413, "Request Entity Too Large");
            codes.Add(414, "Request - URI Too Large");
            codes.Add(415, "Unsupported Media Type");
            codes.Add(416, "Requested Range Not Satisfiable");
            codes.Add(422, "Unprocessable Entity");
            codes.Add(423, "Locked");
            codes.Add(424, "Failed Dependency");
            codes.Add(425, "Unordered Collection");
            codes.Add(426, "Upgrade Required");
            codes.Add(428, "Precondition Required");
            codes.Add(429, "Too Many Requests");
            codes.Add(431, "Request Header Fields Too Large");
            codes.Add(449, "Retry With");
            codes.Add(451, "Unavailable For Legal Reasons");
            codes.Add(456, "Unrecoverable Error");
            codes.Add(500, "Internal Server Error");
            codes.Add(501, "Not Implemented");
            codes.Add(502, "Bad Gateway");
            codes.Add(503, "Service Unavailable");
            codes.Add(504, "Gateway Timeout");
            codes.Add(505, "HTTP Version Not Supported");
            codes.Add(506, "Variant Also Negotiates");
            codes.Add(507, "Insufficient Storage");
            codes.Add(508, "Loop Detected");
            codes.Add(509, "Bandwidth Limit Exceeded");
            codes.Add(510, "Not Extended");
            codes.Add(511, "Network Authentication Required");

        }

    }
}
