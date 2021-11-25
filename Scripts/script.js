let save = document.getElementById("save");
let execute = document.getElementById("execute");
let output = document.querySelector(".shell p");
let displayhost = document.querySelector(".shell h3");
let displayport = document.querySelectorAll(".shell h3")[1];
let socket;
let cwd;
let hostname;
let port;

save.addEventListener('click',(e)=>{
    hostname = document.getElementById("ip").value;
    port = document.getElementById("port").value;
    displayhost.innerHTML = "Hostname: "+hostname;
    displayport.innerHTML = "Port: "+port;

    socket = io("ws://"+hostname+":"+port);
    output.innerHTML = "";
    socket.on("connect",()=>{
        socket.send("pwd\n");
    });
    socket.on("message",(data)=>{
        data = updateCWD(data.trimEnd().split("\n"));
        output.innerText += ("\n"+cwd+">\n");
        output.innerText += (data+"\n");
    });
    socket.on("connect_error",()=>{
        output.innerText += ("\nUnable To Connect!\nRetrying...\n");
    });
    socket.on("disconnect",()=>{
        output.innerText += ("\nUnable To Connect!\nRetrying...\n");
    });
});

execute.addEventListener('click',(e)=>{
    if(socket.connected)
    {
        socket.send("cd \""+cwd+"\"\n"+document.getElementById("command").value+"\npwd\n");
    }
});
function updateCWD(arr){
    let res ="";
    if(arr.length != 0)
    {
        if(arr[arr.length-1].startsWith("Path")) cwd = arr[arr.length-1].substring(arr[arr.length-1].indexOf(":")+1);
        else cwd = arr[arr.length-1];
        cwd = cwd.trim();
    }   
    for(let i=0;i<arr.length-3;i++)
    {
        res += (arr[i]+"\n");
    } 
    return res;
}



