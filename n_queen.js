
var N = prompt("Please enter boar length", 8);
var board  = []; 
var board_set = [...Array(1)].map(e => board);
var board_r = [];
for(var i=0 ; i<N; i++){
    board_r.push(0);
}
for(var i=0 ; i<N; i++){
    board.push(board_r.slice());
}
function printChessBoard(num){
    var inner_html = "";
    for(var i=0 ; i<N; i++){
        for(var j=0; j<N; j++){
            if(i%2==0){
                if(j%2==0){
                    inner_html += "<div class='white_square' id='"+num.toString()+i.toString()+j.toString()+"'></div>";
                }else{
                    inner_html += "<div class='black_square' id='"+num.toString()+i.toString()+j.toString()+"'></div>";
   
                }
            }else{
                if(j%2==0){
                    inner_html += "<div class='black_square' id='"+num.toString()+i.toString()+j.toString()+"'></div>";
                }else{
                    inner_html += "<div class='white_square' id='"+num.toString()+i.toString()+j.toString()+"'></div>";
   
                }
            }
        }
    }
    
        var prev = document.body.innerHTML;
        document.body.innerHTML = prev+"<div class='chessboard' id='"+num+"' style='width:"+50*N+"px'>"+inner_html+"</div>"+"<br>";
    
}

function printSolution(board,num){
    var text = "";
	for(var i=0;i<N;i++){ 
		for(var j=0;j<N;j++){
            if(board_set[num][i][j]==1){
            document.getElementById(num.toString()+i.toString()+j.toString()).innerHTML = "&#9819";
            }
			text += board_set[num][i][j];
        }
		text += "\n" ;
    }
    //console.log(text+"__________________________________________________________");
}

function check_past(row,col){
    board[row][col] = 1;
        for(var k=1;k<board_set.length;k++){
            //[simple,straight90,opp90,180,frontlateral,sidelateral,own180,own90,own90]
            var isEqual = [true,true,true,true,true,true,true,true,true];
            for(var i=0; i<N;i++){
                for(var j=0;j<N;j++){
                    //simple
                    if(board[i][j]!=board_set[k][i][j]){
                       isEqual[0] =  false;
                    }
                    //straight90
                    if(board[i][j]!=board_set[k][j][N-1-i]){
                       isEqual[1] =  false;
                    }
                    //opp90
                    if(board[i][j]!=board_set[k][N-1-j][i]){
                       isEqual[2] =  false;
                    }
                    //180
                    if(board[i][j]!=board_set[k][N-1-i][N-1-j]){
                       isEqual[3] =  false;
                    }
                    //frontlateral
                    if(board[i][j]!=board_set[k][N-1-i][j]){
                       isEqual[4] =  false;
                    }//sidelateral
                    if(board[i][j]!=board_set[k][i][N-1-j]){
                       isEqual[5] =  false;
                    }
                    if(board[i][j]!=board_set[k][i][N-1-j]){
                       isEqual[5] =  false;
                    }
                    //180
                    if(board[i][j]!=board[N-1-i][N-1-j]){
                       isEqual[6] =  false;
                    }
                    //straight90
                    if(board[i][j]!=board[j][N-1-i]){
                       isEqual[7] =  false;
                    }
                    //opp90
                    if(board[i][j]!=board[N-1-j][i]){
                       isEqual[8] =  false;
                    }
                }
            }
            for(var i=0; i<9;i++){
                if(isEqual[i]){
                    board[row][col] = 0;
                    return false;
                }
            }
        }
    return true;
}

function isSafe(row, col){
    var i;
    var j;
    //console.log("checking for ="+row+" "+col);
    /*for(var k = 1;k<board_set.length;k++){
        if(board_set[k][row][col]==1){
            //console.log("board "+board_set[k][row][col]+" "+k+" "+row+" "+col+" 1");
            return false;
        }
    }*/
    if(col<N-1){
        for(i=0;i<col;i++){ 
            if (board[row][i] == 1){ 
                //console.log("board "+board[row][i]+" "+row+" "+i+" 2");
                return false;
            }
        }
    }
    if(row<N-1){
        for(i=0;i<row;i++){ 
            if (board[i][col] == 1){
                //console.log("board "+board[i][col]+" "+i+" "+col+" 3");
                return false;
            }
        }
    }
    if(col>0){
        for(i=col;i>-1;i--){ 
            if (board[row][i] == 1){
                //console.log("board "+board[row][i]+" "+row+" "+i+" 4");
                return false;
            }
        }
    }
    if(row>0){
        for(i=row;i>-1;i--){ 
            if (board[i][col] == 1){
                //console.log("board "+board[i][col]+" "+i+" "+col+" 5");
                return false;
            }
        }
    }
    if(row>0&&col>0){
        i=row;  j=col;
        for(;i>=0&&j>=0;i--,j--){
            if (board[i][j] == 1){
                //console.log("board "+board[i][j]+" "+i+" "+j+" 6");
                return false;
            }
        }
    }
    if(row>0&&col<N-1){
        i=row;  j=col;
        for(;i<N&&j<N;i++,j++){ 
            if (board[i][j] == 1){
                //console.log("board "+board[i][j]+" "+i+" "+j+" 7");
                return false;
            }
        }
    }
    if(row>0&&col<N-1){
        i=row;   j=col;
        for(;i>-1&&j<N;i--,j++){ 
            if (board[i][j] == 1){
                //console.log("board "+board[i][j]+" "+i+" "+j+" 8");
                return false;
            }
        }
    }
    if(row<N-1&&col>0){
        i=row;  j=col;
        for(;i<N&&j>-1;i++,j--){ 
            if (board[i][j] == 1){
                //console.log("board "+board[i][j]+" "+i+" "+j+" 9");
                return false;
            }
        }
    }
    //this is for the not the same sol but not totaly sistict
    if(col==N-1){
        if(!check_past(row,col)){
            return false
        }
    }
    return true;
}

function solveNQUtil(board, col){ 
    if (col >= N){
		return true;
    }
 
	for(var i=0;i<N;i++){
		if (isSafe(i, col)){
			board[i][col] = 1;
			if (solveNQUtil(board, col + 1) == true){ 
				return true;
            }
			board[i][col] = 0;
        }
    }
	return false;
}

function solveNQ(){ 
	//if (!solveNQUtil(board, 0)){
        //game over
		//return false;
    //}
    while(solveNQUtil(board, 0)){
        board_set.push(board);
        board = [];
        for(var i=0 ; i<N; i++){
            board.push(board_r.slice());
        }
    }
    
	return true;
}
solveNQ();    
board_set.shift();
for(var i=0;i<board_set.length;i++){
    printChessBoard(i);
    printSolution(board_set[i],i);
}
//console.log(board_set.length);
