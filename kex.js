

  function matchIngredient(i, xhr, word, pre){ 
    var split = word.split(" ");
    split.push("");
    xhr.open('GET', 'http://lcafdb.org/api/ingredients?search=' + split[0], true);  
    xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText); 
      if (split[1] == ""){
        getCarbonEmission(i, xhr, response.ingredients["0"].id, pre, word);
      }
      else {
        for (var j = 0; j < response.ingredients.length; j ++){
          if(response.ingredients[""+j+""].name == word){
            getCarbonEmission(i, xhr, response.ingredients[""+j+""].id, pre, word);
          }
          else {
            pre = split[0] + " ";
            matchIngredient(i, xhr, split[1], pre);
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
  function getCarbonEmission(i, xhr, id, pre, word){
    xhr.open('GET', 'http://lcafdb.org/api/func/calculate?ingredient='+id+'&amount=1000&unit=gram', true);
    xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      var response = JSON.parse(xhr.responseText); 
  
      var carbon = Math.log2(response.carbon.average/1000)*4+13
      if (carbon < 8){
        var final =  "<span style ='font-size:" + (8).toString() + "pt'>" + pre + word + "</span>"; //Funkar även med pt istället för %
      }
      else{
        var final =  "<span style ='font-size:" + (carbon).toString() + "pt'>" + pre + word + "</span>"; //Funkar även med pt istället för %        
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
          var pre = "";
          matchIngredient(i, xhrArr[i], ingredient, pre);
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


