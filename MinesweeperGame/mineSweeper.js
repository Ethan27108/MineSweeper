let arr = [];
let l = 0;
let count=0;
let difficulty=0;
let cont = true;
let oneGameOn = false;
let currentDate;
let timestart;

//This sets the difficulty to easy by stating the default variables like the size and mineamount and then creates the mine field
function setEasy(){
    if (oneGameOn==false){
        currentDate = new Date();
        timestart = currentDate.getTime();
        console.log(timestart);
        minepercent=8;
        row=8;
        col=8;
        mineAmount=10;
        arr=[];
        createBaseArr(row,col)
        addMines(row,col,mineAmount,minepercent);
        countMines();
        

        change();
        console.log(arr);
        oneGameOn = true;
    }
}

//This sets the difficulty to medium by stating the default variables like the size and mineamount and then creates the mine field
function setMed(){
    if (oneGameOn==false){
        currentDate = new Date();
        timestart = currentDate.getTime();
        minepercent=8;
        row=13;
        col=15;
        mineAmount=40;
        arr=[];
        createBaseArr(row,col)
        addMines(row,col,mineAmount,minepercent);
        countMines();
        change();
        console.log(arr);
        oneGameOn = true;
    }
}

//This sets the difficulty to hard by stating the default variables like the size and mineamount and then creates the mine field
function setHard(){
    if (oneGameOn==false){
        currentDate = new Date();
        timestart = currentDate.getTime();
        minepercent=8;
        row=16;
        col=20;
        mineAmount=99;
        arr=[];
        createBaseArr(row,col)
        addMines(row,col,mineAmount,minepercent);
        countMines();
        change();
        console.log(arr);
        oneGameOn = true;
    }

}

//This sets some base variables that all need for the three different power ups for this case its spotter and it keeps track of how many have been used and doesnt allow you to use it if u have used 3 of them
let triggered =0;
let spotter=false;
function spotterPowerup(){
    if (spotter==true){
        spotter=false;
        triggered-=1;
        document.getElementById("powerup").innerHTML=("Spotter"+triggered+"/3");
    }
    else if (triggered!=3){
        spotter=true;
        triggered+=1;
        document.getElementById("powerup").innerHTML=("Spotter"+triggered+"/3");
    }
    else{
        alert("You are out of this power up");
    }
    
}

//This sets some base variables that all need for the three different power ups for this case its grid and it keeps track of how many have been used and doesnt allow you to use it if u have used 3 of them
let triggered2 =0;
let grid=false;
function gridPowerup(){
    if (grid==true){
        grid=false;
        triggered2-=1;
        document.getElementById("powerup2").innerHTML=("Grid"+triggered2+"/3");
    }
    else if (triggered2!=3){
        grid=true;
        triggered2+=1;
        document.getElementById("powerup2").innerHTML=("Grid"+triggered2+"/3");
    }
    else{
        alert("You are out of this power up");
    }
    
}

//This sets some base variables that all need for the three different power ups for this case its shield and it keeps track of how many have been used and doesnt allow you to use it if u have used 3 of them
let triggered3 =0;
let shield=false;
function shieldPowerup(){
    if (shield==true){
        shield=false;
        triggered3-=1;
        document.getElementById("powerup3").innerHTML=("Shield"+triggered3+"/3");
    }
    else if (triggered3!=3){
        shield=true;
        triggered3+=1;
        document.getElementById("powerup3").innerHTML=("Shield"+triggered3+"/3");
    }
    else{
        alert("You are out of this power up");
    }
    
}
// creating two-dimensional array
function createBaseArr(){
    for (let i = 0; i < row; i++) {
        arr[i] = [];
        for (let j = 0; j < col; j++) {
          arr[i][j] = 0;
        }
      }
}

//counts the mines in the two dimensional array to make sure it the correct amount if not it will add more mines
function countMines() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let mineClose = 0;
            if (arr[i][j] == 0) {
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (i + x >= 0 && i + x < row && j + y >= 0 && j + y < col) {
                            if (arr[i + x][j + y] == -1) {
                                mineClose += 1;
                            }
                        }
                    }
                }
                arr[i][j] = mineClose;
            }
        }
    }
}

// Changes everything that isnt a mine to the correct number this is done by looking at all adjacent spaces and seeing if its a mine
function clearAllBlank(i, j) {
    if (i < 0 || i >= row || j < 0 || j >= col || arr[i][j] !== 0) {
        return false; // Exit if out of bounds or not a blank space
    }

    const table = document.getElementById('myTable');
    let buttonToChange = table.rows[i].cells[j].querySelector('button');
    buttonToChange.innerHTML = arr[i][j];
    buttonToChange.id="clicked";

    arr[i][j] = -2; // Mark as visited

    // Display adjacent numbers
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < row && j + y >= 0 && j + y < col) {
                let adjacentButton = table.rows[i + x].cells[j + y].querySelector('button');
                if (arr[i + x][j + y] === 0 && adjacentButton.innerHTML === " ") {
                    // Recursively reveal connected zeros
                    clearAllBlank(i + x, j + y);
                } else if (arr[i + x][j + y] > 0 && adjacentButton.innerHTML === " ") {
                    // Display adjacent numbers
                    adjacentButton.innerHTML = arr[i + x][j + y];
                    adjacentButton.id="clicked";
                }
            }
        }
    }

    return true;
}





// This is the main function that runs on loop and it used to decide what to do when events happen such as mouse clicks or right clicks
function change(){
  let counting=0;
  let flagged=0;
    // Get the table element
    const table = document.getElementById("myTable");

    // Create the table rows and cells
    for (let i = 0; i < row; i++) {
        const rows = table.insertRow();
        for (let j = 0; j < col; j++) {
            const cell = rows.insertCell();
            const button = document.createElement("button");
            button.innerHTML = " ";
            button.id="unclicked";
            //Looks for left clicks and then will check if any powerups are chosen to be used
            button.addEventListener("click", function() {
                //Checks for spotter and if active will use it
                if (spotter==true){
                    spotter = false;
                    if (arr[i][j]==-1){
                        alert("This space is a mine");
                    }
                    else{
                        alert("This space is "+arr[i][j]);
                    }
                 //Checks for grid pwoerup and if its active will use it   
                }else {
                    if (grid==true){
                        let gridcount=0;
                        grid=false;
                        for (let x = -1; x <= 1; x++) {
                            for (let y = -1; y <= 1; y++) {
                                if (i + x >= 0 && i + x < row && j + y >= 0 && j + y < col) {
                                    if (arr[i + x][j + y] == -1) {
                                        gridcount += 1;
                                    }
                                }
                            }
                        }
                        alert('In the 3x3 area there is '+gridcount+' mines')
                    }
                    // Checks to see if you hit a mine if you did and there is a shield it saves you otherwise you lose
                    else if (arr[i][j]==-1){
                        if (shield==true){
                            alert("That was a mine the shield saved you!");
                        }
                        else{
                            alert("You lose please try again!");
                            triggered=0;
                            triggered2=0;
                            triggered3=0;
                            spotter=false;
                            grid=false;
                            shield=false;
                            document.getElementById("powerup").innerHTML=("Spotter"+triggered+"/3");
                            document.getElementById("powerup2").innerHTML=("Grid"+triggered2+"/3");
                            document.getElementById("powerup3").innerHTML=("Shield"+triggered3+"/3");
                            for (let i = 0; i < row; i++){
                                table.remove();
                                const newTable = document.createElement("table");
                                newTable.setAttribute("id", "myTable");
                                document.body.appendChild(newTable);
                            }
                            oneGameOn = false;
                            }
                        
    
                  }
                    // If its a blank space it will cascade and show all of the blank around it and then a layer of numbers
                  else if (arr[i][j]==0){
                    while (true){
                        button.innerHTML = arr[i][j];
                        button.id="clicked";
                        let listClear= clearAllBlank(i,j)
                        const table = document.getElementById('myTable');
                        if(!((listClear[0])&&(listClear[1])&&(listClear[2])&&(listClear[3])&&(listClear[5])&&(listClear[6])&&(listClear[7])&&(listClear[8]))){
                            break;
                        }
                    }
    
                  }
                  else if (arr[i][j]==-2){
                    arr[i][j]=0;
                    button.innerHTML = arr[i][j];
                    button.id="clicked";
                  }
                  else{
                    button.innerHTML = arr[i][j];
                    button.id="clicked";
                  }
                  shield=false;
                }
                
            });
            //Checks for a right click to start to set a flag
            button.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                //if its a mine it will add 1 to the count so it can check if u have flagged all the mines
                if ((arr[i][j]==0)&&(button.innerHTML!="|&gt;")){
                    button.innerHTML = "|>";
                    flagged +=1;
                    button.id="flagged";

                }
                //Will lower the amount flagged if you click on something not a mine so that you cantr just flag everything and win
                else if ((arr[i][j]==0)){
                    button.innerHTML = " ";
                    flagged -=1;
                    button.id="unclicked";
                }
                else if (button.innerHTML==arr[i][j]){
                    ;
                }
                else if (button.innerHTML==-2){
                    ;
                }
                    //Check if its not a mine and not flagged if so it will add a flag
                else if ((arr[i][j]==-1)&&(button.innerHTML!="|&gt;")&&(flagged<mineAmount)){
                  counting+=1;
                  button.innerHTML = "|>";
                  flagged +=1;
                  button.id="flagged";

                }
                    //If it is a mine then it will unflag it and take away from the count
                else if (arr[i][j]==-1){
                  counting-=1;
                  button.innerHTML = " ";
                  flagged -=1;
                  button.id="unclicked";

                }
                    if its a normal flag then it just gets rid and resets the values
                else if (button.innerHTML=="|&gt;"){
                  button.innerHTML = " ";
                  flagged -=1;
                  button.id="unclicked";
                }
                else if(flagged < mineAmount){
                  button.innerHTML = "|>";
                  flagged +=1;
                  button.id="flagged";
                }
                //If you get the right amount of mines flagged then you will win and it will set it up to restart the game
                if (counting==mineAmount){
                    let newdate = new Date();
                    let timeend = newdate.getTime();
                    let time= (timeend-timestart)/1000;
                    alert("You won in "+time+" seconds!");
                    triggered=0;
                    triggered2=0;
                    spotter=false;
                    grid=false;
                    document.getElementById("powerup").innerHTML=("Spotter"+triggered+"/3");
                    document.getElementById("powerup2").innerHTML=("Grid"+triggered2+"/3");
                    document.getElementById("powerup3").innerHTML=("Shield"+triggered3+"/3");
                    for (let i = 0; i < row; i++){
                    table.remove();
                    const newTable = document.createElement("table");
                    newTable.setAttribute("id", "myTable");
                    document.body.appendChild(newTable);
                    }
                    oneGameOn = false;
                }
              });

            cell.appendChild(button);
        }
    }
    }

// This will add all of the mines to the two dimensional array
function addMines(row,col,mineAmount,minepercent){
    let rowCont=0;
    count=0;
    cont=true;
    console.log(mineAmount);
    while(cont){
        for (let j = 0; j < col; j++){
            try{
                if ((Math.random()*99<=minepercent)&&(count<mineAmount)){
                    if(arr[rowCont][j]==0){
                        arr[rowCont][j] = -1;
                        count = count+1;
                    }

                }
                else if(count==mineAmount){
                    cont=false;
                    break;
                }
            }
            catch(e){
            }

        }
        if (rowCont<row){
            rowCont=rowCont+1
        }
        else{
            rowCont=0;
        }

    }
}
