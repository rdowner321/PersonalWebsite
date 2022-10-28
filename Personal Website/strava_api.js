
const auth_link = "https://www.strava.com/oauth/token"

function getActivites(res){

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){

            var map = L.map('map').setView([34.145, -118.185], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            for(var x=0; x<data.length; x++){

                console.log(data[x].map.summary_polyline)
                var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
                console.log(coordinates)

                L.polyline(

                    coordinates,
                    {
                        color:"black",
                        weight:5,
                        opacity:.7,
                        lineJoin:'round'
                    }

                ).addTo(map)
            }

        }
        )
}

    
function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            client_id: '63882',
            client_secret: '30062c20f648fe9bd47fcb25a7194fe4104d103e',
            refresh_token: '3a364e317804116a2dcb64d85e2bbd97184556a2',
            grant_type: 'refresh_token'
        })
    }).then(res => res.json())
     .then(res => getActivites(res))  
}

reAuthorize()