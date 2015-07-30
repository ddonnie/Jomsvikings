// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(640, 640, Phaser.AUTO, 'gameDiv');

var grid = 32; //tile size
var snakeLength = 10; //initial snake length
var snake = [];



// Create our 'main' state that will contain the game
var mainState = {
    
    preload: function() { 
            game.stage.backgroundColor = 'A0A0A0';
            game.load.spritesheet('viking', 'assets/vik_merged.png', 32, 32);
            game.load.image('treasure', 'assets/treasure.png');

        // This function will be executed at the beginning     
        // That's where we load the game's assets  
    },

    create: function() {

        snakeDraw();



        //control//
        cursors = game.input.keyboard.createCursorKeys();

        
   },


        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  


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


        // This function is called 60 times per second    
        // It contains the game's logic   
    },
};

function snakeDraw() {
            for(var i = 0; i < snakeLength; i++) 
            snake[i] = game.add.sprite(160+i*32, 160, 'viking', 17);  
        }
   

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');  