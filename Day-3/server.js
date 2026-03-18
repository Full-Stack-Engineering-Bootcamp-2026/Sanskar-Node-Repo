import http from 'http';
const server = http.createServer((req, res) => {
    const { url, method } = req;
    console.log(url);
    console.log(method);
    
    if (method == "GET") {
        if (url == "/") {
            res.end("<h1>Home Page</h1><a href = 'http://localhost:3000/about'>About</a>")
        }
        else if (url == "/about") {
            res.end("<h1>Sanskar Rajput</h1>")
        }
        else if (url == "/redirect") {
            // res.statusCode = 302;
            // res.setHeader("Location",'/');
            res.writeHead(302, {
                "Location": '/'
            })
            return res.end();
        }
        else if (url == "/time") {
            res.end(JSON.stringify({ Time: new Date().toLocaleTimeString() }));
        }
        else {
            res.end("<h1>404 Not Found</h1>")
        }
    }
    if(method == "POST"){
        if(url == "/"){
            console.log(res);
            res.end(JSON.stringify({method:"POST"}))
        }
    }
})

server.listen(3000, () => {
    console.log("Listening at 3000");
})