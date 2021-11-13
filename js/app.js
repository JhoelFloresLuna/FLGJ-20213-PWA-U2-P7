if(navigator.serviceWorker){
    let url=''
    const BASE_URL=window.location.href
    BASE_URL.startsWith('https:')?url='/FLGJ-20213-PWA-U2-P7/sw.js':url="/sw.js"
    navigator.serviceWorker.register(url)
    
}

let player = $("#player");
let photoUser = $("#photoUser");

let btnCamera = $("#btnCamera");
let btnCameraBack = $("#btnCameraBack");
let btnTakePhoto = $("#btnTakePhoto");

const camera = new Camera(player[0]);

btnCamera.on("click", () => {
  camera.on().then((result) => {
    if (!result) {
      //alert("Error al iniciar la cámara");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifica que la cámara este encendia',
      })
    }
  });
});

btnCameraBack.on("click", () => {
  console.log("camara back");
  camera.onBack().then((result) => {
    if (!result) {
      //alert("Error al iniciar la cámara");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifica que la cámara este encendia',
      })
    }
  });
});

btnTakePhoto.on("click", async() => {

    camera.off();
    const [foto, tipo] = camera.takePhoto();
    const card = `
      <div class="m-2 card mt-5">
              <img class="card-img-top"
                  src="${foto}"
                  alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">${tipo}</h5>
              </div>
          </div>
      `;
      $("#photoContainer").append(card);
  
  //photoUser.attr('src',camera.takePhoto());
});


  