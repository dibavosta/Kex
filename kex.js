

// FUNKAR PÅ TASTELINE (I DERAS RECEPT INNEHÅLLSFÖRTECKNING)
//WITH XMLHTTP ARRAY

function matchIngredient(i, j, xhr, word){ 
  xhr.open('GET', 'http://lcafdb.org/api/ingredients?search=' + word, true);  
  xhr.onreadystatechange = function(){
  if (xhr.readyState === 4 && xhr.status === 200){
    var response = JSON.parse(xhr.responseText); 
    getCarbonEmission(i, j, xhr, response.ingredients["0"].id, word);
   }
  else if (xhr.status === 404){
    console.log("Not in db!");
    word = "<span style ='font-size:10pt'>" + word + "</span>";
    writeItOut(word, i, j);
  }
  }
  xhr.send();
}

function getCarbonEmission(i, j, xhr, id, word){
  xhr.open('GET', 'http://lcafdb.org/api/func/calculate?ingredient='+id+'&amount=1000&unit=gram', true);
  xhr.onreadystatechange = function(){
  if (xhr.readyState == 4){
    var response = JSON.parse(xhr.responseText); 
    var final =  "<span style ='font-size:" + (response.carbon.average/100).toString() + "pt'>" + word + "</span>"; //Funkar även med pt istället för %
    console.log(final);
    writeItOut(final, i, j);
    }
  }
  xhr.send();
}

var xhrArr = new Array();
function setUp(){

  var all = document.getElementsByClassName("ingredient");
  for (var i=0; i < all.length; i++) {
    if (all[i].innerHTML != ""){
      var split = all[i].textContent.split(" ");
      all[i].innerHTML = "";
      for (var j = 0; j < split.length; j++){
        xhrArr[j] = createXMLHTTPrequest();
        console.log("word: " + split[j]);        
        if (xhrArr[j].readyState==0 || xhrArr[j].readyState==4){
          matchIngredient(i , j, xhrArr[j], split[j]);
        }
      }
    }    
  }
}

function writeItOut(text, i, j){
  var all = document.getElementsByClassName("ingredient");
  for (var k=i; k <= i; k++) {
    var split = all[k].textContent.split(" ");
    for (var l = j; l <= j; l++){
      split[j] = text;
    }
    var previous = all[i].innerHTML;
    all[i].innerHTML = previous+" "+text;
  }
}
function createXMLHTTPrequest(){
  var xmlHttp;
  try{
    xmlHttp = new XMLHttpRequest();
  }
  catch(e){
    xmlHttp = false;
  }
  if (!xmlHttp){
    alert('Could not connect to server');
  }
  else{
    return xmlHttp;
  }
}


// TESTAR MED TVÅ ORD

  function matchIngredient(i, xhr, word){ 
    var split = word.split(" ");
    split.push("");
    xhr.open('GET', 'http://lcafdb.org/api/ingredients?search=' + split[0], true);  
    xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText); 
      if (split[1] == ""){
        getCarbonEmission(i, xhr, response.ingredients["0"].id, word);
      }
      else{
        for (var j = 0; j < response.ingredients.length; j ++){
          if(response.ingredients[""+j+""].name = word){
            getCarbonEmission(i, xhr, response.ingredients[""+j+""].id, word);
          }
        }
      }
    }
    else if (xhr.status === 404){
      word = "<span style ='font-size:10pt'>" + word + "</span>";
      writeItOut(word, i);
    }
    }
    xhr.send();
  }
  function getCarbonEmission(i, xhr, id, word){
    xhr.open('GET', 'http://lcafdb.org/api/func/calculate?ingredient='+id+'&amount=1000&unit=gram', true);
    xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      var response = JSON.parse(xhr.responseText); 
  
      var carbon = Math.log2(response.carbon.average/1000)*4+13
      if (carbon < 8){
        var final =  "<span style ='font-size:" + (8).toString() + "pt'>" + word + "</span>"; //Funkar även med pt istället för %
      }
      else{
        var final =  "<span style ='font-size:" + (carbon).toString() + "pt'>" + word + "</span>"; //Funkar även med pt istället för %        
      }
      writeItOut(final, i);
      }
    }
    xhr.send();
  }

  var xhrArr = new Array();
  function setUp(){

    var all = document.getElementsByClassName("ingredient");
    for (var i=0; i < all.length; i++) {
      if (all[i].innerHTML != ""){
        var ingredient = all[i].textContent;
        //all[i].innerHTML = "";
        xhrArr[i] = createXMLHTTPrequest();
        if (xhrArr[i].readyState==0 || xhrArr[i].readyState==4){
          matchIngredient(i, xhrArr[i], ingredient);
        }
      }    
    }
  }

  function writeItOut(text, i){
    var all = document.getElementsByClassName("ingredient");
    //var previous = all[i].innerHTML;
    all[i].innerHTML = text;
  }
  function createXMLHTTPrequest(){
    var xmlHttp;
    try{
      xmlHttp = new XMLHttpRequest();
    }
    catch(e){
      xmlHttp = false;
    }
    if (!xmlHttp){
      alert('Could not connect to server');
    }
    else{
      return xmlHttp;
    }
  }




//FUNKAR!!
var all = document.getElementsByClassName("ingredient");
  for (var i=0; i < all.length; i++) {
    if (all[i].innerHTML != ""){
      var split = all[i].textContent.split(" ");
    }
all[i].innerHTML = "<span style ='font-size:" + (16).toString() + "pt'>" + split[0] + "</span>";
  }


