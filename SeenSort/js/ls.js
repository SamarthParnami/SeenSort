var canvas=document.querySelector('canvas');
canvas.width=innerWidth*0.97;
canvas.height=innerHeight*0.75;
var c=canvas.getContext('2d');
var element=[];
var search;
var searchX;
var searchY;
var x=[];
var y=[];
var heightMultiplier=20;
var base=canvas.height*0.9;
var gap=15;
var barWidth=30;
var colorLoading="blue";
var colorMatchFail="rgba(250,0,0,1)";//rgba(250,0,0,1)
var colorMatchPass="rgba(0,250,0,1)";
var colorTransition="rgba(250, 246, 2,0.75)";//
var colorBars="rgba(231, 175, 234, 0.97)";
var searchSpeed=1;
var textSize=18;
var textColor="black";
var textTopPadding=18;          //keep it greater than textSize


var button=1;





function elementEntry()
{
	var q=document.getElementById("element").value;
	if(q!="")
	{
	element=q.split(',');
	settingElement();
	draw();
    }
    else
    {
    	alert("Please enter array of elements to search from.");
    }
}
function searchEntry()
{
	elementEntry();
	var q=document.getElementById("search").value;
	if(q!="")
	{
	search=q;
	
    }
    else 
    {
    	alert("Please enter some value in search bar");
    }
}
function settingElement()
{
  var middle=(element.length+1)/2;
	if(element.length%2==0)
	{
		for(var e=0;e<element.length/2;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2-(gap/2)-(element.length/2-e-1)*gap-(element.length/2-e)*barWidth;
	     }		
		for(var e=element.length/2;e<element.length;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2+gap/2+(e-element.length/2)*(gap+barWidth);
		}

	}
	else
	{
		for(var e=0;e<middle;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2-(barWidth/2)-(middle-e-1)*(gap+barWidth);
	      }		
		for(var e=middle;e<element.length;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2+(barWidth/2)+(e+1-middle)*gap+(e-middle)*barWidth;
		}

	}
}
function draw()
{
	c.clearRect(0,0,canvas.width,canvas.height);
	
	for(var i=0;i<element.length;i++)
	{
	    c.fillStyle=colorBars;
	    c.fillRect(x[i],y[i],barWidth,element[i]*heightMultiplier);
	    c.font=textSize+"px arial"
		c.fillStyle=textColor;
		c.fillText(element[i],(x[i]+(barWidth-textSize)/2+textSize/5),(base+textTopPadding));
	}
}
function selfClean()
{
      c.clearRect(searchX-1,searchY-1,barWidth+2,search*heightMultiplier+2);
}
function startBlinking()
{
	var raf=requestAnimationFrame(startBlinking);
	
	selfClean();
	c.fillStyle=colorMatchPass;
	c.fillRect(searchX,searchY,barWidth,search*heightMultiplier);
	setTimeout(function(){
		startBlinking();
	},500);
	cancelAnimationFrame(raf);
	
}
function searching(i)
{
	var h=i;
	var raf=requestAnimationFrame(function(){
		searching(h);
	});
	
	if(button==1)
	{
	if(searchX==x[i]&&i<element.length)
	{
		
       // draw();
        cancelAnimationFrame(raf);
        
        
        	setTimeout(function()
        	{
        		if(search==element[i])
		{
			draw();
	        selfClean();
	        c.fillStyle=colorMatchPass;
	        c.fillRect(searchX,searchY,barWidth,search*heightMultiplier);
	        cancelAnimationFrame(raf);
			alert(search+" found at index postion "+h+" of the array");
			eventManager();
			return h;
		}
		else
		{
			console.log("2");
			draw();
	        selfClean();
	        c.fillStyle=colorMatchFail;
	        c.fillRect(searchX,searchY,barWidth,search*heightMultiplier);
	        
			h++;
		}
        		
searching(h);
        	},500)
        	if(search==element[i])
		{
			draw();
	        selfClean();
	        c.fillStyle=colorMatchPass;
	        c.fillRect(searchX,searchY,barWidth,search*heightMultiplier);
	        
		}
		else
		{
			console.log("2");
			draw();
	        selfClean();
	        c.fillStyle=colorMatchFail;
	        c.fillRect(searchX,searchY,barWidth,search*heightMultiplier);
	        
			
		}
        	

        
	}
	else if(searchX!=x[i]&&i<element.length)
    {
    	selfClean();
	    draw();
		
		c.fillStyle=colorTransition;
		c.fillRect(searchX,searchY,barWidth,search*heightMultiplier);
		searchX+=searchSpeed;
	}
	else
	{
   		cancelAnimationFrame(raf);
   		alert(search+" is not present in the array");
   		return h;
	}
	}
}
function call()
{
	element.length=0;
	x.length=0;
	y.length=0;
	searchEntry();

   var	i=0;
   searchX=x[0]-barWidth-gap;
   searchY=base-(search*heightMultiplier);
   console.log(x);
   i=searching(i);
   
   i=0;
   button=1;
}
function eventManager()
{
	button=button*(-1);
	if(button==-1)
	{
		document.getElementById('play').innerHTML="Play";
		document.getElementById('abr').title="Play";
	}
	else
	{
		document.getElementById('play').innerHTML="Pause";
		document.getElementById('abr').title="Pause";
	}
}