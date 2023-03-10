const Express = require("express");
const app = Express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

var DB = {

    games: [
        {
            id: 23,
            title: "Fallout 3",
            year: 2006,
            price: 60
        },
        {
            id: 65,
            title: "Call of Duty Black Ops 2",
            year: 2012,
            price: 80
        },
        {
            id: 2,
            title: "The Elder Scrolls V: Skyrim",
            year: 2011,
            price: 75
        }
    ]
}

//End Points

app.get("/games", (req, res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", (req, res)=>{ 
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})

app.post("/game", (req, res)=>{
   var {title, price, year} =  req.body;

    DB.games.push({
        id: 65,
        title,
        price,
        year
    });

    res.sendStatus(200);

})

app.delete("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
});

app.put("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            var {title, price, year} =  req.body;

            if(title != undefined){
                game.title = title
            }

            if(price != undefined){
                game.price = price
            }

            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)

        }else{
            res.sendStatus(404)
        }
    }
})

app.listen(4500, (req, res)=>{
    console.log("APLICA????O DA API RODANDO")
});