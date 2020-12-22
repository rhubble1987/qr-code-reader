const qrCode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const btnScanQR = document.getElementById("btn-scan-qr");
const startRouteBtn = document.getElementById("start-route");
const allCheckedInEl = document.getElementById("all-checked-in");

let checkedInOrders = 0;



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
    `<h5>${orders[h].lastName}, ${orders[h].firstName}  <span class="order-status" data-order-id="${orders[h].id}">${orders[h].display}</span></h5>
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

  function allCheckedIn() {
    btnScanQR.hidden = true;
    qrResult.hidden = true;
    allCheckedInEl.hidden = false;
  }

function pickUp(res) {
  let notAssigned = 0;
  for (i = 0; i < orders.length; i++) {
    if (res == orders[i].id && orders[i].status === 'not-picked-up') {
      orders[i].status = 'picked-up';
      orders[i].scannedResult = res;
      orders[i].display = '&#9989;';
      i = orders.length;
      checkedInOrders++;
      clearOrders();
      loadOrders();
      
      console.log(checkedInOrders);
      
    } else if (res == orders[i].id && orders[i].status === 'picked-up') {
      alert('You have already scanned this order.');
    } else {
      notAssigned++;
    }
}
  if (notAssigned === orders.length) {
    alert('This order is not assigned to you. Please return it to the pharmacy.');
  }
  if (checkedInOrders === orders.length) {
    allCheckedIn()
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

  

  
  
  
