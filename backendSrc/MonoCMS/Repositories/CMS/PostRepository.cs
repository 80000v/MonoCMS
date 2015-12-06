using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MonoCMS.Services.Core;
using Npgsql;

namespace MonoCMS.Repositories.CMS
{
    class PostRepository
    {

        private static string schemeName = Config.db.scheme;

        private static string getPostsCommand = "SELECT id, author_id, creation_date, modified_date, title, content, " +
                                                        "post_status_id, comment_status_id, password, name, parent_id, " +
                                                        "guid, menu_order, type_id, mime_type, comments_ids " +
                                                  $"FROM \"{schemeName}\".posts " +
                                                 "WHERE id = 2;";
        public static string getPosts()
        {
            NpgsqlConnection connection = DBConnectionService.getFreeConnection();
            NpgsqlCommand command = new NpgsqlCommand(getPostsCommand, connection);
            NpgsqlDataReader reader = command.ExecuteReader();

            reader.Read();
            string result = reader.GetString(5);
            reader.Close();

            DBConnectionService.returnConnection(connection);

            return result;
        }

    }
}
