const qrCode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
//const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const startRouteBtn = document.getElementById("start-route");
const allCheckedInEl = document.getElementById("all-checked-in");

const orders = [
{
  id: 3658273,
  firstName: 'Luke',
  lastName: 'Skywalker',
  status: 'not-picked-up',
  scannedResult: "",
  display: ""

},
{
  id: 2389425,
  firstName: 'Leia',
  lastName: 'Organa',
  status: 'not-picked-up',
  scannedResult: "",
  display: ""
},
{
  id: 2350325,
  firstName: 'Han',
  lastName: 'Solo',
  status: 'not-picked-up',
  scannedResult: "",
  display: ""
},
{
  id: 2230632,
  firstName: 'Darth',
  lastName: 'Vader',
  status: 'not-picked-up',
  scannedResult: "",
  display: ""
},
];



function loadOrders() {
  for (h = 0; h < orders.length; h++) {
    qrResult.insertAdjacentHTML('afterbegin', 
    `
    <h5>${orders[h].lastName}, ${orders[h].firstName}  <span class="order-status" data-order-id="${orders[h].id}">${orders[h].display}</span></h5>
    <hr>
    `);
  }
}


window.onload = () => {
  loadOrders();
}


function clearOrders() {
  let currentOrders = document.getElementById("qr-result");
  while (currentOrders.firstChild) {
  currentOrders.removeChild(currentOrders.firstChild);
}
}

function pickUp(res) {
  let notAssigned = 0;
  for (i = 0; i < orders.length; i++) {
    if (res == orders[i].id) {
      orders[i].status = 'picked-up';
      orders[i].scannedResult = res;
      orders[i].display = '&#9989;';
      i = orders.length;
      clearOrders();
      loadOrders();
    } else {
      notAssigned++;
    }
}
  if (notAssigned === orders.length) {
    alert('This order is not assigned to you. Please return it to the pharmacy.');
  }
}

//function pickUp(res) {
  //const assignedOrder = orders.status.includes(res);
  /* const assignedOrder = orders[i].id.includes(res);
  console.log(assignedOrder); */
  /* for (i = 0; i < 0; i++) { 
    console.log(orders[i].id);
    if (res == orders[i].id) {
      orders[i].status = 'picked-up';
      orders[i].display = '&#9989;';
      i = orders.length;
      } else {
        alert('This order is not assigned to you. Please return it to the pharmacy.');
      }
      
    }
      clearOrders();
      updateOrders();
      allPickedUp(); 
  } */
    

/* function updateStatus() {
  const statusElement = document.getElementsByClassName('order-status').getAttribute('data-order-id');
  console.log(statusElement);
  for (i = 0; i < orders.length; i++) {
    if (orders[i].id == statusId) {
      i = orders.length;
      this.statusElement.innerText = '&#x2705;';
      console.log(this.statusElement.innerText);
    }
  }
}    */ 

//This function checks to see if all orders have been picked up
function allPickedUp() { 
  let ordersCheckedIn = 0;
  for (k = 0; k < orders.length; k++) {
    if (orders[k].status === 'picked up') {
      ordersCheckedIn++;
    }
  }
  if (ordersCheckedIn === orders.length) {
    btnScanQR.setAttribute('style','display: none');
    qrResult.setAttribute('style','display: none;');
    allPickedUp.setAttribute('style','display: initial;');
  
  }
} 
    

let scanning = false;

qrCode.callback = (res) => {
    if (res) {
      //outputData.innerText = res;
      scanning = false;
      
  
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
      console.log(res);
      qrResult.hidden = false;
      btnScanQR.hidden = false;
      canvasElement.hidden = true;
      pickUp(res);
    }
  };

  btnScanQR.onclick = (event) => {
  event.preventDefault();
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });

}

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
  }

  function scan() {
    try {
      qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
  }

  
  
