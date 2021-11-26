window.onload = function() {
    //get the canvas and context and store in vars
    let canvas = document.getElementById("sky") ; 
    let ctx = canvas.getContext("2d") ; //to be able to draw 2d shapes on it
    //set canvas dims to window height and width 
    let W = window.innerWidth ; 
    let H = window.innerHeight ; 
    canvas.width = W ; 
    canvas.height = H ; 

    //generate the snowflakes and apply attributes 
    let mf = 100 ; // maximum flakes
    let flakes = [] ; // store all our flakes here each flake is an object

    //loop through the empty flakes and apply attributes 
    for (let i = 0 ; i < mf ; i ++) {
        flakes.push({ //random return a number between 0 and 1
            x: Math.random()*W , 
            y: Math.random()*H , 
            r: Math.random()*5 + 2 , //min radius of 2px and max of 7 px
            d: Math.random() + 1 // density of flakes min density of 1

        })
    }

    //draw flakes onto canvas 

    function drawFlakes() {
        ctx.clearRect(0,0,W,H); // clear the whole screen 
        ctx.fillStyle = "white" ;
        ctx.beginPath() ; //says to js that its about to start a path or a shape
        for ( let i = 0 ; i < mf ; i++) { //loop through each flake
            let f = flakes[i] ; 
            ctx.moveTo(f.x , f.y) ; //move the position of the drawing pen to f.x and f.y
            ctx.arc(f.x , f.y , f.r/*radius of arc*/  , 0 /*start at 0 degrees*/ , Math.PI*2 /*360 degrees in radian a full circle*/ , true) ; 
        }
        ctx.fill() ; // fill the context with the white style
        moveFlakes() ;

    }


    //animate the flakes
    let angle = 0 ; 
    function moveFlakes() {
        angle += 0.01 ; 
        for (let i =0 ; i <mf ; i++){
            //store the current flake
            let f = flakes[i] ; //the density determine the speed of the flake 
            //update X and Y coordinates of each snowflake
            f.y += Math.pow(f.d , 2 ) + 1 ;  // the density squared + 1
            f.x += Math.sin(angle) * 2 ;  // so that the flake sways from let to right

            //if the snowflake reach the bottom, send a new one to the top 

            if(f.y >H) { //if the flake y coordinate is beyon  the bottom 
                flakes[i] = {
                    x: Math.random() * W , y : 0 , r: f.r , d : f.d //set a new object
                } ;
            }
        }
    }
    setInterval(drawFlakes , 25) ; // call it each 25 ms


}