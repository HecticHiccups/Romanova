function getCredentials(cb) {
    var data = {
        'grant_type': 'client_credentials'
        , 'client_id': CLIENT_ID
        , 'client_secret': CLIENT_SECRET
    };
    var url = 'https://api.clarifai.com/v1/token';

    return axios.post(url, data, {
        'transformRequest': [
      function () {
                return transformDataToParams(data);
      }
    ]
    }).then(function (r) {
        localStorage.setItem('accessToken', r.data.access_token);
        localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
        cb();
    }, function (err) {
        console.log(err);
    });
}

function transformDataToParams(data) {
    var str = [];
    for (var p in data) {
        if (data.hasOwnProperty(p) && data[p]) {
            if (typeof data[p] === 'string') {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
            }
            if (typeof data[p] === 'object') {
                for (var i in data[p]) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p][i]));
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
    }).then(function (r) {

        parseResponse(r.data);
    }, function (err) {
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
  document.getElementById('tags').innerHTML = tags.toString().replace(/,/g, ', ');
  return tags;
}


function run(imgurl) {
    console.log("hi");
    if (Math.floor(Date.now() / 1000) - localStorage.getItem('tokenTimeStamp') > 86400 || localStorage.getItem('accessToken') === null) {
        console.log("sup");
        getCredentials (function() {
            console.log("whats going on");
            postImage(imgurl);
        });
    } else {
        console.log("yo");
        postImage(imgurl);

    }
}

function run2(imgurl) {
    axios.get("/model?imgUrl="+imgurl)
    .then(function(str) {
        console.log(str)
        // a, b, c
        // [a,b,c]
        // {tags:[a,b,c]}
        str.split(',')

$(document).ready(function(){
        var list = "";
        for(i=0; i<games.length; i++){
        list +="<li>"+games[i]+"</li>";
        }
    $("#taglist").append(list);

});


    })
}