const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsclear");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000000"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let setup = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function MouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function ColorClick(event){
    console. log(event.target.style)
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function RangeChange(event){
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function ModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        }
}

function CanvasClick(){
    if (filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function ClearClick(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function RightClick(event){
    event.preventDefault();
}

function SaveClick(){
    const link = document.createElement("a");
    link.href = canvas.toDataURL(); 
    link.download = "Drawing";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", MouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", CanvasClick);
    canvas.addEventListener("contextmenu", RightClick)
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", ColorClick)
    ); 

if(range){
    range.addEventListener("input", RangeChange);
}

if(mode){
    mode.addEventListener("click", ModeClick)
}

if(clear){
    clear.addEventListener("click", ClearClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", SaveClick);
}