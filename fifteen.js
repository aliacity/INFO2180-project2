window.onload;
 let images = ["History","McGill","Aerial","Flag","Place des Arts"];
 let voidtile = {x:300, y:300};

//loads all the components to the screen
  window.onload = function(){
    let gameboard = document.getElementById("puzzlearea").getElementsByTagName("div");
    let shufflebutton = document.getElementById("shufflebutton");
    let imagechanger = document.createElement("button");
    let select = document.createElement("select");
    let divcontrol = document.getElementById("controls");
    let bgval = Math.floor(Math.random()*options.length);
    let image = images[bgval];
//loads the first background image to the screen the user is then able to change the image after
    for (let x=0;x<gameboard.length;x++){
      if(image === "History"){
  			gameboard[x].style.backgroundImage = "url(lhistoire.jpg)";
  		}
      if(image === "McGill"){
  			gameboard[x].style.backgroundImage = "url(mcgill.jpg)";
  		}
      if(image === "Aerial"){
  			gameboard[x].style.backgroundImage = "url(mtlabove.jpg)";
  		}
      if(image === "Flag"){
  			gameboard[x].style.backgroundImage = "url(quebec.jpg)";
  		}
      if(image === "Place des Arts"){
  			gameboard[x].style.backgroundImage = "url(PDA.jpg)";
  		}
    }
// creates the element that allows the user to switch between images, i think
    for(let y=0;y<images.length;y++){
  		let option = document.createElement("option");
  		option.text = options[y];
  		select.add(option);
  	}
    divcontrol.appendChild(select);
    imagechanger.innerHTML = "Change Background Image";
    div_control.appendChild(imagechanger);
    let move_tiles = [];
// allows the movement of the gameboard peices when clicked
    for(let x=0; x<gameboard.length;x++){
      gameboard[x].setAttribute("class", "puzzlepiece");
      gameboard[x].style.left = ((x%4)*100)+"px";
      gameboard[x].style.top = (parseInt(x/4)*100)+"px";
      gameboard[x].style.backgroundPosition = "-"+gameboard[x].style.left+" "+"-"+gameboard[x].style.top;
      gameboard[x].addEventListener("mouseover",function(){
        if(moveable(gameboard[x])){
          gameboard[x].setAttribute("class","puzzlepiece movablepiece");
        }
        else{
          gameboard[x].setAttribute("class","puzzlepiece");
        }
      });
      gameboard[x].addEventListener("click",function(){
        if(moveable(gameboard[x])){
          move(gameboard[x]);
        }
      });
    }
// randomly shuffles the pieces of the game board
    shufflebutton.addEventListener("click",function(){
  		for(let count=0;count<100;count++){
  			for(let count2=0;count2<gameboard.length;count2++){
  				if(moveable(gameboard[count2])){
  					let found = search_array(move_tiles,gameboard[count2]);
  					if(found === -1){
  						move_tiles.push(gameboard[count2]);
  					}
  				}else{
  					let remove_index = search_array(move_tiles,gameboard[count2]);
  					if(remove_index>-1){
  						move_tiles.splice(remove_index,1);
  					}
  				}
  			}
  			let rand=Math.floor(Math.random()*4);
  			if(rand<move_tiles.length){
  				move(move_tiles[rand]);
  			}
  		}
  	});

// adds the eventlistener to the button to change the background image
    imagechanger.addEventListener("click",function(){
      for(let i=0;i<gameboard.length;i++){
        let choice = select.images[select.selectedIndex];
        if(choice.text === "History"){
          gameboard[i].style.backgroundImage = "url(lhistoire.jpg)";
        }
        if(choice.text === "McGill"){
          gameboard[i].style.backgroundImage = "url(mcgill.jpg)";
        }
        if(choice.text === "Aerial"){
          gameboard[i].style.backgroundImage = "url(mtlabove.jpg)";
        }
        if(choice.text === "Flag"){
          gameboard[i].style.backgroundImage = "url(quebec.jpg)";
        }
        if(choice.text === "Place des Arts"){
          gameboard[i].style.backgroundImage = "url(PDA.jpg)";
        }
      }
    });

  }

  function moveable(tile){
  	if((parseInt(tile.style.left)===voidtile.x)&&(Math.abs(parseInt(tile.style.top)-voidtile.y)<=100)){
  		return true;
  	}
  	if((parseInt(tile.style.top)===voidtile.y)&&(Math.abs(parseInt(tile.style.left)-voidtile.x)<=100)){
  		return true;
  	}
  	return false;
  }

  function move(tile){
  	let tileswitch = {x : voidtile.x, y : voidtile.y};
  	voidtile.x = parseInt(tile.style.left);
  	voidtile.y = parseInt(tile.style.top);
  	tile.style.left = tileswitch.x+"px";
  	tile.style.top = tileswitch.y+"px";
  }

  function search_array(arr, target){
  	for(let x=0;x<arr.length;x++){
  		if(arr[x] === target){
  			return x;
  		}
  	}
  	return -1;
  }
