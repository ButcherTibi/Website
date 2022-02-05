var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var FetchBinaryResponseType;
(function (FetchBinaryResponseType) {
    FetchBinaryResponseType[FetchBinaryResponseType["BLOB"] = 0] = "BLOB";
    FetchBinaryResponseType[FetchBinaryResponseType["ARRAY_BUFFER"] = 1] = "ARRAY_BUFFER";
})(FetchBinaryResponseType || (FetchBinaryResponseType = {}));
;
/**
 * Simple wrapper over the fecth API
 */
function serverFetch(url, body, response_type = FetchBinaryResponseType.BLOB) {
    let req_headers = new Headers();
    // req_headers.append("Accept", "application/json");
    req_headers.append("Content-Type", "application/json");
    let req_init = {
        method: "POST",
        body: JSON.stringify(body),
        headers: req_headers
    };
    return fetch(url, req_init).then((response) => {
        if (response.ok === false) {
            throw response;
        }
        let content_type = response.headers.get("Content-Type");
        if (content_type.includes("application/json")) {
            return response.json();
        }
        else {
            switch (content_type) {
                case "video/mp4": {
                    switch (response_type) {
                        case FetchBinaryResponseType.BLOB: {
                            return response.blob();
                        }
                        case FetchBinaryResponseType.ARRAY_BUFFER: {
                            return response.arrayBuffer();
                        }
                    }
                }
            }
        }
        return response.text();
    }, (err) => { throw err; });
}
;
function formatDate(raw_date) {
    let date = new Date(raw_date);
    return Intl.DateTimeFormat("ro").format(date);
}
function formatNumber(number) {
    return Intl.NumberFormat("ro").format(number);
}
function assert(expression_result) {
    if (expression_result == false) {
        throw "assertion failed";
    }
}
function mustGetElementById(id) {
    let elem = document.getElementById(id);
    assert(elem != null);
    return elem;
}
window.onload = () => __awaiter(this, void 0, void 0, function* () {
    serverFetch("api/getVideoInfo", { video_id: 0 }).then(res => {
        let title = mustGetElementById("title");
        title.textContent = res.title;
        let views = mustGetElementById("views");
        views.textContent = res.views;
        let date = mustGetElementById("date");
        date.textContent = formatDate(res.publish_date);
        // Rating
        {
            let likes_count = res.likes;
            let likes = mustGetElementById("likes");
            likes.textContent = formatNumber(likes_count);
            let dislikes_count = res.dislikes;
            let dislikes = mustGetElementById("dislikes");
            dislikes.textContent = formatNumber(dislikes_count);
            let bar = mustGetElementById("likes_fill_bar");
            bar.style.width = `${(likes_count / (likes_count + dislikes_count)) * 100}%`;
        }
        // Tags
        {
            let tags_wrap = mustGetElementById("tags");
            let tag_names = res.tags;
            tag_names.forEach(tag => {
                let button = document.createElement("button");
                button.classList.add("tag");
                button.innerText = tag;
                tags_wrap.appendChild(button);
            });
        }
    });
    serverFetch("api/getWholeMP4_Video", { video_id: 0 }).then((res) => {
        let blob_url = URL.createObjectURL(res);
        let video = document.getElementById("video");
        video.src = blob_url;
    });
    serverFetch("api/getVideoComments", { video_id: 0 }).then(res => {
        let comments = res.comments;
        console.log(comments);
    });
});
//# sourceMappingURL=Video.js.map