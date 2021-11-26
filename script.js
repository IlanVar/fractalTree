const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

// it will be smoth up to 10
var initialI = 10
var iteration = initialI;

function draw(startX, startY, len, angle, branchWidth, color, iteration) {

    ctx.lineWidth = branchWidth;
    
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = 'hsl('+ color +', 50%, 60%)';

    ctx.translate(startX, startY);
    if (iteration != initialI) {
        ctx.rotate(angle * Math.PI/180);
    }
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if(iteration <= 0) {
        ctx.arc(0, -len-2, 2, 0, Math.PI*2)
        ctx.stroke();
        ctx.restore();
        return;
    }

    draw(0, -len, len*0.7, -angle, branchWidth, color +10, iteration - 1);
    draw(0, -len, len*0.7, angle, branchWidth, color +10, iteration - 1);

    ctx.restore();
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,innerWidth,innerHeight);
    var angle = document.getElementById('angle').value
    var size = Number(document.getElementById('size').value)
    var color = Number(document.getElementById('color').value)
    draw(innerWidth/2, innerHeight, size, angle, 1, color, iteration)       
}

animate()

// resize event
window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		animate();
	}
)

;
