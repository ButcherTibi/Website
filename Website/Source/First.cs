using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;


public static class WatchVideo
{
	

	public class CommnonVideoRequest
	{
		public uint video_id { get; set; }
	}

	public class VideoResponse
	{
		public string title { get; set; }
		public uint views { get; set; }
		public DateTime publish_date { get; set; }

		public uint likes { get; set; }
		public uint dislikes { get; set; }

		public List<string> tags { get; set; }
	}

	public static async Task<HttpContext> getVideoInfo(HttpContext context)
	{
		var req = await context.Request.ReadFromJsonAsync<CommnonVideoRequest>();

		db.Video video;
		Globals.database.getVideo(req.video_id, out video);

		if (video == null) {
			context.Response.StatusCode = 404;
			return context;
		}

		var res = new VideoResponse();
		res.title = video.title;
		res.views = video.views;
		res.publish_date = video.publish_date;
		res.likes = video.likes;
		res.dislikes = video.dislikes;
		res.tags = video.tags;

		await context.Response.WriteAsJsonAsync(res);
		return context;
	}

	public static async Task<HttpContext> getWholeVideo(HttpContext context)
	{
		var req = await context.Request.ReadFromJsonAsync<CommnonVideoRequest>();

		db.Video video;
		Globals.database.getVideo(req.video_id, out video);

		if (video == null) {
			context.Response.StatusCode = 404;
			return context;
		}

		context.Response.ContentType = "video/mp4";
		await context.Response.Body.WriteAsync(await File.ReadAllBytesAsync(video.file_path));
		return context;
	}

	public class VideoCommentsRequest
	{
		public uint video_id { get; set; }
	}

	public class VideoCommentsResponse
	{
		public List<ClientVideoComment> comments { get; set; }
	}

	public static async Task<HttpContext> getVideoComments(HttpContext context)
	{
		var req = await context.Request.ReadFromJsonAsync<VideoCommentsRequest>();

		List<ClientVideoComment> comments;

		if (Globals.database.getNiceVideoComments(req.video_id, out comments) == false) {
			context.Response.StatusCode = 404;
			return context;
		}

		var res = new VideoCommentsResponse();
		res.comments = comments;

		await context.Response.WriteAsJsonAsync(res);
		return context;
	}
}
