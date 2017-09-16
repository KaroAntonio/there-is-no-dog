
var slogan_divs = []
var centre_balls = []
var balls = []
var out_balls = []
var start_time = -1;
var jake;
var slogans = [
	'Question authority!',
	'Take nothing for granted!',
	'You cant control your own life until you start to think for yourself!',
	'SUNYATA!',
	'There is no Dog!',
	'You are more than a "best friend"!',
]

var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

$(document).ready(function() {
	$('#loading').hide();
	for (i=0;i<1;i++) {
		balls.push([])
		init_balls(balls[i],18,50)
	}
	init_balls(out_balls,25,20)
	init_jake($('body'),100)
	init_balls(centre_balls,1,24)
	$(centre_balls[0]).css({'background-color':'white'})
	init_slogans(slogan_divs, 50)
	window.requestAnimationFrame(loop)	
})

function init_jake(parent_div, r) {
	var ball = $('<div>');

	ball.css({
		'background-image':'url("assets/guru.jpg")',
		'background-size': 'cover',
		'border-style':'dashed',
		'border-color':'#00ff00',
		'padding':'None',
		'border-radius':r,
		'padding-top':10,
		'width':r*2,
		'height':r*2,
		'top':HEIGHT/2-r,
		'left':WIDTH/2-r,
		'position':'fixed',
		'border-width':3
	});
	parent_div.append(ball);
	return ball;
	
}

function init_balls(arr,n,r) {
	for (var i =0; i<n;i++) {
		arr.push(create_ball($('body'),r))
	}
}

function init_slogans(arr,r) {
	for (var i =0; i<slogans.length;i++) {
		arr.push(create_ball($('body'),r))
		span = $('<span>')
		span.text(''+slogans[i])	
		span.css({
			'display':'inline-block',
			'vertical-align':'middle',
			'position':'relative',
			'line-height':'normal',
		})
		$(arr[i]).append(span)
	}
}

function rotate_divs(divs,ts, cx,cy, lg_rad , osc,dir) {
	// o: offset
	// Circle pattern
	var r = $(divs[0]).width()/2
	for (var i =0; i < divs.length; i++) {
		// update ball position
		var t_off = ts - start_time;
		var angle = i * 2 * Math.PI / divs.length + dir*t_off/3000;
		lg_r = lg_rad+(1+Math.sin(t_off/2000))*osc
		var x = cx + Math.cos(angle) * lg_r
		var y = cy + Math.sin(angle) * lg_r;
		$(divs[i]).css({
			'top':y-r,
			'left':x-r
		})
	}
}

function create_ball(parent_div,r) {
	var ball = $('<div>');

	ball.css({
		'text-align':'center',	
		'font-size':16,
		'border-style':'dashed',
		'border-color':'#00ff00',
		'padding':'None',
		'border-radius':r,
		'width':r*2,
		'height':r*2,
		'line-height':5,
		'top':HEIGHT/2-r,
		'left':WIDTH/2-r,
		'position':'fixed',
		'border-width':3
	});
	parent_div.append(ball);
	return ball;
	
}

function loop(ts) {
	if (start_time == -1) {
		start_time = ts;
	}
	for (var i=0;i<balls.length;i++) {
		rotate_divs(balls[i],ts, WIDTH/2, HEIGHT/2, 100+i*25, 10,1)
	}

	rotate_divs(out_balls,ts, WIDTH/2, HEIGHT/2, 400, 0,-1)
	rotate_divs(slogan_divs,ts, WIDTH/2, HEIGHT/2, 250, 30,-.5)
	window.requestAnimationFrame(loop)
}
