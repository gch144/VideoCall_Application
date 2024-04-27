console.log('IN main.js!');

// var lableUsername = document.querySelector('#lable-username');
var usernameInput = document.querySelector('#username');
var btnJoin = document.querySelector('#btn-join');

var username ;
var webSocket ;
function webSocketOnMessage(event){
    var parsedData = JSON.parse(event.data);
    var message = parsedData['message'];
    console.log('message: ', message);  
}
btnJoin.addEventListener('click', ()=>{
    username = usernameInput.value;

    console.log('username: ', username);

    if(username == ''){
        alert('Please enter a username');
        return;
    }

    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibility = 'hidden';

    btnJoin.disabled = true;
    btnJoin.style.visibility = 'hidden';

    var lableUsername = document.querySelector('#label-username');
    lableUsername.innerHTML = username;

    var loc = window.location;
    console.log('loc: ', loc);  
    var wsStart = 'ws://';
    if(loc.protocol == 'https:'){
        wsStart = 'wss://';
    }

    var endpoint = wsStart + loc.host + loc.pathname;
    console.log('endpoint: ', endpoint);

    webSocket = new WebSocket(endpoint);


    webSocket.addEventListener('open', (e)=>{
        console.log('Connection opened');
        // webSocket.send(JSON.stringify   ({  'username': username   }));             
    });
    webSocket.addEventListener('message', webSocketOnMessage);  

    webSocket.addEventListener('close', (e)=>{
        console.log('Connection closed',e);
    });


    webSocket.addEventListener('error', (e)=>{
        console.log('Error: ', e);
    });



});