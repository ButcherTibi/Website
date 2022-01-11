using System.Net.Http;
using Microsoft.AspNetCore.Mvc;


public static class WatchVideo
{
    public class VideoRequest
    {
        public int video_id { get; set; }
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

    public static VideoResponse getVideoInfo([FromBody] VideoRequest req)
    {
        var res = new VideoResponse();
        res.title = "This the Video Title";
        res.views = 1_851_638;
        res.publish_date = new DateTime(2022, 6, 21);
        res.likes = 81_456;
        res.dislikes = 3_201;
        res.tags = new List<string> { "Podcast", "Philosophy", "Politics" };

        return res;
    }

    public static async Task<HttpContext> getVideoSegment(HttpContext context)
    {
        var res = context.Response;
        res.ContentType = "video/mp4";

        var bytes = await File.ReadAllBytesAsync("Database/video.mp4");
        await res.Body.WriteAsync(bytes);

        return context;
    }
}
