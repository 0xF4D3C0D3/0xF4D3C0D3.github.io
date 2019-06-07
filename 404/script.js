var d = document;

var cmd = "";
var cmds = {
  "-h": "print this help screen",
  "-l": "list all available pages",
  "-g": "go to page &lt;page&gt;",
  "-b": "go back to previous page",
  "-m": "go to home page"
};
var pages = ["home","profile","languages","forum","articles"];

var $wrap = d.getElementsByClassName("wrap")[0];

var $block = d.createElement("span");
var $userin = d.getElementsByClassName("userin");
function clearCmd(){ cmd = ''; }

function buildLine(){
  var $cont = d.createElement("li");var $h1 = d.createElement("h1");
  $h1.classList.add("userin");
  $h1.innerHTML = ">&nbsp;";
  $cont.appendChild($h1);
  $cont.appendChild($block);
  return $cont;
}

function clearLine(){
  el.innerHTML = "<h1 class='userin'>&gt;&nbsp;</h1>"+ $block;
}
function printHelp(){
  var $ul = d.createElement("ul");
  //loop thru commands and print
  (function(){
    for(var command in cmds){
    var $li = d.createElement("li");
    $li.innerHTML = "&gt;&nbsp;" + command + " "+cmds[command];
    $ul.appendChild($li);
    
    }
  })();
  return $ul;
}
function printPages(){
  var $ul = d.createElement("ul");
  for(var i = 0; i < pages.length; i++){
    var $li = d.createElement("li");
    $li.innerHTML += '&gt;&nbsp;'+pages[i];
    $ul.appendChild($li);
  }
  return $ul;
}
function previousPage(){
  history.go(-1);
}
function goToPage(u){
  history.go(u);
}
function goHome(url){
    history.go(url);
}
function handleCommand(userinput){
  (function(){
    if(userinput.length >2){
    var chunks = userinput.split(" ");
    if(chunks[0] == Object.keys(cmds)[2]){
      goToPage(chunks[1]);
    }
    return false;
  }
  })();
  var $errorLi = d.createElement('li');
  $errorLi.innerHTML = "<h1 style='color:tomato;'>&gt;&nbsp;INCOMPETENCE ERROR: no such command.</h1>";
  (function(){
      if(userinput == "-h" || userinput == "-l" || userinput == "-g" || userinput == "-b" || userinput == "-m"){
      }else{
        $wrap.appendChild($errorLi);
      }
  })();
  
  switch(userinput){
    case Object.keys(cmds)[0]:
      $wrap.appendChild(printHelp());
      break;
    case Object.keys(cmds)[1]:
      $wrap.appendChild(printPages());
      break;  
    case Object.keys(cmds)[3]:
      previousPage();
      break;
    case Object.keys(cmds)[4]:
      goHome("");
      break;   
    //default: $wrap.appendChild($errorLi);     
  }
}
$wrap.appendChild(buildLine());
d.body.addEventListener("keypress", function(e){
  keycode = e.keyCode; 
  if(keycode == "13"){
    console.log($userin[$userin.length-1].parentNode.children[1]);
      handleCommand(cmd);
      clearCmd();
      $wrap.appendChild(buildLine());
  }else if(keycode == "8" || keycode == "46"){
      cmd[cmd.length-1] = "";
  }else{
    cmd += String.fromCharCode(keycode);
  }
  var children = d.getElementsByClassName("userin");
  children[children.length-1].innerHTML = "> "+cmd;
});