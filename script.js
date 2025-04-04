let cols = document.querySelectorAll(".col");
let colHistory = [
   [ "" ,"",""],
   [ "" ,"",""],
   [ "" ,"",""],
];

let result = document.querySelector(".winner")

//for getting the player 
let playerCross =true;

//check win function
const checkWin = () => {
    let a, b ,c;

    //check for all rows
    for(let i = 0;i<3;i++){
        a = colHistory[i][0];
        b = colHistory[i][1];
        c = colHistory[i][2];

        if(a == b && b == c && c == a && a !== ''){
            return {
                "arr" : [[i,0],[i,1],[i,2]],
                "won" : true
            };
        }
    }

    //check for all columns
    for(let i = 0;i<3;i++){
        a = colHistory[0][i];
        b = colHistory[1][i];
        c = colHistory[2][i];

        if(a == b && b == c && c == a && a !== ''){
            return {
                "arr" : [[0,i],[1,i],[2,i]],
                "won" : true
            };
        }
    }
    
    //check for left and right diagonals
        //left diagonal
        a = colHistory[0][0];
        b = colHistory[1][1];
        c = colHistory[2][2];
        if(a == b && b == c && c == a && a !== ''){
            return {
                "arr" : [[0,0],[1,1],[2,2]],
                "won" : true
            };
        }
        
        //right diagonal 
        a = colHistory[0][2];
        b = colHistory[1][1];
        c = colHistory[2][0];
        if(a == b && b == c && c == a && a !== ''){
            return {
                "arr" : [[0,2],[1,1],[2,0]],
                "won" : true
            };
        }

        //check draw
        for(let i =0;i<3;i++){
            for(let j =0;j<3;j++){
                if(colHistory[i][j] == '' ){
                    return {"won" : false};
                }
            }
        }

        return {'draw':true};
        
}

//show winner
const showWinner = (isX, wonLine)=>{

    let a = document.getElementById(`${wonLine[0][0]+1}${wonLine[0][1]+1}`)
    let b =  document.getElementById(`${wonLine[1][0]+1}${wonLine[1][1]+1}`)
    let c =  document.getElementById(`${wonLine[2][0]+1}${wonLine[2][1]+1}`)


    console.log(wonLine);
    console.log(b);
    console.log(c);
    
    b.style.scale = 1.1;
    a.style.scale = 1.1;
    
    c.style.scale = 1.1;
    if(isX){
        result.querySelector("p").textContent = "Winner is X";
        result.style.backgroundColor = "rgba(56, 73, 206, 0.66)";
        
    }
    else{
        result.querySelector("p").textContent = "Winner is O";
        result.style.backgroundColor = "rgba(171, 234, 53, 0.66)";
        
    }
    result.style.zIndex = 1;
    result.style.transitionDuration = "0.5s";
    
    result.style.opacity = 1;
    
}

//show draw
const showDraw =() =>{
    result.querySelector("h1").textContent = "DRAW"
    result.querySelector("p").textContent = ""

    result.style.backgroundColor = "rgba(215, 158, 25, 0.66)";
    result.style.zIndex = 1;
    result.style.transitionDuration = "0.5s";
    
    result.style.opacity = 1;
}


cols.forEach((item, index)=>{
    item.onclick = () =>{
        console.log(`Clicked ${item.id}`);

        //getting x and y coordinates of item
        let x = item.id[0]-1;
        let y = item.id.slice(-1)-1;
        console.log(colHistory[x][y].length);
        
        //checks if the box is not played
        if((colHistory[x][y].length == 0)){
           
            //check which player has the play
            if(playerCross){
                
                
                console.log(item.style);
                item.style.background = "red";
                item.textContent = "X";
                playerCross = false;
                colHistory[x][y] = "x";
                
            
            }
            else{
                item.style.background = "blue";
                item.textContent = "O";
                playerCross = true;
                
                colHistory[x][y] = "y";
            }
            if(checkWin().won){
                showWinner(!playerCross , checkWin().arr);
            }

        }
        else{
            console.log("Error already played");
            
        }

        if(checkWin().draw){
            showDraw();
        }

        
    }
    
})

const refresh = () =>{
    location.reload()
}


