var nations = JSON.parse(localStorage.getItem('nations')) || [];
console.log(nations);

window.onload = function(){
    style();
    setup();
    var center = {lat: nations.latlng[0], lng: nations.latlng[1]}
    console.log(center);
    var map = new Map(center, 4);

   

    map.addInfoWindow(center, '<p>' + "Country: " + nations.name + '</p>' +
                              "<p>Population: " + nations.population + '</p>' +
                              "<p>Capital: " + nations.capital + '</p>')
    }




    var style = function(){
      var body = document.querySelector('body')
      var text = document.querySelector('ul')
      var heading = document.querySelector('h1')
      body.style.backgroundColor = '#a2c19f';
      body.style.backgroundImage = "url('http://239magazine.com/wp-content/uploads/2016/04/earth.jpg')";
      text.style.backgroundColor = '#92D8EE'
      text.style.color = '#04151b'
      text.style.display = 'inline-block'
      text.style.borderRadius = '10px'
      text.style.padding = '10px'
      text.style.align = 'center'
      heading.style.backgroundColor = '#92D8EE'
      heading.style.color = '#04151b'
      heading.style.display = 'block'
      heading.style.borderRadius = '10px'
      heading.style.textAlign = 'center'


    }

    var setup = function(){
              var ul = document.getElementById('country-list')
              p = document.createElement('p')
              p.innerText = "The last Country searched was: \n " + nations.name + "\n" +
                            "Population: " + nations.population + "\n" +
                            "Capital: " + nations.capital
              ul.appendChild(p)
              countrySelector();
              }

var countrySelector = function(){
  var url = "https://restcountries.eu/rest/v1"
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.onload = function(){
    if(request.status === 200){
      console.log("got the data");
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);
      var ul = document.getElementById('country-list')      
      var form = document.createElement('form')
      var dropDown = document.createElement('select'  )
      var p = document.createElement('p')
      
      dropDown.onchange = function(){
        for(var country of countries){
        if(country.name === dropDown.value){

          p.innerText = ("Country: " + country.name +"\n" +
                        "Capital: " + country.capital +"\n" +
                        "Population: " + country.population)
          

             localStorage.setItem('nations', JSON.stringify(country))
             var center = {lat: country.latlng[0], lng: country.latlng[1]}
             console.log(center);
             var map = new Map(center, 4);
             map.addInfoWindow(center, '<p>' + "Country: " + country.name + '</p>' +
                              "<p>Population: " + country.population + '</p>' +
                              "<p>Capital: " + country.capital + '</p>')
        }      
        }

          ul.appendChild(p)
          
      }
         for (var country of countries)
         {
          var option = document.createElement('option')
          option.innerText = country.name         
          dropDown.appendChild(option);        
          }
      form.appendChild(dropDown);
      ul.appendChild(form);   
    }

  }
       request.send(null);
}







