var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyle_Key, textStyle_Value;

var Game = {

    preload : function() {
        game.load.image('snake', './assets/snake.png');
        game.load.image('apple', './assets/apple.png');
    },

    create : function() {

        snake = [];                     // This will work as a stack, containing the parts of our snake
        apple = {};                     // An object for the apple;
        squareSize = 15;                // The length of a side of the squares. Our image is 15x15 pixels.
        score = 0;                      // Game score.
        speed = 0;                      // Game speed.
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'right';            // The direction of our snake.
        new_direction = null;           // A buffer to store the new direction into.
        addNew = false;                 // A variable used when an apple has been eaten.

        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';


        for(var i = 0; i < 10; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  
        }



        this.generateApple();



        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };


        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);

        game.add.text(500, 20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);

    },



    update: function() {

        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        speed = Math.min(10, Math.floor(score/5));
        speedTextValue.text = '' + speed;

        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {

        var firstCell = snake[snake.length - 1],
            lastCell = snake.shift(),
            oldLastCellx = lastCell.x,
            oldLastCelly = lastCell.y;

        if(new_direction){
            direction = new_direction;
            new_direction = null;
        }


        if(direction == 'right'){

            lastCell.x = firstCell.x + 15;
            lastCell.y = firstCell.y;
        }
        else if(direction == 'left'){
            lastCell.x = firstCell.x - 15;
            lastCell.y = firstCell.y;
        }
        else if(direction == 'up'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y - 15;
        }
        else if(direction == 'down'){
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y + 15;
        }


        snake.push(lastCell);
        firstCell = lastCell;
        }

        if(addNew){
            snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
            addNew = false;
        }


        },


    generateApple: function(){


        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;
        apple = game.add.sprite(randomX, randomY, 'apple');
    }




};