# Bypassing Cross Origin Restrictions
Since webpages are heavily sandboxed to a given domain name, two possible approaches are demonstrated to create the request.

## CORS
Setting the `Access-Control-Allow-Origin` HTTP header to `*` allows cross origin requests to be made. For more information on CORS, visit [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## JSONP
JSON with padding essentially consists of having a callback function on the site making the request, creating a dynamically generated script on the server which invokes the callback function (with arguments to transmit data back) and adding a script tag to trigger the downloading and execution of the remote script.

# API Structure
Code for the `/api/cors` endpoint is located in [cors.ts](https://github.com/QuietRocket/StaticAuth/blob/master/api/cors.ts).

Code for `/api/jsonp.js` dynamically generated script is located in [jsonp.js.ts](https://github.com/QuietRocket/StaticAuth/blob/master/api/jsonp.js.ts).

Code that is common to the CORS and JSONP approach are placed in [utils.ts](https://github.com/QuietRocket/StaticAuth/blob/master/api/utils.ts).

The [vercel.json](https://github.com/QuietRocket/StaticAuth/blob/master/vercel.json) configuration file was used to specify the CORS headers.