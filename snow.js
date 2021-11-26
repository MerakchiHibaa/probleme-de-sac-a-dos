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

//******************************************************************************************************************************* */
let app = new Vue({
    el: "#root",
    data: {
        poids_maximum: 10,
        last_id: 3,
        nom: "",
        poids: 0,
        valeur: 0,
        objects: [{
            id: 1,
            nom: 'Cadeau 1',
            valeur: 5,
            poids: 2
        },
        {
            id: 2,
            nom: 'Cadeau 2',
            valeur: 3,
            poids: 5
        }
        ],
        valeur_maximum: 0,
        listeObjets:[]
    },
    methods: {
        addObject() {
            newObject = {};
            newObject.id = this.last_id + 1;
            newObject.nom = this.nom;
            newObject.poids = this.poids;
            newObject.valeur = this.valeur;
            this.objects.push(newObject);
            this.nom = "";
            this.poids = 0;
            this.valeur = 0;
            this.last_id++;
        },

        deleteObject(id) {
            this.objects = this.objects.filter((value) => {
                return value.id != id;
            });
        },

        knapsack() {
            $('#result').show();
            this.valeur_maximum = this.find_max_value();
            $('#result2').show();
        },

        find_max_value() {

            objects = [{
                id: 0,
                nom: '',
                valeur: 0,
                poids: 0
            }];
            objects1 = [{
                id: 0,
                nom: '',
                valeur: 0,
                poids: 0
            }];
            this.objects.map(o => objects.push(o));
            console.log(objects);
            rows = objects.length;
            columns = parseInt(this.poids_maximum) + 1;
            let matrice = Array(rows).fill().map(() => Array(columns).fill(0));

            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns; j++) {
                    if (i == 0 || j == 0) {
                        matrice[i][j] = 0
                    } else if (j < objects[i].poids) {
                        matrice[i][j] = matrice[i - 1][j]
                    }
                    else {
                        matrice[i][j] = Math.max(matrice[i - 1][j], parseInt(matrice[i - 1][j - objects[i].poids]) + parseInt(objects[i].valeur));
                    }

                }
            }

            console.log(matrice);
            const result=matrice[rows - 1][columns - 1];
            res=result;
            console.log(res)
            w=this.poids_maximum
            objects1 =this.objects;
            this.listeObjets = []
            for( i=rows ; i>0 && res>0 ; i-- ){
                if (res==matrice[i-1][w])
                    continue;
                else {
                    console.log(objects1[i-1].nom);
                    this.listeObjets.push(objects1[i-1].nom)
                    res=res-objects1[i-1].valeur;
                    w=w-objects1[i-1].poids;
                }
            }


            return result
        }
    }

})