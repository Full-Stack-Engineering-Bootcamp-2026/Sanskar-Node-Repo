import fs from 'fs'
const requestHandler = (req, res) => {
    const { url, method } = req;
    if (url == "/" && method == "GET") {
        res.write("<html>");
        res.write("<body>");
        res.write("<form action = '/submit' method = 'POST'>");
        res.write("<label for = 'name'>Name</label>")
        res.write("<input type = 'text' name = 'name'><br>")
        res.write("<label for = 'message'>Message</label>")
        res.write("<input type = 'text' name = 'message'>")
        res.write("<button>Submit</button>")
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    }
    else if (url == "/submit" && method == "POST") {
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        })

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(parsedBody);
            for (const [key, value] of params) {
                console.log(value);
            }
            res.statusCode = 302;
            res.setHeader("location", "/");
            return res.end();
        })
    }
}

export default requestHandler;