// this is working code as of Tue Feb 5 2019
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '225520310948648',
      autoLogAppEvents: true,
      xfbml: false,
      version: 'v4.0'
    });
  function init() {

    FB.api(
      '/charlotteone/events',
      'GET',
      {
        "access_token": "EAADNHAoGEygBAHjOCcaVVrWxZBheeDPQe1DPq9iP9yv8F0uEJU4ZCC2taAkN4jnp7gDnjABn7oRL9owdsYY73XhRMh5nDvfIlJ4xO0JrP7zGXEfZB0txdBqLKiAYcXz1FCkUbVZAc41SqDyPpJHaaF3KlBr1fZAZBvgJvyH6u5S32TZCP0BZBoKV",
        "fields": "eventsname,description,end_time,start_time,place{name,location{city,state,street,zip}}",
        "limit": 20,
        "since": 1546299013,


      },
      function (response) {
        $res = response.data;
        let t = $('template');
        let time = { 'hour': '2-digit', 'minute': '2-digit' };
        let optionsMonth = ([], { 'month': '2-digit' });
        let optionsDay = ([], { 'day': '2-digit' });
        for (let item of $res) {
          let endTime = item.end_time;
          endTime = new Date(endTime);
          let date = item.start_time;
          date = new Date(date);
          let month = date.toLocaleDateString('en-US', optionsMonth);
          let day = date.toLocaleDateString('en-US', optionsDay);
          let description = item.description;
          let startTime = date.toLocaleString('en-US', time);
          endTime = endTime.toLocaleString('en-US', time);
          let locationName = item.place.name;
          let locations = item.place.loacation;
          const city = ((item.place || {}).location || {}).city;
          const state = ((item.place || {}).location || {}).state;
          const zip = ((item.place || {}).location || {}).zip;
          const street = ((item.place || {}).location || {}).street;
          t[0].content.querySelector('#eventLink').href = "https://facebook.com/events/" + item.id;
          t[0].content.querySelector('#scroller-title').innerText = month + "." + day;
          t[0].content.querySelector('#scroller-subtitle').innerText = locationName;
          t[0].content.querySelector('#street').innerText = street;
          t[0].content.querySelector('#cityStateZip').innerText = city + " " + state + ", " + zip;
          t[0].content.querySelector('#eventTime').innerText = startTime + " - " + endTime;
          $('#scroller').append(t[0].innerHTML);
        };
        // animation script
        let controller = new ScrollMagic.Controller();
        $('.itemcontainer').each(function () {
          tween = TweenMax.to(this, 1, { className: "-=out-focus", repeat: 1, yoyo: true });
          scene = new ScrollMagic.Scene({
            triggerElement: this.previousElementSibling,
            duration: this.scrollHeight * 2
          })
            .setTween(tween)
            // .addIndicators() // uncomment to show indicators for debugging
            .update(true)
            .addTo(controller);
        });
        $('.scroller-text-div').each(function () {
          tween = TweenMax.to(this, 1, { className: "-=out-focus", repeat: 1, yoyo: true });
          scene = new ScrollMagic.Scene({
            triggerElement: this.parentElement.parentElement.previousElementSibling,
            duration: this.parentElement.parentElement.scrollHeight * 3
          })
            .setTween(tween)
            //.addIndicators()
            .addTo(controller);
        });
        // scroll down the page 50% on pageLoad
        $(document).ready(function () {
          $("html,body").scrollTop($(document).height() * 0.2);
        });
      }
    );
}init();

};
(function(d, s, id){
    let js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
  <script>
  </script>
