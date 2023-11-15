const _axios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
});

const _config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

function sendRequest(info, URL, callback) {
    //alter(info)
    $.ajax({
        type: "post",
        url: URL || "../../../server/serverRequests",
        data: info,
        xhrFields: {withCredentials: true},
        success: function f(e) {
            callback(e)
            // success();
            //reset()
        },
        error: function (e) {
            console.log(e)
            //Error();
        }
    })
}

function sendGet(URL, callback) {
    _axios.get(URL, _config)
        .then(response => {
            callback(response.data);
        })
}

function sendPost(info, URL, callback) {

    _axios.post(URL, info, _config)
        .then((response, err) => {
            if (err)
                alert("error")
            callback(response);
        })
}

function sendDelete(URL, callback) {
    _axios.delete(URL, _config)
        .then(response => {
            callback(response.data);
        })
}

function sendFile(info, URL, callback) {
    axios.post(URL, info, { withCredentials: true, headers: {
          "Content-Type": "multipart/form-data",
        }, })
        .then(response => {
            const dt = response.data;
            console.log(dt)
        })
    /*$.ajax({
        type: "post",
        processData: false,
        xhrFields: { withCredentials: true },
        crossDomain: true,
        // cookies: document,
        contentType: "text/plain",
        url: URL||"../../../server/serverRequests",
        data:info,
        success: function f(e) {
            callback(e)
            // success();
            //reset()
        },
        error:function (e) {
            console.log(e)
            //Error();
        }
    })*/
}

function alter(info, URL, g) {
    $.ajax({
        type: "post",
        url: URL,
        data: info,
        success: function f(e) {
            let r = ($(".log tbody tr").length);
            // success(e,r,g);
        },
        error: function () {
            console.log("wrong")
        }
    })
}

function Error(err) {
    console.log("An error occured", err)
}

function success(w, y, g) {
    let p = w === "" ? "successful - nothing from the server" : w;
    if (g) {
        let len = y - 1;
        if ($.parseJSON(p).column === "error-id already exists") {
            let nodes = `<td class="err">Error!! repeated id</td>`;
            $("#logs .log tr:eq(" + len + ")").append(nodes);
        } else {
            cl(y, "blue");
            ($("#logs .log tr:eq(" + len + ")").remove());
            if (len === 0) {
                $("#logs").hide()
            }
            cl(p, "purple")
        }
    }
}