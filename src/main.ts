import { Engine, Runner, Composite, Bodies, Events, Body, Mouse, MouseConstraint } from 'matter-js';
import Rectangle from './rectangle';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let engine = Engine.create();
let runner = Runner.create();

let ground = new Rectangle(canvas.width / 2, canvas.height + 50, canvas.width, 120, {isStatic: true});
let ball = Bodies.circle(canvas.width / 2, canvas.height / 2, 50, {restitution: 1});
let box = new Rectangle(ball.position.x + 10, ball.position.y - 200, 100, 100);

let mouse = Mouse.create(canvas);
let mouseConstraint = MouseConstraint.create(engine, {mouse: mouse, constraint: {stiffness: 0.01}});

Composite.add(engine.world, [ground.rectBody, ball, box.rectBody, mouseConstraint]);

Runner.run(runner, engine);

const drawRect = (rect: Rectangle, color: string = 'white') => {
    ctx.beginPath();
    ctx.save();
    ctx.translate(rect.rectBody.position.x, rect.rectBody.position.y);
    ctx.rotate(rect.rectBody.angle);
    ctx.rect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

const drawCircle = (circle: Body, color: string = 'DodgerBlue') => {
    ctx.beginPath();
    ctx.arc(circle.position.x, circle.position.y, circle.circleRadius as number, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

Events.on(engine, 'afterUpdate', (_) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(ground);
    drawCircle(ball);
    drawRect(box, 'SeaGreen');
});
