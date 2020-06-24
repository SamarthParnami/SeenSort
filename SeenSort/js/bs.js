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
var heightMultiplier=15;
var base=canvas.height*0.9;
var gap=15;
var barWidth=25;




var colorBars="rgba(231, 175, 234, 0.97)";
var colorMatchSuccess="rgba(0,250,0,0.75)";
var colorMatchFail="rgba(250,0,0,0.75)";
var colorTransition="rgba(250,250,0,0.75)";


var textSize=10;
var textColor="black";
var textTopPadding=textSize*1.5;

var button=1;












function elementEntry()
{
	var q=document.getElementById("element").value;
	if(q!="")
	{
	element=q.split(',');
	for(var i=0;i<element.length;i++)
	{
		element[i]=element[i]*1;
	}
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
		elementEntry();
	search=q;
    call();
	
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

function call()
{
	var i=0;
	var beg=0;
	var end=element.length-1;
	button=1;
	animation(i,beg,end);

}
function animation(i,b,e)
{
	
	
	
	var h=i;
	var beg=b;
	var end=e;
	if(button==1)
{
	searchX=x[Math.floor((beg+end+1)/2)];
	var raf=requestAnimationFrame(function()
	{
		animation(h,beg,end);
	});


	if(beg<=end)
	{
		var middle=Math.floor((beg+end+1)/2);
		

		cancelAnimationFrame(raf);
        setTimeout(function()
        {
              c.fillStyle=colorTransition;
			  c.fillRect(searchX,base-search*heightMultiplier,barWidth,heightMultiplier*search);
        	setTimeout(function()
        	{
        		if(search==element[middle])
		    {
            	draw();
            	c.fillStyle=colorMatchSuccess;
		    	c.fillRect(searchX,base-search*heightMultiplier,barWidth,heightMultiplier*search);
		    	alert(search+" found at index position "+middle);
		    	return 0;
		    }
		
			else if(element[middle]<search)
			{
				beg=middle+1;
				draw();
				c.fillStyle=colorMatchFail;
				c.fillRect(searchX,base-search*heightMultiplier,barWidth,heightMultiplier*search);
				cancelAnimationFrame(raf);
				setTimeout(function()
				{
					c.clearRect(searchX,base-search*heightMultiplier,barWidth,heightMultiplier*search);
					draw();
				},1000);

			}
		
			else if(search<element[middle])
			{
				end=middle-1;
				draw();
        		c.fillStyle=colorMatchFail;
				c.fillRect(searchX,base-search*heightMultiplier,barWidth,heightMultiplier*search);
				cancelAnimationFrame(raf);
				setTimeout(function()
				{
					c.clearRect(searchX,base-search*heightMultiplier,barWidth,heightMultiplier*search);
					draw();
				},1000);
				
			}
			animation(h,beg,end);
		},1500);
		


        	
        	},1000);
         
		
	}
	else
	{
		cancelAnimationFrame(raf);
		alert(search+" is not in the input array.");
		return 0;
	}
}


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