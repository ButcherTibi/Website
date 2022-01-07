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
        return response.json();
    }, function (err) { throw err; });
}
;
window.onload = function (e) {
    serverFetch("api/getVideo", { video_id: 1 });
};
//# sourceMappingURL=Video.js.map