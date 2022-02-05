
/*
TODO:
- create login page
- create register page
- create a database engine ?
 */

// Globals
{
    Globals.database.init();
}

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();  // to load default.html
app.UseStaticFiles();  // to resolve CSS and JavaScript links

app.Map("/api/getVideoInfo", WatchVideo.getVideoInfo);
app.Map("/api/getWholeMP4_Video", WatchVideo.getWholeVideo);
app.Map("/api/getVideoComments", WatchVideo.getVideoComments);

app.Run();
