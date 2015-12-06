using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoCMS.Libraries.WebServer
{

    // https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_MIME-%D1%82%D0%B8%D0%BF%D0%BE%D0%B2

    class MIMETypes
    {
        public static MIMETypeApplication application = new MIMETypeApplication();
        public static MIMETypeAudio audio = new MIMETypeAudio();
        public static MIMETypeImage image = new MIMETypeImage();
        public static MIMETypeMessage message = new MIMETypeMessage();
        public static MIMETypeModel model = new MIMETypeModel();
        public static MIMETypeMultipart multipart = new MIMETypeMultipart();
        public static MIMETypeText text = new MIMETypeText();
        public static MIMETypeVideo video = new MIMETypeVideo();
        public static MIMETypeVendor vendor = new MIMETypeVendor();
        public static MIMETypeUnstandart unstandart = new MIMETypeUnstandart();
        public static MIMETypePKCS pkcs = new MIMETypePKCS();

    }

    class MIMETypeApplication
    {

        public string atomXml = "application/atom+xml";
        public string EDIX12 = "application/EDI-X12";
        public string EDIFACT = "application/EDIFACT";
        public string json = "application/json";
        public string javascript = "application/javascript";
        public string octetStream = "application/octet-stream";
        public string pdf = "application/pdf";
        public string postscript = "application/postscript";
        public string soapXml = "application/soap+xml";
        public string xWoff = "application/x-woff";
        public string xhtmlXml = "application/xhtml+xml";
        public string xmlDtd = "application/xml-dtd";
        public string xopXml = "application/xop+xml";
        public string zip = "application/zip";
        public string gzip = "application/gzip";
        public string xXittorrent = "application/x-bittorrent";
        public string xTex = "application/x-tex";
        public string ogg = "application/ogg";

    }

    class MIMETypeAudio
    {

        public string basic = "audio/basic";
        public string L24 = "audio/L24";
        public string mp4 = "audio/mp4";
        public string aac = "audio/aac";
        public string mpeg = "audio/mpeg";
        public string ogg = "audio/ogg";
        public string vorbis = "audio/vorbis";
        public string xMsWma = "audio/x-ms-wma";
        public string xMsWax = "audio/x-ms-wax";
        public string vndRnRealaudio = "audio/vnd.rn-realaudio";
        public string vndWave = "audio/vnd.wave";
        public string webm = "audio/webm";

    }

    class MIMETypeImage
    {

        public string gif = "image/gif";
        public string jpeg = "image/jpeg";
        public string pjpeg = "image/pjpeg";
        public string png = "image/png";
        public string svgXml = "image/svg+xml";
        public string tiff = "image/tiff";
        public string vndMicrosoftIcon = "image/vnd.microsoft.icon";
        public string vndWapWbmp = "image/vnd.wap.wbmp";

    }

    class MIMETypeMessage
    {

        public string http = "message/http";
        public string imdnXml = "message/imdn+xml";
        public string partial = "message/partial";
        public string rfc822 = "message/rfc822";

    }

    class MIMETypeModel
    {

        public string example = "model/example";
        public string iges = "model/iges";
        public string mesh = "model/mesh";
        public string vrml = "model/vrml";
        public string x3dBinary = "model/x3d+binary";
        public string x3dVrml = "model/x3d+vrml";
        public string x3dXml = "model/x3d+xml";

    }

    class MIMETypeMultipart
    {

        public string mixed = "multipart/mixed";
        public string alternative = "multipart/alternative";
        public string related = "multipart/related";
        public string formData = "multipart/form-data";
        public string signed = "multipart/signed";
        public string encrypted = "multipart/encrypted";

    }

    class MIMETypeText
    {

        public string cmd = "text/cmd";
        public string css = "text/css";
        public string csv = "text/csv";
        public string html = "text/html";
        public string javascript = "text/javascript";
        public string plain = "text/plain";
        public string php = "text/php";
        public string xml = "text/xml";

    }

    class MIMETypeVideo
    {

        public string mpeg = "video/mpeg";
        public string mp4 = "video/mp4";
        public string ogg = "video/ogg";
        public string quicktime = "video/quicktime";
        public string webm = "video/webm";
        public string xMsWmv = "video/x-ms-wmv";
        public string xFlv = "video/x-flv";

    }

    class MIMETypeVendor
    {

        public string vndOasisOpendocumentText = "application/vnd.oasis.opendocument.text";
        public string vndOasisOpendocumentSpreadsheet = "application/vnd.oasis.opendocument.spreadsheet";
        public string vndOasisOpendocumentPresentation = "application/vnd.oasis.opendocument.presentation";
        public string vndOasisOpendocumentGraphics = "application/vnd.oasis.opendocument.graphics";
        public string vndMsExcel = "application/vnd.ms-excel";
        public string vndOpenxmlformatsOfficedocumentSpreadsheetmlSheet = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        public string vndMsPowerpoint = "application/vnd.ms-powerpoint";
        public string vndOpenxmlformatsOfficedocumentPresentationmlPresentation = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        public string msword = "application/msword";
        public string vndOpenxmlformatsOfficedocumentWordprocessingmlDocument = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        public string vndMozillaXulXml = "application/vnd.mozilla.xul+xml";
        public string vndGoogleEarthKmlXml = "application/vnd.google-earth.kml+xml";

    }

    class MIMETypeUnstandart
    {

        public string xWwwFormUrlencoded = "application/x-www-form-urlencoded";
        public string xDvi = "application/x-dvi";
        public string xLatex = "application/x-latex";
        public string xFontTtf = "application/x-font-ttf";
        public string xShockwaveFlash = "application/x-shockwave-flash";
        public string xStuffit = "application/x-stuffit";
        public string xRarCompressed = "application/x-rar-compressed";
        public string xTar = "application/x-tar";
        public string xJqueryTmpl = "text/x-jquery-tmpl";
        public string xJavascript = "application/x-javascript";

    }

    class MIMETypePKCS
    {

        public string xPkcs12 = "application/x-pkcs12";
        public string xPkcs7Certificates = "application/x-pkcs7-certificates";
        public string xPkcs7Certreqresp = "application/x-pkcs7-certreqresp";
        public string xPkcs7Mime = "application/x-pkcs7-mime";
        public string xPkcs7Signature = "application/x-pkcs7-signature";
    }

}
