const http=require('http')

http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url=='/login'){

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h2>Login</h2>')
        res.end()
    }
    else if(req.url=='/register'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h2>Register</h2>')
        res.end()
    }
}).listen(4000)