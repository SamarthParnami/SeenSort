var canvas=document.querySelector('canvas');
canvas.width=innerWidth*0.97;
canvas.height=innerHeight*0.75;
var c=canvas.getContext('2d');
var element=[];
var elementRef=[];
var x=[];
var y=[];
var xRef=[];
var barWidth=30;
var gap=15;
var heightMultiplier=20;
var base=canvas.height*0.9;




var colorBars="rgba(231, 175, 234, 0.97)";
var colorTransition="rgba(250,250,0,0.75)";

var textSize=10;
var textColor="black";
var textTopPadding=textSize*1.5;

var button=1;
var count=0;










function elementEntry()
{
	var q=document.getElementById("element").value;
	if(q!="")
	{
	element=q.split(',');
	for(var i=0;i<element.length;i++)
	{
		element[i]=element[i]*1;
		elementRef[i]=element[i];
	}
	settingElement();
	draw();
	
    }
    else
    {
    	alert("Please enter array of elements to search from.");
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
			xRef[e]=x[e];
	     }		
		for(var e=element.length/2;e<element.length;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2+gap/2+(e-element.length/2)*(gap+barWidth);
			xRef[e]=x[e];
		}

	}
	else
	{
		for(var e=0;e<middle;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2-(barWidth/2)-(middle-e-1)*(gap+barWidth);
			xRef[e]=x[e];
	      }		
		for(var e=middle;e<element.length;e++)
		{
			y[e]=base-heightMultiplier*element[e];
			x[e]=canvas.width/2+(barWidth/2)+(e+1-middle)*gap+(e-middle)*barWidth;
			xRef[e]=x[e];
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
 var animationArray=[];                                             
function call()
{
	if(count==0)
	{
		count++;
		elementEntry();
	button=1;
	var i=1;
	var j=0

   for(let j=0;j<element.length;j++)
   {
   	for(let i=1;i<element.length-j;i++)
   	{
   		if(elementRef[i]<elementRef[i-1])
   		{
   			var temp=elementRef[i];
   			elementRef[i]=elementRef[i-1];
   			elementRef[i-1]=temp;
   			animationArray.push(i);
   		}
   		
   	}
   }
   
   animate(0);

	}

	
}
function move(q,k)
{
	var i=q;
	var j=k;
	console.log(i+" "+k);
}
function animate(q)
{
	var index=q;
   var i=animationArray[q];

   if(index==animationArray.length)
   {
   	cancelAnimationFrame(raf);
   	return 0;
   }
    var raf=requestAnimationFrame(function()
   {
   	animate(index);
   });
if(button==1)
{
if(element[i]<element[i-1])
{
   	if(x[i]!=xRef[i-1]||x[i-1]!=xRef[i])
   	{
   		if(x[i]!=xRef[i-1])
   		{
   			x[i]--;
   		}
   		if(x[i-1]!=xRef[i])
   		{
   			x[i-1]++;
   		}
   		draw();

   	}
   else if(x[i]==xRef[i-1]&&x[i-1]==xRef[i])
   {
   	
   	cancelAnimationFrame(raf);
   	setTimeout(function()
   	{
   		var temp=element[i];
   	element[i]=element[i-1];
   	element[i-1]=temp;
    temp=y[i];
    y[i]=y[i-1];
    y[i-1]=temp;
    temp=x[i];
    x[i]=x[i-1];
    x[i-1]=temp;
    index++;
    animate(index);
},1000);

   }
   else if(index==animationArray.length)
   {
   	cancelAnimationFrame(raf);
   	alert("Array Sorted");
   	return 0;
   }
 }   
  else
  {
  	index++;
  }
}
	
	
}
function mover(q)
{
	var i=q;
	console.log(xRef[i]+"  "+x[i]);
	if(xRef[i]!=x[i]||xRef[i-1]!=x[i-1])
	{
		if(xRef[i]!=x[i])
		{
			x[i]--;
		}
		if(xRef[i-1]!=x[i-1])
		{
			x[i-1]++;
		}
	}
	else if(xRef[i]==x[i]&&xRef[i-1]==x[i-1])
	{
		cancelAnimationFrame(raf);
		var temp=element[i];
		element[i]=element[i-1];
		element[i-1]=temp;
		temp=y[i-1];
		y[i-1]=y[i];
		y[i]=temp;
		return 0;
	}
	var raf=requestAnimationFrame(function()
	{
		mover(i);
	})
}
function eventManager()
{
	button=button*(-1);
	if(button==-1)
	{
		document.getElementById('play').innerHTML="Play";
		document.getElementById('abr').title="Play"
	}
	else
	{
		document.getElementById('play').innerHTML="Pause";
		document.getElementById('abr').title="Pause"
	}
}