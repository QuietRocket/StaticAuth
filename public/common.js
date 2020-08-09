const cookie = document.cookie;
const parsed = cookie.split("; ").map(a => a.match(/^ucinetid_auth=(\w+)/)).filter(a => a);
if (parsed.length) {
    const token = parsed[0][1];
    handleToken(token);
} else {
    login();
}

function login() {
    const webauth = 'https://login.uci.edu/ucinetid/webauth';
    window.location.replace(`${webauth}?return_url=${window.location.href}`);
}

function onComplete(data) {
    const pre = document.createElement('pre');
    pre.innerHTML = data;
    document.body.appendChild(pre);
}