import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getDatabase, ref, onValue,get, push, update, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import { getFirestore, collection, getDoc, addDoc, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyC0KeezZB68slMRpvCWTOErT0ndCBx4iJk",
    authDomain: "dht-home-b0439.firebaseapp.com",
    databaseURL: "https://dht-home-b0439-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dht-home-b0439",
    storageBucket: "dht-home-b0439.appspot.com",
    messagingSenderId: "1030501109314",
    appId: "1:1030501109314:web:adef68673277eb03c6e7db",
    measurementId: "G-2Z930YPYD2"
};


const maxSize = 12


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const rtdb = getDatabase(app)

const sensorRef = ref(rtdb,'Sensor')

const docRef = doc(db, "home", "sensor");

const docSnap = await getDoc(docRef);



// let btn = document.getElementById('btn')

// btn.addEventListener('click',() => {
//   let buffer = {}

//   buffer.temperature = 43
//   buffer.humidity = 90
//   buffer.created = new Date()

//   // console.log(buffer)

//   updateDoc(docRef, {
//     data: arrayUnion(buffer)
//   })
// })

if (docSnap.exists()) {
  console.log(JSON.stringify(docSnap.data()));
} else {
    // doc.data() will be undefined in this case
  console.log("No such document!");
}


const labels = ['Jan','Feb','Mar','April','May','June']

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "TRest",
//       backgroundColor: 'red',
//       borderColor: 'red',
//       data: [0,27,15,32,11,69,73],
//     },
//     {
//       label: "Humid",
//       backgroundColor: 'blue',
//       borderColor: 'blue',
//       data: [0,27,15,32,82,69,79],
//     }
//   ]
// }

// let config = {
//   type: 'line',
//   data: data,
// }





const canvas = document.getElementById('canvas')

// const chart = new Chart(canvas,config)

let chart = new Chart(canvas, {
  type: 'line',
  data: {
      labels: labels,
      datasets: [{
          label: 'Nhiệt độ',
          data: [27,15,32,11,69,73],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
      },
      {
        label: 'Độ ẩm',
        data: [32,45,32,12,55,38],
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1

      }
    ]
  },
  options: {
      scales: {
          yAxes: [{
            override: {
              stepWidth: 20,
              start: 0,
              steps: 10
            },
              display: true,
              ticks: {
                  beginAtZero: true,
                  max: 100,
                  suggestedMin: 0,
          }
      }]
      }
  }
  });

function addData(chart, label, data) {
  // console.log(1000)
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    console.log(data)
      if (dataset.label == 'Nhiệt độ') {
          dataset.data.push(data.Temperature);
      }
      else {
        dataset.data.push(data.Humidity);
      }
      console.log('dataset: ',dataset.data)
      console.log(dataset.label)
      if (dataset.data.length == 12) {
        removeData(chart)
      }
      else {
        chart.update()
      } 
  });
  // chart.update();
  
}

function removeData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
  });
  // console.log(chart.datasets.data)
  chart.update();
}

// function addData(chart, label, data) {
//   console.log(label)
//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//       dataset.data.push(data);
//   });
//   chart.update();
// }

onValue(sensorRef,(snapshoot) => {
  if (snapshoot.exists()) {
      const sensorVal = snapshoot.val()
      console.log('sensor: ',sensorVal)
      const d = new Date()
      const time = `${d.getHours()}:${d.getMinutes()}`
      addData(chart,time,sensorVal)
  }
})