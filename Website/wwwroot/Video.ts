

/**
 * Simple wrapper over the fecth API
 * @param url target URL to send request
 * @param body object to send to server
 */
function serverFetch(url: RequestInfo, body: any): Promise<any> {

    let req_headers = new Headers();
    req_headers.append("Accept", "application/json");
    req_headers.append("Content-Type", "application/json");

    let req_init: RequestInit = {
        method: "POST",
        body: JSON.stringify(body),
        headers: req_headers
    };

    return fetch(url, req_init).then(
        (response: Response) => {
            if (response.ok === false) {
                throw response;
            }

            switch (response.headers.get("Content-Type")) {
                case "video/mp4": {
                    return response.blob();
                }
            }

            return response.json();
        },
        (err: Error) => { throw err }
    );
};

function formatDate(raw_date: string): string {
    let date = new Date(raw_date);
    return Intl.DateTimeFormat("ro").format(date);
}

function formatNumber(number: number): string {
    return Intl.NumberFormat("ro").format(number);
}


window.onload = () => {
    
    serverFetch("api/getVideoInfo", { video_id: 1 }).then(
        res => {

            let title: HTMLElement = document.getElementById("title");
            title.textContent = res.title;

            let views: HTMLElement = document.getElementById("views");
            views.textContent = res.views;

            let date: HTMLElement = document.getElementById("date");
            date.textContent = formatDate(res.publish_date);

            // Rating
            {
                let likes_count = res.likes;
                let likes: HTMLElement = document.getElementById("likes");
                likes.textContent = formatNumber(likes_count);

                let dislikes_count = res.dislikes;
                let dislikes: HTMLElement = document.getElementById("dislikes");
                dislikes.textContent = formatNumber(dislikes_count);

                let bar: HTMLDivElement = document.getElementById("likes_fill_bar") as HTMLDivElement;
                bar.style.width = `${(likes_count / (likes_count + dislikes_count)) * 100}%`;
            }

            // Tags
            {
                let tags_wrap: HTMLDivElement = document.getElementById("tags") as HTMLDivElement;

                let tag_names: [string] = res.tags;
                tag_names.forEach(tag => {

                    let button = document.createElement("button") as HTMLButtonElement;
                    button.classList.add("tag");
                    button.innerText = tag;

                    tags_wrap.appendChild(button);
                });
            }
        }
    );

    serverFetch("api/getVideoSegment", { video_id: 1 }).then(
        (res: Blob) => {
            let blob_url = URL.createObjectURL(res);

            let video = document.getElementById("video") as HTMLVideoElement;
            video.src = blob_url;
            // video.style.aspectRatio = video.videoWidth / video.videoHeight;

            console.log(res.type);
        }
    );
};
