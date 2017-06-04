var objRanking = {};
var max = 0;
var arrayUser = [
    'rodpoblete',
    'cristofer-dev',
    'jakojazz',
    'c-rojasa',
    'luis'
];

function peticion(user,callback){

    var body = null;
    var xhr = new XMLHttpRequest();
    var url = "https://www.freecodecamp.com/"+user;

    xhr.open("GET", url);

    xhr.onreadystatechange = function(dump){
      if (this.readyState === 4) {
        var n = this.responseText.search('\\[ ');
        var res = this.responseText.substr(n, 7)
        res = res.replace('[', "");
        res = res.replace(' ', "");
        res = res.replace(']', "");
        res = res.replace('<', "");
        res = res.replace('>', "");
        //console.log(res);
        res = parseInt(res);
        res = (isNaN(res)) ? 0 : res ;
        document.getElementById(user).innerHTML = res + " Km/h";
        callback(null,res,user)
      }
    }
    xhr.send(body);
}

function parse(arrayUser){
    var arrPromise = [];

    for (i = 0; i < arrayUser.length; i++) {
        const lambdapromisificado = new Promise(function(resolve, reject) {
            
            peticion(arrayUser[i],function(err,puntos,participante){
                objRanking[participante] = puntos;
                max = (parseInt(puntos) > max) ? puntos : max;
                
            resolve();  
            });
        
        });//promise
    arrPromise.push(lambdapromisificado);
    }//

    Promise.all(arrPromise).then(function() {
        for (i = 0; i < arrayUser.length; i++) {
            
            var puntos = parseInt(objRanking[arrayUser[i]]);

            var vh = 80 - ( puntos * 80 ) / max ;
            
            vh = (isNaN(vh)) ? 80 : vh;
            console.log(vh);

            document.getElementById(arrayUser[i]+"-col").setAttribute("style", "padding-top: "+vh+"vh;");
        }//for

        
        console.log("Yeaaa " + max);
    });

}

parse(arrayUser);