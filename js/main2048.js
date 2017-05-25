var board=new Array();
var score=0;
var hasConflicted=new Array();
$(document).ready(function(){
newgame();
});


function newgame(){
    //初始化棋盘格
      init();
    //在随机两个格子生成数字;
    generateOneNumber();
    generateOneNumber();


}

function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
	{
     var gridCell=$("#grid-cell-"+i+"-"+j);
     gridCell.css('top',getPosTop(i, j));
     gridCell.css('left',getPosLeft(i, j));
	}

	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();

		for(var j=0;j<4;j++)	
		board[i][j]=0;
	    hasConflicted[i][j]=false;
			

	}

	updateBoardView();
	score=0;
}
function updateBoardView(){
	$(".number-cell").remove();//jQuery
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
		{
			$("#grid-container").append('<div class="number-cell"  id="number-cell-'+i+'-'+j+'"></div>');
		    var theNumberCell=$('#number-cell-'+i+'-'+j);
		    
		    if(board[i][j]==0)
		    {
		    theNumberCell.css('width','0px');
		    theNumberCell.css('height','0px');
		    theNumberCell.css('top',getPosTop(i,j)+50);
		    theNumberCell.css('left',getPosLeft(i,j)+50);

		    }
		    else{
           theNumberCell.css('width','100px');
           theNumberCell.css('height','100px');
           theNumberCell.css('top',getPosTop(i,j));
           theNumberCell.css('left',getPosLeft(i,j));
           //theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
           //theNumberCell.css('color',getNumberColor(board[i][j]));
           theNumberCell.css('background-image',getBackgroundImage(board[i][j]));
          


		    }
		    hasConflicted[i][j]=false;
		}
}


 function generateOneNumber(){
if(nospace(board))
return false;
//随机一个位置
var randx=parseInt(Math.floor(Math.random()*4));
var randy=parseInt(Math.floor(Math.random()*4));
var times=0;
while(times<50)//先前是while（true），这个死循环是不被提倡的，因为随着游戏数据的增多，遍历越多，游戏运行的速度也就越慢。这对于用户体验来说是致命的缺陷。
{if(board[randx][randy]==0)
	break;
randx=parseInt(Math.floor(Math.random()*4));
randy=parseInt(Math.floor(Math.random()*4));
times++;
}
if(times==50)
{for(var i=0;i<4;i++)
	for(var j=0;j<4;j++){
		if(board[i][j]==0)
		{
			randx=i;
			randy=j;
		}

}
}

//随机一个数字
var randNumber=Math.random()<0.5?2:4;
//在随机位置上随机数字
board[randx][randy]=randNumber;
showNumberWithAnimation(randx,randy,randNumber);

return true;


 }


$(document).keydown( function( event ){
    switch( event.keyCode ){
        case 37: //left
            if( moveLeft() ){

               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
            }
            break;
        default: //default
            break;
    }
});

function isgameover(){
	if(nospace( board )&&nomove(board))
	{  gameover();

	}
}


/*function gameover($container){
    var cover = $('<div id="over"></div>');
    cover.html('<p><span>游戏结束!!</span><br/><a class="newGameButton" href="javascript:newGame();">replay</a></p>');

    $container.append(cover);
    
    cover.on('click',function(e){
        $(this).remove();
    })
}*/

function  gameover()
{
		var score; //score变量，用来存储用户输入的成绩值。
	score = prompt("世界上最聪明的人是谁？1：杜维杰 2.杜三贱 3.方丈遗少 4.其他人")               ;
	if(score==1)
	{
	  alert("我就知道你总说实话！");
	  
	}
	else if(score==2)
    {
	   alert("你怎么老说实话？！");
	   
	}
	else if(score==3)
	{
		alert("靠，能不能不说实话了！");

	}
	else 
	{
alert("我知道你点错了。不要想着强制关闭，会有意想不到的事发生的。");
gameover();
	}
	
}

 function  moveLeft()
 {
 	if(!canMoveLeft( board ))
 	return false;
//moveLeft   
for(var i=0;i<4;i++)
	for(var j=1;j<4;j++){
		if(board[i][j]!=0)
	{


	for(var k=0;k<j;k++)
	{
		if(board[i][k]==0&&noBlockHorizontal(i,k,j,board))
{//move
	showMoveAnimation(i,j,i,k);//(i,j)到(i,k)
	board[i][k]=board[i][j];
	board[i][j]=0;
	continue;

}	
else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
{
	//move
	//add
	showMoveAnimation(i,j,i,k);
	board[i][k]+=board[i][j];
	board[i][j]=0;
	score+=board[i][k];
	updateScore(score);
	hasConflicted[i][k]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }

 function  moveRight()
 {
 	if(!canMoveRight( board ))
 	return false;
//moveLeft   
for(var i=0;i<4;i++)
	for(var j=2;j>=0;j--){
		if(board[i][j]!=0)
	{


	for(var k=3;k>j;k--)
	{
		if(board[i][k]==0&&noBlockHorizontal(i,j,k,board))
{//move
	showMoveAnimation(i,j,i,k);
	board[i][k]=board[i][j];
	board[i][j]=0;

	continue;

}	
else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])
{
	//move
	//add
	showMoveAnimation(i,j,i,k);
	board[i][k]+=board[i][j];
	board[i][j]=0;
	score+=board[i][k];
	updateScore(score);
	hasConflicted[i][k]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }
  function  moveUp()
 {
 	if(!canMoveUp( board ))
 	return false;
//moveLeft   
for(var j=0;j<4;j++)
	for(var i=1;i<4;i++){
		if(board[i][j]!=0)
	{


	for(var k=0;k<i;k++)
	{
		if(board[k][j]==0&&noBlockVertical(j,k,i,board))
{//move
	showMoveAnimation(i,j,k,j);
	board[k][j]=board[i][j];
	board[i][j]=0;
	
	continue;

}	
else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j])
{
	//move
	//add
	showMoveAnimation(i,j,k,j);
	board[k][j] +=board[i][j];
	board[i][j]=0;
	score+=board[k][j];
	updateScore(score);
	hasConflicted[k][j]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }

 function  moveDown()
 {
 	if(!canMoveDown( board ))
 	return false;
//moveLeft   
for(var j=0;j<4;j++)
	for(var i=2;i>=0;i--){
		if(board[i][j]!=0)
	{


	for(var k=3;k>i;k--)
	{
		if(board[k][j]==0&&noBlockVertical(j,i,k,board))
{//move
	showMoveAnimation(i,j,k,j);
	board[k][j]=board[i][j];
	board[i][j]=0;
	continue;

}	
else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j])
{
	//move
	//add
	showMoveAnimation(i,j,k,j);
	board[k][j] +=board[i][j];
	board[i][j]=0;
	score+=board[k][j];
	updateScore(score);
	hasConflicted[k][j]=true;
	continue;
}

}
}

}
setTimeout("updateBoardView()",200);
return true;
 	

 }