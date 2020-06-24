var canvas=document.querySelector('canvas');
canvas.width=innerWidth*0.97;
canvas.height=innerHeight*0.75;
var c=canvas.getContext('2d');
var element=[];
var max=9;
var min=1;
var x=[];
var xRef=[];
var y=[];

var topline=canvas.height*0.1;
var barWidth=30;
var gap=15;
var heightMultiplier=15;
var base=canvas.height*0.9;




var colorBars="rgba(231, 175, 234, 0.97)";
var colorTransition="rgba(250,250,0,0.75)";

var textSize=10;
var textColor="black";
var textTopPadding=textSize*1.5;


var rangeElements=[];
var elementCount=[];
var elementIndexEnrty=[];
var rangeX=[];
var rangeY=[];

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
		if(element[i]<0)
		{
			alert("Please do not enter negative numbers.Page may not work properly.");
		}
		else
		{
			element[i]=element[i]*1;
		}
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
			y[e]=topline;
			x[e]=canvas.width/2-(gap/2)-(element.length/2-e-1)*gap-(element.length/2-e)*barWidth;
			xRef[e]=x[e];
	     }		
		for(var e=element.length/2;e<element.length;e++)
		{
			y[e]=topline;
			x[e]=canvas.width/2+gap/2+(e-element.length/2)*(gap+barWidth);
			xRef[e]=x[e];
		}

	}
	else
	{
		for(var e=0;e<middle;e++)
		{
			y[e]=topline;
			x[e]=canvas.width/2-(barWidth/2)-(middle-e-1)*(gap+barWidth);
			xRef[e]=x[e];
	      }		
		for(var e=middle;e<element.length;e++)
		{
			y[e]=topline;
			x[e]=canvas.width/2+(barWidth/2)+(e+1-middle)*gap+(e-middle)*barWidth;
			xRef[e]=x[e];
		}

	}
	findRange();
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
		c.fillText(element[i],(x[i]+(barWidth-textSize)/2+textSize/5),(y[i]+element[i]*heightMultiplier+textTopPadding));
	}
var k=0
	for(var i=min;i<=max;i++)
	{
	    c.fillStyle=colorBars;
	    c.fillRect(rangeX[k],rangeY[k],barWidth,rangeElements[k]*heightMultiplier);
	    c.font=textSize+"px arial"
		c.fillStyle=textColor;
		c.fillText(elementCount[k],(rangeX[k]+(barWidth-textSize)/2+textSize/5),(rangeY[k]-textTopPadding));
		c.fillText(rangeElements[k],(rangeX[k]+(barWidth-textSize)/2+textSize/5),(base+textTopPadding));
		k++;
	}
}
function findRange()
{
	console.log()
 
 for(var t=0;t<element.length;t++)
 {

 	if(element[t]>max)
 	{
 		max=element[t];
 	}
 	
 }
 
 settingRange();
}
function settingRange()
{
	var k=0;
   for(var t=min;t<=max;t++)
   {
       rangeElements[k]=t;
       k++;
   }
    var middle=(rangeElements.length+1)/2;
	if(rangeElements.length%2==0)
	{
		for(var e=0;e<rangeElements.length/2;e++)
		{
			rangeY[e]=base-rangeElements[e]*heightMultiplier;
			rangeX[e]=canvas.width/2-(gap/2)-(rangeElements.length/2-e-1)*gap-(rangeElements.length/2-e)*barWidth;
	     }		
		for(var e=rangeElements.length/2;e<rangeElements.length;e++)
		{
			rangeY[e]=base-rangeElements[e]*heightMultiplier;
			rangeX[e]=canvas.width/2+gap/2+(e-rangeElements.length/2)*(gap+barWidth);
		}

	}
	else
	{
		for(var e=0;e<middle;e++)
		{
			rangeY[e]=base-rangeElements[e]*heightMultiplier;
			rangeX[e]=canvas.width/2-(barWidth/2)-(middle-e-1)*(gap+barWidth);
	      }		
		for(var e=middle;e<rangeElements.length;e++)
		{
			rangeY[e]=base-rangeElements[e]*heightMultiplier;
			rangeX[e]=canvas.width/2+(barWidth/2)+(e+1-middle)*gap+(e-middle)*barWidth;
		}

	}
	for(var t=0;t<rangeElements.length;t++)
	{
		
		elementCount[t]=0;
	}
	
}
function call()
{
	if(count==0)
	{
		elementEntry();
		count++;
	var i=0;
	for(let k=0;k<rangeElements.length;k++)
	{
		for(let y=0;y<element.length;y++)
		{
			if(element[y]==k+1)
			{
				elementIndexEnrty.push(y);
				
			}
		}
	}
	
	animate(i);
	count=0;
	}

}
function animate(i)
{
	
	var index=i;
	var raf=requestAnimationFrame(function(){
		animate(index);
	});
	if(button==1)
	{
	if(index<element.length)
	{
		if((x[index]-rangeX[element[index]-1]<1&&x[index]-rangeX[element[index]-1]>-1)&&(y[i]-rangeY[element[index]-1]<1&&y[i]-rangeY[element[index]-1]>-1))
		{
			x[index]=rangeX[element[index]-1];
			elementCount[element[index]-1]++;
			index++;
		}
		else if(x[index]!=rangeX[element[index]-1])
		{
			if(x[index]<rangeX[element[index]-1])
			{
				y[index]=y[index]+((rangeY[element[index]-1]-y[i])/(rangeX[element[index]-1]-x[index]))*1;
				x[index]+=1;

			}
			if(x[index]>rangeX[element[index]-1])
			{
					y[index]=y[index]-((rangeY[element[index]-1]-y[i])/(rangeX[element[index]-1]-x[index]))*1;
					x[index]-=1;
				
				
			}
			draw();
			
		}
		
		else if(x[i]==rangeX[element[index]-1])
		{
			if(y[index]>rangeY[element[index]-1])
			{
				y[i]-=1;
			}
			else if(y[index]<rangeY[element[index]-1])
			{
				y[index]+=1;
			}
			draw();
		}
		
	}
	else
	{
		
		cancelAnimationFrame(raf);
		returningBack(0);
	}
}

}
function returningBack(i)
{
	var index=i;
	
	var raf=requestAnimationFrame(function(){
		returningBack(index);
	});
	if(button=1)
	{
	if(index<element.length)
	{
		 if((xRef[index]-x[elementIndexEnrty[index]]<1&&xRef[index]-x[elementIndexEnrty[index]]>-1)&&(y[elementIndexEnrty[index]]-topline<1&&topline-y[elementIndexEnrty[index]]>-1))
		{
			
			elementCount[element[elementIndexEnrty[index]]-1]--;
			index++;
		}
		else if(xRef[index]!=x[elementIndexEnrty[index]])
		{
			
			if(xRef[index]<x[elementIndexEnrty[index]])
			{
				y[elementIndexEnrty[index]]=y[elementIndexEnrty[index]]-((topline-y[elementIndexEnrty[index]])/(xRef[index]-x[elementIndexEnrty[index]]))*1;
        		x[elementIndexEnrty[index]]-=1;
			}
			else if(xRef[index]>x[elementIndexEnrty[index]])
			{
				y[elementIndexEnrty[index]]=y[elementIndexEnrty[index]]+((topline-y[elementIndexEnrty[index]])/(xRef[index]-x[elementIndexEnrty[index]]))*1;
				x[elementIndexEnrty[index]]+=1;
			}
			draw();
		}
		
		else if(xRef[index]==x[elementIndexEnrty[index]])
		{
			
			if(y[elementIndexEnrty[index]]>topline)
			{
				y[elementIndexEnrty[index]]-=2;
			}
			else if(y[elementIndexEnrty[index]]<topline)
			{
				y[elementIndexEnrty[index]]+=2;
			}
			draw();
		}
		
	}
	else
	{
		draw();
		cancelAnimationFrame(raf);
		alert("Array Sorted");
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



