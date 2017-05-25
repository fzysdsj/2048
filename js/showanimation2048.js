function showNumberWithAnimation(i,j,randNumber)
{
	var numberCell=$('#number-cell-'+i+"-"+j);
	/*numberCell.css('bockground-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));*/
	numberCell.css('background-image',getBackgroundImage(randNumber));
	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)/*马蛋，这个错误找了八百年，太鸡巴XX了，我写的是：numberCell.animate（{ width："100px";height:"100px"; 
		top:getPosTop(i,j);left:getPosLeft(i,j);}）(妈的智障，随便一句就加分号啊。)*/
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy){

	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	}, 200);
}

function updateScore(score)
{
   $('#score').text(score)

}