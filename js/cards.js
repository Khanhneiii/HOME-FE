import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getDatabase, ref, onValue,get, child, update, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

const RTDB = getDatabase(app)

const cardRef = ref(RTDB,'cards')

const dbRef = ref(RTDB)

let Table = document.getElementById('body')

let tableDiv = document.querySelector('.table')

let bodyDiv = document.getElementById('body-div')

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function deleteID() {
    console.log(typeof(this.id))
    get(cardRef).then((snapshot) => {
        if (snapshot.exists()) {
        //   console.log(typeof(snapshot.val()))

          let cards = snapshot.val()

        //   let quantity = Number(cards['quantity'])
            
          console.log(cards.id)

          cards.id = cards.id.filter(card => {
            return card.id != Number(this.id)
          })
          // cards.quantity--
          console.log(cards)
          update(dbRef,{
            cards
          })

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    // window.location.reload()
}

function editID() {
  // console.log(typeof(this.id))
  // get(cardRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //     //   console.log(typeof(snapshot.val()))

  //       let cards = snapshot.val().id

  //     //   let quantity = Number(cards['quantity'])
          


  //       cards.id = cards.id.filter(id => {
  //         if (id != Number(this.id)) {
  //             console.log('Edited')
  //         }
  //         return id != Number(this.id)
  //       })
  //       cards.quantity--
  //       console.log(cards)
  //       update(dbRef,{
  //         cards
  //       })

  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // // window.location.reload()
}

function createDeleteButton(id) {
    let deleteBTN = document.createElement('button')
    deleteBTN.setAttribute('class','delete-btn')
    deleteBTN.setAttribute('id',id)
    deleteBTN.textContent = 'Delete'
    deleteBTN.addEventListener('click',deleteID)

    return deleteBTN
}


function createEditButton(id) {
  let editBTN = document.createElement('button')
  editBTN.setAttribute('class','edit-btn')
  editBTN.setAttribute('id',id)
  editBTN.textContent = 'Edit'
  editBTN.addEventListener('click',editID)

  return editBTN
}

function addItemtoTable(obj) {
    let trow = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdID = document.createElement('td')
    let tdButton = document.createElement('td') 
    let deleteButton = createDeleteButton(obj.id)
    // let editButton = createEditButton(obj.id)
    tdButton.appendChild(deleteButton)
    // tdButton.appendChild(editButton)
    tdButton.setAttribute('class','TableButton')

    tdID.setAttribute('class','UID')
    tdName.setAttribute('class','Name')
    // tdID.setAttribute('class','Name')

    // td1.innerHTML = nums
    tdName.textContent = obj.name
    console.log("Name: ",obj.name)
    tdID.textContent = obj.id

    trow.appendChild(tdName)
    trow.appendChild(tdID)
    trow.appendChild(tdButton)
    // console.log(trow)
    Table.append(trow)
}


onValue(cardRef,(snapshoot) => {
    if (snapshoot.exists()) {
        const obj_arr = snapshoot.val()
        console.log(obj_arr)

        removeAllChildNodes(Table)

        // let quantity = obj['quantity']

        obj_arr.id.forEach(obj => {
          console.log(obj)
          addItemtoTable(obj)
        })

        // if (obj.quantity != 0) {
        //   obj.id.forEach(element => {
        //       // console.log(element)
        //       addItemtoTable(element)
        //   });
        // }
        // else {
        //   console.log('quantity: ',obj.quantity)
        //   tableDiv.style.appearance = 'none'
        // }
    }
})

