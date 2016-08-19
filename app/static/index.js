 function getCredentials(cb) {
     var data = {
         'grant_type': 'client_credentials',
         'client_id': CLIENT_ID,
         'client_secret': CLIENT_SECRET
     };
     var url = 'https://api.clarifai.com/v1/token';
     return axios.post(url, data, {
         'transformRequest': [

             function() {
                 return transformDataToParams(data);
             }
         ]
     }).then(function(r) {
         localStorage.setItem('accessToken', r.data.access_token);
         localStorage.setItem('tokenTimestamp', Math.floor(Date.now() /
             1000));
         cb();
     }, function(err) {
         console.log(err);
     });
 }

 function transformDataToParams(data) {
     var str = [];
     for (var p in data) {
         if (data.hasOwnProperty(p) && data[p]) {
             if (typeof data[p] === 'string') {
                 str.push(encodeURIComponent(p) + '=' + encodeURIComponent(
                     data[p]));
             }
             if (typeof data[p] === 'object') {
                 for (var i in data[p]) {
                     str.push(encodeURIComponent(p) + '=' +
                         encodeURIComponent(data[p][i]));
                 }
             }
         }
     }
     return str.join('&');
 }

 function postImage(imgurl) {
     console.log("Posting Image");
     var accessToken = localStorage.getItem('accessToken');
     var data = {
         'url': imgurl
     };
     var url = 'https://api.clarifai.com/v1/tag';
     return axios.post(url, data, {
         'headers': {
             'Authorization': 'Bearer ' + accessToken
         }
     }).then(function(r) {
         parseResponse(r.data);
     }, function(err) {
         console.log('Sorry, something is wrong: ' + err);
     });
 }

 function parseResponse(resp) {
     var tags = [];
     if (resp.status_code === 'OK') {
         var results = resp.results;
         tags = results[0].result.tag.classes;
     } else {
         console.log('Sorry, something is wrong.');
     }
     document.getElementById('tags').innerHTML = tags.toString().replace(
         /,/g, ', ');
     return tags;
 }

 function run2(imgurl) {
     console.log("hi");
     if (Math.floor(Date.now() / 1000) - localStorage.getItem(
         'tokenTimeStamp') > 86400 || localStorage.getItem(
         'accessToken') === null) {
         console.log("sup");
         getCredentials(function() {
             console.log("whats going on");
             postImage(imgurl);
         });
     } else {
         console.log("yo");
         postImage(imgurl);
     }
 }

 function run(imgurl) {
         axios.get("/model?imgUrl=" + imgurl).then(function(result) {
             // debugging section
             console.log(result)
             console.log(result["data"].length)
             console.log(result["data"][0])
                 /////////////////////////////
             $("#imgb").attr("src", imgurl);
             var list = "";
             var len = result["data"].length
             $("#taglist").empty();
             for (i = 0; i < len; i++) {
                 list += "<li>" + result["data"][i] + "</li>";
             }
             $("#taglist").append(list);
             $("#taglist").hide().fadeIn(3000);
         })
     }
     /* Menu Animations */
 $(document).ready(function() {
     var active1 = false;
     var active2 = false;
     var active3 = false;
     var active4 = false;
     $('.menu').on('mousedown touchstart', function() {
         if (!active1) $(this).find('.team').css({
             'background-color': 'gray',
             'transform': 'translate(0px,125px)'
         });
         else $(this).find('.team').css({
             'background-color': 'dimGray',
             'transform': 'none'
         });
         if (!active2) $(this).find('.info').css({
             'background-color': 'gray',
             'transform': 'translate(60px,105px)'
         });
         else $(this).find('.info').css({
             'background-color': 'darkGray',
             'transform': 'none'
         });
         if (!active3) $(this).find('.camera').css({
             'background-color': 'gray',
             'transform': 'translate(105px,60px)'
         });
         else $(this).find('.camera').css({
             'background-color': 'silver',
             'transform': 'none'
         });
         if (!active4) $(this).find('.api').css({
             'background-color': 'gray',
             'transform': 'translate(125px,0px)'
         });
         else $(this).find('.api').css({
             'background-color': 'silver',
             'transform': 'none'
         });
         active1 = !active1;
         active2 = !active2;
         active3 = !active3;
         active4 = !active4;
     });
 

 /* Scrolling Animations */
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});
 });
