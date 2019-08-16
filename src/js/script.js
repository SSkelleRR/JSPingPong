const canv = document.querySelector('#canvas');
const ctx = canv.getContext('2d');
const overScr = document.querySelector('.game-over-scr');
const replayBtn = document.querySelector('.replay');
let action = setInterval(game, 1000/60);

if (window.innerWidth <= 798) {
    clearInterval(action);
    ctx.clearRect(0 , 0 , canv.width , canv.height);
    canv.remove();
}

canv.width = 600;
canv.height = 350;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canv.width, canv.height);


const mouse = {
    y: canv.height / 2
}

document.addEventListener('mousemove' , (e) => {
    mouse.y = e.clientY;
})

function Circle(x , y , r , xv , yv) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.xv = xv;
    this.yv = yv;

    this.draw = () => {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
        ctx.fill();
        ctx.closePath();
    }

    this.update = () => {

        //Bouncing from rectangles

        if (this.x - this.radius <= rectLeft.x + rectLeft.w && (this.y + this.radius >= rectLeft.y && this.y - this.radius <= rectLeft.y + rectLeft.h)) {
            this.xv = -this.xv;
            textCount.text = `${+textCount.text + 1}`;
        }

        if (this.x + this.radius >= rectRight.x && (this.y + this.radius >= rectRight.y && this.y - this.radius <= rectRight.y + rectRight.h)) {
            this.xv = -this.xv;
        }

        //Bouncing from borders

        if (this.x + this.radius >= canv.width || this.x - this.radius <= 0) {
			this.xv = -this.xv;
		}

		if (this.y + this.radius >= canv.height || this. y - this.radius <= 0) {
			this.yv = -this.yv;
        }

        //Respawn in the center after a goal and add a point

        if (this.x - this.radius <= rectLeft.x + rectLeft.w && (this.y + this.radius < rectLeft.y || this.y - this.radius > rectLeft.y + rectLeft.h)) {
            clearInterval(action);
            overScr.style.display = 'block';
            let score = document.querySelector('#score');
            score.innerHTML = `You scored: ${+textCount.text}`;
        }



        
        //Movement
        
        this.x += this.xv;
        this.y += this.yv;

        this.draw();
    }
}

function drawRect(x , y , w , h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.draw = () => {
        if (this.y + this.h >= canv.height) this.y = canv.height - this.h;
        if (this.y <= 0) this.y = 0;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.fillRect(this.x , this.y , this.w , this.h);
        ctx.fill();
        ctx.closePath();
    }
}

function drawText(text , x , y) {
    this.text = text;
    this.x = x;
    this.y = y;
    
    this.draw = () => {
        ctx.fillStyle = 'white';
        ctx.font = '65px fantasy';
        ctx.fillText(this.text, this.x, this.y);
    }
}


const rectRight = new drawRect(canv.width - 12  , canv.height / 2.5 , 12 , 90);
const rectLeft = new drawRect(0 , canv.height / 2.5 , 12 , 90);

const textCount = new drawText('0' , canv.width / 2 - 10, 75);

const circle = new Circle(canv.width / 2 , canv.height / 2 , 12 , 6 , 6);

function game() {
    ctx.fillStyle = 'black'; 
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    circle.update();
    rectRight.y = circle.y - rectRight.h / 2;
    rectLeft.y = mouse.y - rectLeft.h / 2;
    textCount.draw();
    rectRight.draw();
    rectLeft.draw();
}

replayBtn.addEventListener('click' , () => {

    //Redraw the field
    ctx.clearRect(0 , 0 , canv.width , canv.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0 , 0 , canv.width , canv.height);

    //Reset elements
    textCount.text = '0';
    circle.x = canv.width / 2;
    circle.y = canv.height / 2;
    rectLeft.y = canv.height / 2 - rectLeft / 2;
    rectRight.y = canv.height / 2 - rectRight / 2;

    //Draw elements
    circle.draw();
    textCount.draw();
    rectRight.draw();
    rectLeft.draw();

    //Vanish game over section
    overScr.style.display = 'none';

    //Start game
    action = setInterval(game , 1000 / 60);
})
