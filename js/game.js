const canvas = document.getElementById('game'); // получаем канвас
const ctx = canvas.getContext('2d'); // стиль игры

const ground = new Image(); // IMAGE - это специальный класс, который позволяет работать с картинками
ground.src = './img/ground.png'; // вызвали картинку (Нужно отрисовать в канвасе)

const foodImg = new Image(); // IMAGE - это специальный класс, который позволяет работать с картинками
foodImg.src = './img/food.png' // вызвали картинку (Нужно отрисовать в канвасе)

let box = 32; // переменная, отвечающая за размер квадратика 

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box, // от 0 до 17 // отобраем в рандомном месте функция math.random // координата по Х // floor - для округления числа
    y: Math.floor(Math.random() * 15 + 3) * box // координата по У
};

// голова змейки будет находится в центре, кажое очко мы будем прибавлять в массив один квадратик
let snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };


// обработвич событий

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != 'right') // если мы нажали на клавишу, код которой 37 ... (кода можно узнать в инете)
        dir = 'left';
    else if(event.keyCode == 38  && dir != 'down')
        dir = 'up';
    else if(event.keyCode == 39  && dir != 'left')
        dir = 'right';
    else if(event.keyCode == 40  && dir != 'up')
        dir = 'down';
}

// есть свой хвост

function eatTail(head, arr) {
    for( let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game)
    }
}



function drawGame() {
    ctx.drawImage(ground, 0, 0); // указываем какую картинку рисуем, координаты по Х и по У

    ctx.drawImage(foodImg, food.x, food.y);

    // змейка
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // создание объекта
    }

    // текст сверху
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box, // от 0 до 17 // отобраем в рандомном месте функция math.random // координата по Х // floor - для округления числа
            y: Math.floor(Math.random() * 15 + 3) * box // координата по У
        };
    } else {
        snake.pop();
    }
 
    // бортики
    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game)


    // нажатие на стелки 

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    // голова змейки
        let newHead = {
            x: snakeX,
            y: snakeY
        };

    eatTail(newHead, snake)

    // добавление в начала массива вроде как
    
    snake.unshift(newHead);

}

// вызывать drawGame каждые 100 милисекунд через интервал
 let game = setInterval(drawGame, 150)

