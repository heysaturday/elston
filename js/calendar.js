function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
window.fbAsyncInit = function () {
  FB.init({
    appId: '225520310948648',
    autoLogAppEvents: true,
    xfbml: false,
    version: 'v4.0'
  });

  function init() {

    FB.api(
      '/shopelston/events',
      'GET',
      {
        "access_token": "EAADNHAoGEygBAHjOCcaVVrWxZBheeDPQe1DPq9iP9yv8F0uEJU4ZCC2taAkN4jnp7gDnjABn7oRL9owdsYY73XhRMh5nDvfIlJ4xO0JrP7zGXEfZB0txdBqLKiAYcXz1FCkUbVZAc41SqDyPpJHaaF3KlBr1fZAZBvgJvyH6u5S32TZCP0BZBoKV",
        "fields": "name,description,end_time,start_time,place{name,location{city,state,street,zip}}",
        "limit": 10,
        "since": 1546300800,
      },
      function (response) {
        $res = response.data;
        var smallData = $res.map(function (d, i) {
          var test = d.place.name.split(", ").join('+');
          var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${test}&key=AIzaSyDiXQPfyj47BHkymbwDL_bIl9WMW6vB5-U`;
          var geoCode = JSON.parse(httpGet(geoUrl))
          var googleAddress = geoCode.results[0].address_components;
          var mapedArrs = googleAddress.map(function (d, i) {

            return {
              [d.types[0]]: d.short_name
            }
          });
          var maped = {};
          for (item of mapedArrs) {
            Object.assign(maped, item)
          };
          let t = $('template');
          let time = { 'hour': '2-digit', 'minute': '2-digit' };
          let optionsMonth = ([], { 'month': '2-digit' });
          let optionsDay = ([], { 'day': '2-digit' });
          let datestr = d.start_time.split(/[-T.]/);
          let date = new Date(datestr.slice(0, 3).join('/') + ' ' + datestr[3]);
          var locationName = d.place.name;

          if (d.place.location) {
            return {
              name: d.name,
              eventLink: `https://fb.com/events/${d.id}`,
              endTime: new Date(d.end_time).toLocaleString('en-US', time),
              month: date.toLocaleDateString('en-US', optionsMonth),
              day: date.toLocaleDateString('en-US', optionsDay),
              desription: d.description,
              startTime: date.toLocaleString('en-US', time),
              locationName: locationName,
              city: d.place.location.city,
              state: d.place.location.state,
              zip: d.place.location.zip,
              street: d.place.location.street,
            }

          } else {
            return {
              name: d.name,
              eventLink: `https://fb.com/events/${d.id}`,
              endTime: new Date(d.end_time).toLocaleString('en-US', time),
              month: date.toLocaleDateString('en-US', optionsMonth),
              day: date.toLocaleDateString('en-US', optionsDay),
              desription: d.description,
              startTime: date.toLocaleString('en-US', time),
              locationName: 'Location Address:',
              city: maped.locality,
              state: maped.administrative_area_level_1,
              zip: maped.postal_code,
              street: `${maped.street_number} ${maped.route}`,
            }

          }


        }); console.log(smallData);
        let t = $('template');
        let time = { 'hour': '2-digit', 'minute': '2-digit' };
        let optionsMonth = ([], { 'month': '2-digit' });
        let optionsDay = ([], { 'day': '2-digit' });
        for (let item of smallData) {
          t[0].content.querySelector('#eventLink').href = item.eventLink;
          t[0].content.querySelector('#scroller-title').innerText = item.month + '.' + item.day;
          t[0].content.querySelector('#scroller-subtitle').innerText = item.name;
          t[0].content.querySelector('#locationName').innerText = item.locationName;
          t[0].content.querySelector('#street').innerText = item.street;
          t[0].content.querySelector('#cityStateZip').innerText = item.city + " " + item.state + ", " + item.zip;
          t[0].content.querySelector('#eventTime').innerText = item.startTime + " - " + item.endTime;
          $('#scroller').append(t[0].innerHTML);
        };
        // animation script
        let controller = new ScrollMagic.Controller();
        $('.itemcontainer').each(function () {
          tween = TweenMax.to(this, 1, { className: "-=out-focus", repeat: 1, yoyo: true });
          scene = new ScrollMagic.Scene({
            triggerElement: this,
            duration: this.scrollHeight * 2.5,
            offset: "-150%"
          })
            .setTween(tween)
            // .addIndicators() // uncomment to show indicators for debugging
            .update(true)
            .addTo(controller);
        });
        $('.scroller-text-div').each(function () {
          tween = TweenMax.to(this, 1, { className: "-=out-focus", repeat: 1, yoyo: true });
          scene = new ScrollMagic.Scene({
            triggerElement: this.parentElement,
            duration: this.parentElement.scrollHeight * 2,
            offset: "-150%"
          })
            .setTween(tween)
            //.addIndicators()
            .addTo(controller);
        });
      }
    );
  } init();
};
(function (d, s, id) {
  let js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));