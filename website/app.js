/* Global Variables */
const apiKey = "&appid=aaf40568612e33b989a66428df30fcc2&units=metric"
const apiUrl = "http://127.0.0.1:4000"
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip="


// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+1+ + '.' + d.getDate() + '.' + d.getFullYear();

generate.addEventListener('click', Action)
function Action(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    getWeather(baseUrl, zipCode, apiKey)
    .then(function(data){
        console.log(data);
        //post
        postData('/addData', {date:newDate, temp:data.main.temp, content:feelings})
        updateUI();
    })

};

const getWeather = async ( baseUrl, zip, key)=>{
    const res = await fetch(baseUrl+zip+key)
    try{
        const data = await res.json();
        return data;
    }catch(catchError){
        console.log("error", catchError)
    }
}
 //post

 const postData = async (url = '', data = {} )=>{
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials:  'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        });
        try{
            const newDate = await response.json()
            console.log(newDate)
            return newDate
        }catch(catchError){
            console.log("error", catchError )
        }
    }

 //update
const updateUI = async () =>{
    const request = await fetch('/getAll')
    try{
        const allData = await request.json()
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`
        document.getElementById('temp').innerHTML = `temperature: ${allData[0].temp}`
        document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`

    }catch(catchError){
        console.log("error", catchError)
    }
}