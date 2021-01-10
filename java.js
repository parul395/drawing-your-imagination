$(function(){
    
    $("#slider").slider({
        min: 5,
        max: 35,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            
        }
        
    });
    


var paint=false;//first time painting
var paint_erase= "paint";
var canvas = document.getElementById("paint");
var ctx= canvas.getContext("2d");
var container=$("#container");
var mouse= {x: 0, y: 0};
if(localStorage.getItem("imgcanvas")!=null){
    
    var img = new Image(); //constructor
    img.onload = function(){
        ctx.drawImage(img,0,0);
        
    }
    img.src= localStorage.getItem("imgcanvas");
}

ctx.lineWidth=5;
ctx.lineJoin="round";
ctx.lineCap="round";
//click inside container
container.mousedown(function(e){
   paint=true;
    ctx.beginPath();
    mouse.x=e.pageX-this.offsetLeft;
    mouse.y=e.pageY-this.offsetTop;
    ctx.moveTo(mouse.x,mouse.y);
    
    
});

container.mousemove(function(e){
                  
 mouse.x= e.pageX-this.offsetLeft;
    mouse.y=e.pageY-this.offsetTop;
    if(paint == true){
        
        
        if(paint_erase == "paint"){
            //get color input
            ctx.strokeStyle = $("#paintcolor").val();
            
            
        }
        else{
           
            ctx.strokeStyle= "white";
        }
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }
                  
                  
                  });
container.mouseup(function(){
    paint = false;
});
container.mouseleave(function(){
    paint = false;
});


$("#save").click(function(){
    
  
    if(typeof(localStorage) != null ){
   localStorage.setItem("imgcanvas", canvas.toDataURL()); 
       
    
}else{
    
    window.alert("Your device doesn't support local storage");
}
    
});
$("#reset").click(function(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    paint_erase="paint";
    $("#erase").removeClass("erasemode");
    
});

$("#erase").click(function(){
    
    if(paint_erase == "paint")
        {
            paint_erase ="erase";
           
        }
    else{
        paint_erase="paint"
    }
    $(this).toggleClass("erasemode");
    
    
});
    
    $("#paintcolor").change(function(){
        
        
        $("#circle").css("background-color",$(this).val());
        
    });
    
    
    
     $("#slider").slider({
        min: 5,
        max: 35,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth=ui.value;
            
        }
        
    });
    

    
    
    });

