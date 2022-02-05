
using System.Drawing;


public class ClientVideoComment
{
	public int id { get; set; }

	public int depth { get; set; }

	// User Info
	public int user_id { get; set; }
	public string user_name { get; set; }

	// Comment Info
	public int likes { get; set; }
	public int dislikes { get; set; }
	public DateTime last_edit { get; set; }

	// Content
	public string text { get; set; }
}


namespace db
{
	public class DatabaseItem
	{
		public uint id;
	}

	public class User : DatabaseItem
	{
		public string name;
		public Color color;

		public byte[] password;
		public string email;
	}

	//public class Comment : DatabaseItem
 //   {
	//	public uint parent_id;
	//	public List<uint> children_id;

	//	// Info
	//	public uint user_id;
	//	public uint likes;
	//	public uint dislikes;
	//	public DateTime last_edit;

	//	// Content
	//	public string text;
	//}

	public class Reply : DatabaseItem
	{
		public uint parent_id;
		public List<uint> children_id;

		public uint depth;

		// Info
		public uint user_id;
		public uint likes;
		public uint dislikes;
		public DateTime last_edit;

		// Content
		public string text;
	}


	// Server ///////////////////////////////////////////////////////////////////

	public class ServerUserGroup : DatabaseItem
	{
		public uint parent_id;
		public List<uint> children_id;

		public string name;
		public Color color;

		public List<uint> users;

		// Permisions
	}

	public enum ServerContentType
	{
		VIDEO,
		AUDIO,
		IMAGE,
		TEXT,
		DISCUSSION
	}

	/// <summary>
	/// Server content can referer to video, audio etc.
	/// Use type to determine where to look for id
	/// </summary>
	public class ServerFolderContent : DatabaseItem
	{
		public ServerContentType type;
		public uint content_id;
	}

	public class ServerFolder : DatabaseItem
	{
		public uint parent_id;
		public List<uint> children_id;

		public string name;
		public Color color;

		public List<uint> content;
	}

	public class Server : DatabaseItem
	{
		public string name;
		public Color color;

		public List<uint> user_groups;
		public List<uint> folders;
	}


	// Content ////////////////////////////////////////////////////////////////

	public class Video : DatabaseItem
	{
		// Info
		public string title;
		public uint views;
		public DateTime publish_date;

		public uint likes;
		public uint dislikes;

		public List<string> tags = new List<string>();

		// Description
		public uint author_id;

		public string summary;
		public string description;

		// Comments
		public List<uint> comments = new List<uint>();

		// Content Resource
		public string file_path;
	}

	public class Discussion : DatabaseItem
	{
		public string title;

		public string description;

		public List<uint> replies;
	}


	// /////////////////////////////////////////////////////////////////////////

	public class Database
	{
		public List<User> users = new List<User>();
		public List<Reply> replies = new List<Reply>();
		public List<Reply> comments = new List<Reply>();

		// Server
		public List<ServerUserGroup> groups = new List<ServerUserGroup>();
		public List<ServerFolderContent> folder_content = new List<ServerFolderContent>();
		public List<ServerFolder> folders = new List<ServerFolder>();
		public List<Server> servers = new List<Server>();

		// Content
		public List<Video> videos = new List<Video>();
		public List<Discussion> discussions = new List<Discussion>();


		public void init()
		{
			users.Add(new User {
				id = 0,
				name = "Utilizator 0"
			});

			videos.Add(new Video {
				id = 0,
				title = "This the Video Title",
				views = 1_851_638,
				publish_date = new DateTime(2022, 6, 21),
				likes = 81_456,
				dislikes = 3_201,
				tags = new List<string> { "Podcast", "Philosophy", "Politics" },

				author_id = 0,
				summary = "Video summary",
				description = "Video description",

				file_path = "Database Resources/video.mp4"
			});
		}

		public void getVideo(uint video_id, out Video r_video)
		{
			r_video = videos.Find((video) => {
				return video.id == video_id;
			});
		}

		public async Task<byte[]> getVideoResource(uint video_id)
		{
			Video found_video = videos.Find((video) => {
				return video.id == video_id;
			});

			if (found_video == null) {
				return null;
			}
			else {
				return await File.ReadAllBytesAsync(found_video.file_path);
			}
		}

		public bool getNiceVideoComments(uint video_id, out List<ClientVideoComment> r_comments)
		{
			Video video;
			getVideo(video_id, out video);

			if (video == null) {
				r_comments = null;
				return false;
			}

			r_comments = new List<ClientVideoComment>();

			foreach (uint comment_id in video.comments) {

				Reply db_comment = comments.Find(comment => {
					return comment.id == comment_id;
				});

				User user = users.Find(user => {
					return user.id == db_comment.user_id;
				});

				var nice_comment = new ClientVideoComment();
				nice_comment.id = (int)db_comment.id;
				nice_comment.depth = (int)db_comment.depth;
				nice_comment.user_id = (int)db_comment.user_id;
				nice_comment.user_name = user.name;
				nice_comment.likes = (int)db_comment.likes;
				nice_comment.dislikes = (int)db_comment.dislikes;
				nice_comment.last_edit = db_comment.last_edit;
				nice_comment.text = db_comment.text;

				r_comments.Add(nice_comment);
			}

			return true;
		}
	}
}
