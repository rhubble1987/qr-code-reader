const qrCode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

const orders = [
{
  id: 3658273,
  firstName: 'Luke',
  lastName: 'Skywalker',
  status: 'not-picked-up'
},
{
  id: 2389425,
  firstName: 'Leia',
  lastName: 'Organa',
  status: 'not-picked-up'
},
{
  id: 2350325,
  firstName: 'Han',
  lastName: 'Solo',
  status: 'not-picked-up'
},
{
  id: 2230632,
  firstName: 'Darth',
  lastName: 'Vader',
  status: 'not-picked-up'
},
];

window.onload = () => {
  for (i = 0; i < orders.length; i++) {
    qrResult.insertAdjacentHTML('afterbegin', 
    `
    <h5>${orders[i].lastName}, ${orders[i].firstName}<span class="order-status" data-order-id="${orders[i].id}"></span></h5>
    <h6>${orders[i].id}</h6>
    <hr>
    `);
  }
}

function pickUp() {
  for (i = 0; i < orders.length; i++) {
    let statusElement = document.getElementsByClassName('order-status');
    if (res == orders[i].id) {
      orders[i].status = 'picked-up'
      for (j = 0; j < orders.length; j++) {
        if (orders[i].id == statusElement.getAttribute('data-order-id')) {
          this.statusElement.innerText = '&#9989;';
          j = orders.length;
        }
      }
      i = orders.length;  
    } 
    if (i == orders.length && res !== orders[i].id) {
      alert('This order is not assigned to you. Please return it to the pharmacy.');
    }
    }
   for (i = 0; i < orders.length; i++) {
     if (orders[i].status === 'not-picked-up') {
       i = orders.length;
     } else {
       const startRouteButton = document.getElementById('start-route');
       startRouteButton.setAttribute('style','display: initial;');
     }
   } 
  }

let scanning = false;

qrCode.callback = (res) => {
    if (res) {
      outputData.innerText = res;
      scanning = false;
      
  
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
  
      qrResult.hidden = false;
      btnScanQR.hidden = false;
      canvasElement.hidden = true;
      pickUp();
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
  
  