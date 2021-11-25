const http = require('http')
const cp = require('child_process')

let hostname = 'Enter your IP Address';
let port = 80;
let server = http.createServer();

const io = require("socket.io")(server,{cors:{
origin:"*",
    methods: ["GET", "POST"],
}
});

io.on("connection", (socket) => {
    socket.on("message",(data)=>{
            let output="";
            console.log(data);
            cp.exec("cd ~\n"+data,{
                shell:"powershell.exe",
                encoding:"utf8"},(err,sout,serr)=>{
                    if(err) console.log(err.message);
                    output = (serr);
                    output += (sout);
                    console.log("Output: "+output);
                    
                    socket.send(output);
                });
    });
});

server.listen(port,hostname,()=>{
    console.log(`Server Running ${hostname}:${port}`);
});


