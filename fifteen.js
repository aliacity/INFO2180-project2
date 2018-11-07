//Extra Feature : Multiple Backgrounds
let empty_tile = {x: 300, y :300};
let options = ["History", "McGill", "Aerial","Flag","Place des Arts"];
window.onload = function(){
	let gameboard = document.getElementById("puzzlearea").getElementsByTagName("div");
	let button = document.getElementById("shufflebutton");
	let div_control = document.getElementById("controls");
	let select = document.createElement("select");
	let change_image = document.createElement("button");
	let background_value = Math.floor(Math.random()*options.length);
	let image = options[background_value];
	for(let index=0;index<gameboard.length;index++){
		if(image === "History"){
			gameboard[index].style.backgroundImage = "url(lhistoire.jpg)";
		}
		if(image === "McGill"){
			gameboard[index].style.backgroundImage = "url(mcgill.jpg)";
		}
		if(image === "Aerial"){
			gameboard[index].style.backgroundImage = "url(mtlabove.jpg)";
		}
		if(image === "Flag"){
			gameboard[index].style.backgroundImage = "url(quebec.jpg)";
		}
		if(image === "Place des Arts"){
			gameboard[x].style.backgroundImage = "url(PDA.jpg)";
		}
	}
	for(let index=0;index<options.length;index++){
		let option = document.createElement("option");
		option.text = options[index];
		select.add(option);
	}
	div_control.appendChild(select);
	change_image.innerHTML = "Change Image";
	div_control.appendChild(change_image);
	let move_tiles = [];
	for(let index=0; index<gameboard.length;index++){
		gameboard[index].setAttribute("class", "puzzlepiece");
		gameboard[index].style.left = ((index%4)*100)+"px";
		gameboard[index].style.top = (parseInt(index/4)*100)+"px";
		gameboard[index].style.backgroundPosition = "-"+gameboard[index].style.left+" "+"-"+gameboard[index].style.top;
		gameboard[index].addEventListener("mouseover",function(){
			if(moveable(gameboard[index])){
				gameboard[index].setAttribute("class","puzzlepiece movablepiece");
			}
			else{
				gameboard[index].setAttribute("class","puzzlepiece");
			}
		});
		gameboard[index].addEventListener("click",function(){
			if(moveable(gameboard[index])){
				move(gameboard[index]);
			}
		});
	}
	button.addEventListener("click",function(){
		for(let count=0;count<100;count++){
			for(let index=0;index<gameboard.length;index++){
				if(moveable(gameboard[index])){
					let found = search_array(move_tiles,gameboard[index]);
					if(found === -1){
						move_tiles.push(gameboard[index]);
					}
				}else{
					let remove_index = search_array(move_tiles,gameboard[index]);
					if(remove_index>-1){
						move_tiles.splice(remove_index,1);
					}
				}
			}
			let random_value=Math.floor(Math.random()*4);
			if(random_value<move_tiles.length){
				move(move_tiles[random_value]);
			}
		}
	});
	change_image.addEventListener("click",function(){
		for(let index=0;index<gameboard.length;index++){
			let choice = select.options[select.selectedIndex];
			if(choice.text === "History"){
				gameboard[index].style.backgroundImage = "url(lhistoire.jpg)";
			}
			if(choice.text === "McGill"){
				gameboard[index].style.backgroundImage = "url(mcgill.jpg)";
			}
			if(choice.text === "Aerial"){
				gameboard[index].style.backgroundImage = "url(mtlabove.jpg)";
			}
			if(choice.text === "Flag"){
				gameboard[index].style.backgroundImage = "url(quebec.jpg)";
			}
			if(choice.text === "Place des Arts"){
				gameboard[index].style.backgroundImage = "url(PDA.jpg)";
			}
		}
	});
}
function moveable(tile){
	if((parseInt(tile.style.left)===empty_tile.x)&&(Math.abs(parseInt(tile.style.top)-empty_tile.y)<=100)){
		return true;
	}
	if((parseInt(tile.style.top)===empty_tile.y)&&(Math.abs(parseInt(tile.style.left)-empty_tile.x)<=100)){
		return true;
	}
	return false;
}
function move(tile){
	let swap_tile = {x : empty_tile.x, y : empty_tile.y};
	empty_tile.x = parseInt(tile.style.left);
	empty_tile.y = parseInt(tile.style.top);
	tile.style.left = swap_tile.x+"px";
	tile.style.top = swap_tile.y+"px";
}
function search_array(arr, target){
	for(let index=0;index<arr.length;index++){
		if(arr[index] === target){
			return index;
		}
	}
	return -1;
}
