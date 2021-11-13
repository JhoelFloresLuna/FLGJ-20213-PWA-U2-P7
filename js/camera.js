class Camera {

    constructor(videoNode) {
        this.videoNode = videoNode;
        this.stream = null;
        this.photo = null;
        this.alt = "";
        console.log('Creamos new camera :D')
    }

    

    on() {

        if (navigator.mediaDevices) {
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode:'user'

                }
            }).then(stream => {
               // console.log( this.videoNode.srcObject );
                this.alt='Frontal'
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true
            }).catch(err => {
               // alert('Oups ocurrio un error al abrir la cámara');
                console.log(err);
                return false
            });
        } else {
            alert('No cuentas con dispositivos multimedia');
            return false
        }

    }

    onBack() {
        if (navigator.mediaDevices) {
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode:{
                        exact:'environment'
                    }
                }
            }).then(stream => {
               // console.log({stream});
               this.alt='Trasera'
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true
            }).catch(err => {
                //alert('Oups ocurrio un error al abrir la cámara');
                console.log(err);
                return false
            });
        } else {
            alert('No cuentas con dispositivos multimedia');
            return false
        }

    }

    off() {
        if (this.videoNode) {
           
            this.videoNode.pause();
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
    }

    takePhoto() {
        //console.log(this.alt);
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 300)
        canvas.setAttribute('height', 300)
        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
        this.photo = context.canvas.toDataURL();
        canvas = null;
        context = null;
        this.videoNode.removeAttribute('src');
        this.videoNode.load();
        const tipo = this.alt
        const foto = this.photo
        this.alt=''
        return [foto,tipo] ;
    }
}