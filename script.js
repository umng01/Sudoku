var i;
var j;
var sudoku = [[],[],[],[],[],[],[],[],[]]

function createGrid(){
    var MyContainer = document.getElementById('container');

    for (i=0;i<9;i++){
        for(j=0;j<9;j++){
            var myInput = document.createElement('input');
            myInput.id = `${i}${j}`;

            var number = Math.ceil(Math.random()*9);
            
            myInput.value = number
            myInput.row = i;
            myInput.col = j;

            if(isSafe(sudoku, i, j, number)){
                myInput.value = number
                myInput.readOnly=true
            }
            else{
                number=0
                myInput.value=''
            }
            sudoku[i][j] = number
            MyContainer.appendChild(myInput);
            myInput.oninput = function(e){
                checkAns(sudoku, e)
            }
        }
    }   
}

createGrid()


function isSafe(grid, row, col, num){
    for(var x=0;x<9;x++){
        if(grid[row][x]==num){
            return false
        }
    }
    for(y=0;y<9;y++){
        if(grid[y][col]==num){
            return false
        }
    }
    var startRow = row - (row%3)
    var startCol = col - (col%3)

    for (var m=0;m<3;m++){
        for(var n=0;n<3;n++){
            if(grid[m+startRow][n+startCol] ==num){
                return false
            }
        }
    }
    return true
}


function checkAns(grid, e){
    var row = e.target.row
    var col = e.target.col
    var num = Number(e.data)
    var id = e.target.id

    if(num==''){
        
        return false
    }
    
    for(var x=0;x<9;x++){
        if(grid[row][x]==num){
            showColors('darkred', id)
            return false
        }
    }
    for(y=0;y<9;y++){
        if(grid[y][col]==num){
            showColors('darkred',id)
            return false
        }
    }
    var startRow = row - (row%3)
    var startCol = col - (col%3)

    for (var m=0;m<3;m++){
        for(var n=0;n<3;n++){
            if(grid[m+startRow][n+startCol] ==num){
                showColors('darkred',id)
                return false
            }
        }
    }
    
    showColors('lightgreen', id)
    return true

}

function showColors(color,id){
    var inp = document.getElementById(id);
    if (color == 'darkred'){
        inp.style.backgroundColor = 'darkred';
    }
    else{
        inp.style.backgroundColor = 'lightgreen';
    }
}

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n ){
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer(){
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Time is up!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

countdown( "ten-countdown", 10, 0 );
