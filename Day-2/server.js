import http from 'http';

const server = http.createServer((req, res) => {
    const {url}= req;    
    if (url == "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            name: "Sanskar Rajput",
            date: new Date().toLocaleDateString()
        }))
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end('<div><h1>Sanskar Rajput</h1><h2 id="date"></h2><script>document.getElementById("date").innerHTML = new Date().toLocaleDateString();</script></div>');
    }

});

server.listen(4000, () => {
    console.log("Listening at port 3000");
})