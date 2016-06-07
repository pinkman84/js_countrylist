var nation = JSON.parse(localStorage.getItem('nation')) || [];
var form = document.createElement('form')
var dropdown = document.createElement('select')


window.onload = function(){
 setup();
   }

 var setup = function(){
   var ul = document.getElementById('country-list')
   p = document.createElement('p')
   p.innerText = "Country: " + nation.name + "\n" +
                 "Population: " + nation.population + "\n" +
                 "Capital: " + nation.capital
   ul.appendChild(p)
   countrySelector();
   }

   var countrySelector = function(){
     var url = "https://restcountries.eu/rest/v1";
     var request = new XMLHttpRequest();
     request.open('GET', url);
     request.onload = function(){
     if (request.status === 200){
       console.log('got the data');
       var jsonString = request.responseText;
       var countries = JSON.parse(jsonString);
       var ul = document.getElementById('country-list')


   dropdown.onchange = function() {
       nationChanger();
     }
     var nationChanger =  function(){        
       for (var country of countries){
         if (country.name === dropdown.value){
           localStorage.setItem('nation', JSON.stringify(country))
         p.innerText = "Country: " + country.name + "\n" +
                       "Population: " + country.population + "\n" +
                       "Capital: " + country.capital
       }  
     }
   }

   var changeP = function(){
     console.log(nation)
   }



     for (var country of countries){ 
     var option = document.createElement('option')
     option.innerText = country.name
     dropdown.appendChild(option);
       }
     
     

     form.appendChild(dropdown) 
     ul.appendChild(form)
   }
 }
 request.send(null);
}