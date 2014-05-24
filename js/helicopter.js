$(document).ready(function(){
	var imgHeight = 29;
	var count = 1;
	var top;
	var hurdle_passed = 1;
	var hurdle_x;
	var hurdle_y = 420;
	var left = 0;
	var speed = 1;
	var score_count = 0;
	var start_playing;
	var collision_x = 200;
	var collision_y_bottom = 578;
	var collision_y_top = 140;
	var counter = 0;
	var stay = 0;
	var gain = 0;
	var gameOver = false;
	var keydown = false;
	var interval;
	var score = document.getElementById("score");
	var time = document.getElementById("time");
	var helicopter = document.getElementById("img");
	var canvas = document.getElementById("bg");
	var ctx = canvas.getContext("2d");
	make_base();
	var starting_date;
	var current_date;
	

function make_base()
{
	var starting_date = new Date();
	var start_playing = new Date();
	var base_image = new Image();
	var vx = 0;
	var x_pos = -vx;
	base_image.src = 'images/bg.png';
	var hurdle_img = new Image();
	hurdle_img.src = 'images/hurdle.png';
	base_image.onload = render_bg();
 
	
	function render_bg(){
		interval = setInterval( function() {
/*    	 window.requestAnimationFrame(renderGame); */ 
		current_date = new Date();
			var elapse =(current_date - starting_date) / 1000; 
			var ss = Math.floor(elapse % 60);
			elapse = elapse / 60;
			var mm = Math.floor(elapse % 60);
			elapse = elapse / 60;
			var hh = Math.floor(elapse % 60);
			time.innerHTML = "Time: "+checkTime(hh)+":"+checkTime(mm)+":"+checkTime(ss);
			
			function checkTime(i) {
				if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
				return i;
			}
				/* var stay = (current_date.getTime() - start_playing.getTime());
				stay = Math.floor(stay / 1000);
				gain += (stay * hurdle_passed);
				score.innerHTML = "Score: " + gain;
				start_playing  = current_date; */
				score_count += 1;
				if(score_count % 100 == 0){
					gain += Math.floor(1 * hurdle_passed);
					/* $('score').text("Score: "+ gain +""); */
					score.innerHTML = "Score: " + gain;
					/* alert(score.innerHTML); */
				}
			
			
			hurdle_x = vx + 585;
			ctx.drawImage(base_image, vx, 50);    
			ctx.drawImage(base_image, base_image.width-Math.abs(vx), 50);
			ctx.drawImage(hurdle_img , hurdle_x , hurdle_y);
			if(collision_x >= 600){
				collision_x = 0;
				hurdle_passed +=1;
				collision_y_bottom = 640;
			}else{
				collision_x += (2.5 * speed);
				if(collision_x < 250){
					collision_y_bottom -= (0.85 * speed);
					collision_y_top = collision_y_bottom - 480;
					}else if(collision_x > 250 && collision_x < 350){
					collision_y_bottom = 560;
					collision_y_top = collision_y_bottom - 500;
					}else{
					collision_y_bottom += (0.85 * speed);
					collision_y_top = collision_y_bottom - 480;
				}
			}		
		
			if (Math.abs(vx) > base_image.width) {
				vx = 0;
				hurdle_y = Math.floor(Math.random() * (420 - 140 + 1)) + 140;
			}	
			vx -= (2.5 * speed);
		},10);
	}
}


var increase = setInterval(function(){
		speed = speed + 0.01;
	},1000);
	
	var animation = setInterval(function(){
	
		top = parseInt(helicopter.style.top);
		left = parseInt(helicopter.style.left);
		$('#img').attr('src',"images/heli"+(count%2)+".png");
		if(left < 185){
		left += (2.5 * speed);
			if(left <= 185 && (top + 30 >= collision_y_bottom || top < collision_y_top)){
				clearInterval(animation);
					clearInterval(interval);
			}
			helicopter.style.left = left + 'px';
		}else{
			left = 185;
		}
		
		
		if ( top + helicopter.height + 10 < window.innerHeight) {	
				if(!keydown){
				top += (1.5 * speed);
			}

			if(left <= 185 && (top + 30 >= collision_y_bottom || top < collision_y_top) || (hurdle_x >= 188 && hurdle_x <= 238 && top + 30 >= hurdle_y && top <= hurdle_y + 200)){
				clearInterval(animation);
				clearInterval(interval);
				gameOver = true;
				crashHelicopter();
			}
			helicopter.style.top = top + 'px';
        }
		count++;	
	},10);
	
	
function crashHelicopter(){
		
	var mtimer;
	var count=0;
	var radius = 30;
	var radius_count = 40;
	
	$('#img').attr('src',"images/crashed.png");
	var launch_end = setInterval(function(){
		$('#endScreen').css('zIndex',"999");
	},3000);
	$('#your_score').text("Your Score: "+gain);
	$('#elapse_time').text("Elapsed "+time.innerHTML);
	var lasthigh_score = localStorage.getItem("high_score");
	if(gain > lasthigh_score){
		localStorage.setItem("high_score",gain);
		localStorage.setItem("Date",current_date.getDate());
		localStorage.setItem("Month",current_date.getMonth());
		localStorage.setItem("Year",current_date.getFullYear());
		localStorage.setItem("hh",current_date.getHours());
		localStorage.setItem("mm",current_date.getMinutes());
		localStorage.setItem("ss",current_date.getSeconds());
		$('#record').css('zIndex',"999");
		$('#record').css('left',"-9");
	}
	var highScore = localStorage.getItem('high_score');
	$('#high_score').text("High Score: "+highScore);
	$('#date_saved').text("Date Saved: "+localStorage.getItem('Date')+"/"+localStorage.getItem('Month')+"/"+localStorage.getItem('Year')+" "+localStorage.getItem('hh')+":"+localStorage.getItem('mm')+":"+localStorage.getItem('ss'));
	jQuery().ready(function(){
		points=getCirclePoints(left + 28,top + 15,radius,12);
		$.each(points,function(i,p){
		$('<div class="point"><div>').appendTo('#twelvepoints').css('left',p.x+'px').css('top',p.y+'px');
	});
	mtimer=setInterval(timer,50);
	});

	
	function timer(){
		if(radius_count != 40){
			radius -= 1;
		}else{
			radius += 1;
		}
		points=getCirclePoints(left + 28,top + 15,radius,12);
		$.each(points,function(i,p){
		$('.point:eq('+i+')').css('left',p.x+'px').css('top',p.y+'px');
		if(radius == 40){
			radius_count = 30;
		}else if(radius == 30){
			radius_count = 40;
		}
	});
	}


	function getCirclePoints(centerX,centerY,radius,segments){
		var totalPoints=new Array();
		if(count==10)count==0;
			for(var i=0;i<(segments);i++){
				x=centerX+radius*Math.sin(i*2*Math.PI/segments+count);
				y=centerY+radius*Math.cos(i*2*Math.PI/segments +count);
				totalPoints.push({'x':x,'y':y});
			}
		count++;
	return totalPoints;
}
	}
	
	
	
	$(document).on('keydown', function (event) {
		if ((event.which == 38 || event.which == 104) && !gameOver){
		keydown = true;
				top = parseInt(helicopter.style.top);
				/* if ( top + helicopter.height - 10 < window.innerHeight ) { */
					top -= (5 * speed);
					helicopter.style.top = top + 'px';
				/* } */
		}
	});
	
		$(document).on('keyup', function (event) {
		if ((event.which == 38 || event.which == 104) && !gameOver){
			keydown = false;
		}
	});
	
	
	$('#playAgain').click(function(){
		location.reload();
	});
	
});