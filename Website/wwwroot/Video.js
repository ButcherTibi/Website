/**
 * Simple wrapper over the fecth API
 * @param url target URL to send request
 * @param body object to send to server
 */
function serverFetch(url, body) {
    var req_headers = new Headers();
    req_headers.append("Accept", "application/json");
    req_headers.append("Content-Type", "application/json");
    var req_init = {
        method: "POST",
        body: JSON.stringify(body),
        headers: req_headers
    };
    return fetch(url, req_init).then(function (response) {
        if (response.ok === false) {
            throw response;
        }
        switch (response.headers.get("Content-Type")) {
            case "video/mp4": {
                return response.blob();
            }
        }
        return response.json();
    }, function (err) { throw err; });
}
;
function formatDate(raw_date) {
    var date = new Date(raw_date);
    return Intl.DateTimeFormat("ro").format(date);
}
function formatNumber(number) {
    return Intl.NumberFormat("ro").format(number);
}
window.onload = function () {
    serverFetch("api/getVideoInfo", { video_id: 1 }).then(function (res) {
        var title = document.getElementById("title");
        title.textContent = res.title;
        var views = document.getElementById("views");
        views.textContent = res.views;
        var date = document.getElementById("date");
        date.textContent = formatDate(res.publish_date);
        // Rating
        {
            var likes_count = res.likes;
            var likes = document.getElementById("likes");
            likes.textContent = formatNumber(likes_count);
            var dislikes_count = res.dislikes;
            var dislikes = document.getElementById("dislikes");
            dislikes.textContent = formatNumber(dislikes_count);
            var bar = document.getElementById("likes_fill_bar");
            bar.style.width = "".concat((likes_count / (likes_count + dislikes_count)) * 100, "%");
        }
        // Tags
        {
            var tags_wrap_1 = document.getElementById("tags");
            var tag_names = res.tags;
            tag_names.forEach(function (tag) {
                var button = document.createElement("button");
                button.classList.add("tag");
                button.innerText = tag;
                tags_wrap_1.appendChild(button);
            });
        }
    });
    serverFetch("api/getVideoSegment", { video_id: 1 }).then(function (res) {
        var blob_url = URL.createObjectURL(res);
        var video = document.getElementById("video");
        video.src = blob_url;
        // video.style.aspectRatio = video.videoWidth / video.videoHeight;
        console.log(res.type);
    });
};
//# sourceMappingURL=Video.js.map