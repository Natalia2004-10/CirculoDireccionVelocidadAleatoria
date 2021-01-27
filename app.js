import {canvas, IMAGES as images} from './initialize.js'
// palabra "as" = importar algo de otro archivo con un nombre y en el archivo donde lo importo lo llamo de otro modo 
//import = importar 
import {ctx, drawObj, run, start, dT} from './initialize.js'
// el contexto se hace en otro archivo y se importa cuano se necesite 

//Creación del objeto balón
//PROPIEDADES > x,y,vX,vY, r, imagen
//METODOS> dibujarse --> que el balón sepa como dibujarse a si mismo

//Voy a crear un array para almacenar todas las particulas(en este caso los balones)
let balones =[]


let balon={//objeto porque tiene {}
    x: 200,
    y: 200,
    r: 15,
    vX: 10,//px por segundo
    vY: -5,
    //imagen: undefined,
    //METODOS
    dibujarse: function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.r, 2*Math.PI, 0);
        ctx.fillStyle = "rgb (0,0,0,0.5)"
        ctx.stroke();
        ctx.fill()
        //ctx.drawImage(this.imagen, this.x-this.r, this.y-this.r, 2*this.r, 2*this.r)//le quito el radio para que así quede centrada la imagen
        //ctx.drawImage(this.images, this.x, this.y, 2*this.r, 2*this.r) 
        //2*this.r = diametro
        //las coordenadas que uno le da son las coordenadas de la esquina superior izquierda de la imagen

    },
    moverse: function(){
        this.x = this.x + this.vX *dT/1000;
        this.y = this.y + this.vY *dT/1000;
    }
}



drawObj.draw =  function(){//draw se repite cada 30 segundos
    ctx.clearRect(0, 0, 400, 400);
    for(let particula of balones){//yo defino como llamar a cada uno de los objetos que quiero, el punto es que esté escrito igual en estas tres lienas
        particula.dibujarse()
        particula.moverse()
    }
//     balon.dibujarse();
//     balon.moverse();
//     balon2.dibujarse();
//     balon2.moverse();
}

run()

function crearParticula(evento){
    let nuevoBalon = Object.create(balon)
    //le debo asignar x, y, vX y vY porque ya exste el balon pero debo darle los valores
    nuevoBalon.x = evento.offsetX
    nuevoBalon.y = evento.offsetY
    //Genero el ángulo de manera aleatoria 
    //Para esto uso "Math.random"-> que genera un numero aleatorio entre 0 y 1
    let ang= 2*Math.PI*Math.random()
    nuevoBalon.vX = 400* Math.random() * Math.cos(ang)
    nuevoBalon.vY = 400 * Math.random() * Math.sin(ang)

    //añado el nuevo balon al array
    balones.push(nuevoBalon)
}

//Al hacer click se va a ejecutar la función crear partícula
canvas.onclick = crearParticula