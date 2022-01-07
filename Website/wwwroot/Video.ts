

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

            return response.json();
        },
        (err: Error) => { throw err }
    );
};


window.onload = (e: Event) => {
    
    serverFetch("api/getVideo", { video_id: 1});
};
