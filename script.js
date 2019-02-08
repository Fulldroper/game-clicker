var value = 0;
var value_size = 1;
var bonus_size = 2;
var bonus = value_size*bonus_size;
var timestamp;
//длительность бустов с сек
var boost1 =10;//autoclick
var boost2 =15;//x2
var bboost1 =false;
var bboost2 =false;
var pause_boost2=getSecondsToday()+getRandomInt(200,800);
var MSC = new Map([['x',0],['y',0]]);  
if(document.cookie.length>0){
	var cookieString = document.cookie;
	var arr = (cookieString.slice(6, cookieString.length-1)).split(":");
	value = parseInt(arr[0], 10);
	value_size = parseInt(arr[1], 10);
	bonus_size  = parseInt(arr[2], 10);
	boost1 = parseInt(arr[3], 10);
	boost2 = parseInt(arr[4], 10);

	updateCounter();
}
function compareNumbers(a, b) {
  return a - b;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення 

}
function getSecondsToday(){
  var d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};
function updateCounter(){
	if(bboost2 == true){
		document.getElementById('counter').innerHTML="Money "+value+"$ +"+bonus;
	}else{
		document.getElementById('counter').innerHTML="Money "+value+"$";
	};
}
function hideLoader(){
	document.getElementById("loading").style.display="none";
	document.getElementById("bgsound").volume = 0.1;
	document.getElementById("bgsound").play();
	console.log("Page loaded");
}
function addClick(){
	if(bboost2 == true && timestamp >= getSecondsToday()){
		value+=(value_size+bonus);
	}else{
		bboost1 =false;
		bboost2 =false;
		value+=value_size;
	}
}
function x2boostcheck(){
	if(getSecondsToday() >= pause_boost2 && bboost2 == false){
		document.getElementById('boost2').style.display="block";
	}
	if(bboost2 == true){
		document.getElementById('boost2').style.display="none";
	}
}			
function mc(evt){
  MSC.set('x', evt.pageX);
  MSC.set('y', evt.pageY );
}
/*
function traceMONEY(){
		var batya = document.getElementById('counter');
		var coin = document.createElement("div");
		coin.style.width=50;
		coin.style.height=50;
		coin.style.zIndex=100;
		coin.style.backgroundColor="black";
		coin.style.position="absolute";
		coin.style.top=MSC.get('x');
		coin.style.left=MSC.get('y');
		batya.appendChild(coin);
		moveCoin(coin,batya);
}
async function moveCoin(coin,batya){
		if(coin.style.top>0 && coin.style.left>0){
		coin.style.top--;
		coin.style.left--;
		batya.appendChild(coin);
		setTimeout(moveCoin(coin,batya),10000);
	}else{coin.remove();}
} */
window.onload = function() {
	setTimeout("hideLoader()", 1000);
	document.getElementById('boost2').style.display="none";
};
document.getElementById("click").onclick = function () {
	addClick();
	x2boostcheck();
	/* traceMONEY(); */
	updateCounter();
};
document.getElementById("click").onmousedown = function () {
	/* document.getElementById("click").style.backgroundColor="#b72828"; */
	/* document.getElementById("click").style.cursor="default"; */
};
document.getElementById("click").onmouseup = function () {
	/* document.getElementById("click").style.backgroundColor="red"; */
/* 	document.getElementById("click").style.cursor="n-resize"; */
};
document.getElementById("minigame1").onclick = function () {
	var el= document.getElementById("msg");
	el.className="msg center block";
	if(value!= 0){
		el.style.display="block";
		el.innerHTML=
		"<p class=msg-title >Guess the number</p>"+
		'<p id="money-count">Your bet: 0$</p> <p><input type="range" value="0" id="money" min="0" max="'+value+'" ></p>'+
		'<p id="var-count">Number: 0</p> <p><input type="range" value="0" id="var" min="0" max="9" ></p>'+
		'<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p><p style="margin-top:-30px;margin-bottom:-2px;cursor: pointer;" id=x >Close</p>';
		document.getElementById("x").onclick = function () {
			el.style.display="none";
			el.innerHTML="";
		};
		document.getElementById("money").onchange = function () {
		document.getElementById("money-count").innerHTML="Your bet: "+Math.floor(document.getElementById("money").value)+"$";
	};
		document.getElementById("var").onchange = function () {
			document.getElementById("var-count").innerHTML="Number: "+Math.floor(document.getElementById("var").value);
		};
		document.getElementById("accept").onclick = function () {
			var money =  Math.floor(document.getElementById("money").value);
			var num = Math.floor(document.getElementById("var").value);
			var rand = Math.floor(Math.random() * 9);
			var result;
			if(rand == num){
				result = money*2;
				value+=result;
				result="+"+result;
			}else{
				value-= money;
				result="-"+money;
			}
			updateCounter();
			el.innerHTML=
				"<p class=msg-title >Guess the number</p>"+
				'<p>Your bet: '+money+'$</p>'+
				'<p>Your number: '+num+'</p>'+
				'<p>Win number: '+rand+'</p>'+
				'<p>Result: '+result+'$</p>'+
				'<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p>';
				
			document.getElementById("accept").onclick = function () {
				el.style.display="none";
					el.innerHTML="";
			};
		};
	}else{
		el.style.display="block";
		el.innerHTML="<p class=msg-title >You don't have money</p>"+
		'<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p>';
			document.getElementById("accept").onclick = function () {
					el.style.display="none";
					el.innerHTML="";
			};
	}
};
document.getElementById("minigame2").onclick = function () {
	var el= document.getElementById("msg");
	el.className="msg center block";
	if(value > 50){
		el.style.display="block";
		el.innerHTML=
		"<p class=msg-title >Conformity</p>"+
		'<style>#display div {    background-color: #cacaca;margin-left: 6%;border-color: #563535;border-style: inset;color:#000000;padding: 2px;padding-left: 4px; padding-right: 4px;}</style><div id=display style="display: inline-flex;flex-basis: inherit;border-style: dashed;padding: 4px;padding-top: 8px;padding-bottom: 8px;width: 90%;" ><div id="el1">♥</div><div id="el2">♥</div><div id="el3">♥</div><div id="el4">♥</div></div>'+
		'<div style="border-style:dashed;padding:4px;padding-left:20px;margin-top:10px;border-color:#191919;"><p>Your bet: 50$</p>'+
		'<p id="winrate">Win: 0$</p></div>'+//♠♦♣♥
		'<p style="margin-left:90%;cursor: pointer;" id=accept>Roll</p><p style="margin-top:-30px;margin-bottom:-2px;cursor: pointer;" id=x >Close</p>';

		document.getElementById("x").onclick = function () {
			el.style.display="none";
			el.innerHTML="";
		};
		document.getElementById("accept").onclick = function () {
			var arr = ['♥','♣','♦','♠'];
			var arr2 = [0,0,0,0];
			var el = [getRandomInt(0,3),getRandomInt(0,3),getRandomInt(0,3),getRandomInt(0,3)];

			for(var i=0;i<=el.length-1;i++){
				arr2[el[i]]++;
			}
			arr2.sort(compareNumbers);
			var winrate= document.getElementById('winrate');
			switch(arr2[3]){
				case 2: winrate.innerHTML="20$";value-=30;break;
				case 3: winrate.innerHTML="70$";value+=20;break;
				case 4: winrate.innerHTML="+2000$ [JACKPOT]";value+=2000;break;
				default:winrate.innerHTML="0$";value-=50;break;
			}
			updateCounter();
			document.getElementById('el1').innerHTML=arr[el[0]];
			document.getElementById('el2').innerHTML=arr[el[1]];
			document.getElementById('el3').innerHTML=arr[el[2]];
			document.getElementById('el4').innerHTML=arr[el[3]];
		};
	}else{
		el.style.display="block";
		el.innerHTML="<p class=msg-title >You don't have money</p>"+
		'<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p>';
			document.getElementById("accept").onclick = function () {
					el.style.display="none";
					el.innerHTML="";
			};
	}
};
document.getElementById("boost2").onclick= function(){
	timestamp=getSecondsToday()+boost2;
	bboost2 = true;
}
document.getElementById("boost1").onclick= function(){
var el= document.getElementById("msg");
	el.className="msg center block";
	if(value >= 5){
		el.style.display="block";
		el.innerHTML=
		"<p class=msg-title >Buy clicks</p>"+
		'<p id="сlicks-count">Clicks: 0</p><p id="money-count">Сost: 0$</p><p><input type="range" value="0" id="money" min="0" max="'+Math.floor(value/5)+'" ></p>'+
		'<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p>';
		document.getElementById("money").onchange = function () {
			document.getElementById("сlicks-count").innerHTML="Clicks: "+Math.floor(document.getElementById("money").value)+" x"+boost1;
			document.getElementById("money-count").innerHTML="Сost: "+Math.floor(Math.floor(document.getElementById("money").value*5))+"$";
		};
		document.getElementById("accept").onclick = function () {
			var clicks = Math.floor(document.getElementById("money").value)*boost1;
			var cost = Math.floor(Math.floor(document.getElementById("money").value*5));
			value-=cost;
			updateCounter();
			el.innerHTML=
				"<p class=msg-title >Auto clicks</p>"+
				'<p id="click-counter">Clicks: 0/'+clicks+'</p>';
				for(var i =0;i<=clicks;i++){
					addClick();
					document.getElementById("click-counter").innerHTML='Clicks: '+i+'/'+clicks;
					updateCounter();
				}
			el.innerHTML+='<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p>';
				
			document.getElementById("accept").onclick = function () {
					el.style.display="none";
					el.innerHTML="";
			};
		};
	}else{
		el.style.display="block";
		el.innerHTML="<p class=msg-title >You don't have money</p>"+
		'<p style="margin-left:90%;cursor: pointer;" id=accept>Ok</p>';
			document.getElementById("accept").onclick = function () {
					el.style.display="none";
					el.innerHTML="";
			};
	}
}
document.getElementById("save").onclick=function(){
	document.cookie = "saves="+value+":"+value_size+":"+bonus_size+":"+boost1+":"+boost2;
	console.log("Data saved")
}