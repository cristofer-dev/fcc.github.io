function peticion(user){

    var body = null;
    var xhr = new XMLHttpRequest();

    var url = "https://www.freecodecamp.com/"+user;

    xhr.open("GET", url);

    xhr.onreadystatechange = function(dump){
      if (this.readyState === 4) {
        //obj = JSON.parse(this.responseText);

        //console.log(this.responseText);
        var n = this.responseText.search('\\[ ');
        var res = this.responseText.substr(n, 7)
        res = res.replace('[', "");
        res = res.replace(' ', "");
        res = res.replace(']', "");
        res = res.replace('<', "");
        res = res.replace('>', "");
        console.log(res);
        document.getElementById(user).innerHTML = res;
        
      }
    }


    xhr.send(body);

}

peticion('rodpoblete');
peticion('cristofer-dev');
peticion('jakojazz');
peticion('c-rojasa');
peticion('luis');
