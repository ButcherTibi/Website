
enum FetchBinaryResponseType {
	BLOB,
	ARRAY_BUFFER
};

/**
 * Simple wrapper over the fecth API
 */
function serverFetch(url: RequestInfo, body: any, response_type: FetchBinaryResponseType = FetchBinaryResponseType.BLOB): Promise<any> {

	let req_headers = new Headers();
	// req_headers.append("Accept", "application/json");
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

function assert(expression_result: boolean) {
	if (expression_result == false) {
		throw "assertion failed";
    }
}

function mustGetElementById(id: string) {
	let elem = document.getElementById(id);

	assert(elem != null);
	return elem;
}

type VideoComment = {
	id: number,

	depth: number,

	// User Info
	user_id: number,
	user_name: string,

	// Comment Info
	likes: number,
	dislikes: number,
	last_edit: Date,

	// Content
	text: string
};


window.onload = async () => {
	
	serverFetch("api/getVideoInfo", { video_id: 0 }).then(
		res => {

			let title: HTMLElement = mustGetElementById("title");
			title.textContent = res.title;

			let views: HTMLElement = mustGetElementById("views");
			views.textContent = res.views;

			let date: HTMLElement = mustGetElementById("date");
			date.textContent = formatDate(res.publish_date);

			// Rating
			{
				let likes_count = res.likes;
				let likes: HTMLElement = mustGetElementById("likes");
				likes.textContent = formatNumber(likes_count);

				let dislikes_count = res.dislikes;
				let dislikes: HTMLElement = mustGetElementById("dislikes");
				dislikes.textContent = formatNumber(dislikes_count);

				let bar: HTMLDivElement = mustGetElementById("likes_fill_bar") as HTMLDivElement;
				bar.style.width = `${(likes_count / (likes_count + dislikes_count)) * 100}%`;
			}

			// Tags
			{
				let tags_wrap: HTMLDivElement = mustGetElementById("tags") as HTMLDivElement;

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

	serverFetch("api/getWholeMP4_Video", { video_id: 0 }).then(
	    (res: Blob) => {

	        let blob_url = URL.createObjectURL(res);

	        let video = document.getElementById("video") as HTMLVideoElement;
	        video.src = blob_url;
	    }
	);

	serverFetch("api/getVideoComments", { video_id: 0 }).then(
		res => {

			let comments: [VideoComment] = res.comments;
			console.log(comments);
        }
	);
};
