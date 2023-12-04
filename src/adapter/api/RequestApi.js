export default class RequestAPI {

    ajax = (opts) => {

        if(!opts.type){
            opts.type = "POST";
        }
        if(!opts.async){
            opts.async = true;
        }

        if(!opts.headers){
            opts.headers ={
                "content-type" : "application/json"
            }
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let url = opts.url;
            let params = opts.query_params;
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function(key) {
                    return encodeURIComponent(key).replace(/%20/g, '+') +
                        '=' + encodeURIComponent(params[key]).replace(/%20/g, '+');
                }).join('&');
                url = url + '?' + params;
            }

            params = opts.data;

            if (params && typeof params === 'object' && !params._parts) {
                params = Object.keys(params).map(function(key) {
                    return encodeURIComponent(key).replace(/%20/g, '+') +
                        '=' + encodeURIComponent(params[key]).replace(/%20/g, '+');
                }).join('&');

                opts.data = params;
            }

            xhr.open(opts.type, url, opts.async);

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    opts.success(xhr.response,xhr);
                } else {
                    opts.error(xhr.status,xhr.statusText,xhr);

                }
                if(typeof  opts.complete == "function"){
                    opts.complete(xhr);
                }
            };

            xhr.onerror = function() {
                // console.log('general error!');
                opts.error(xhr.status,xhr.statusText,xhr);
            };

            if (xhr.upload && opts.onProgress){
                xhr.upload.onprogress = opts.onProgress;
            }

            if (opts.headers) {
                Object.keys(opts.headers).forEach(function(key) {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }

            if (opts.type.toUpperCase() == 'POST'){
                xhr.send(opts.data);
            } else {
                xhr.send()
            }
        })
    };
}