
// Set Globals
{
    // string client_dir = global::System.IO.Path.GetDirectoryName();
    // File.ReadAllText("")
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseDefaultFiles();  // to load default.html
app.UseStaticFiles();  // to resolve CSS and JavaScript links

app.Map("/api/getVideoInfo", WatchVideo.getVideoInfo);
app.Map("/api/getVideoSegment", WatchVideo.getVideoSegment);

app.Run();


public class Global
{
    
}
