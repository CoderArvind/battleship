var view= {
	displaymessage: function(msg){
		var messageArea= document.getElementById("messageArea");
		messageArea.innerHTML=msg; 
	}
	displayhit: function(location)
	{
		var cell=document.getElementById(location);
		cell.setAttribute("class", "hit")
	}
	
	displaymiss: function(location)
	{
	var cell =document.getElementById(location);
	cell.setAttribute("class", "miss");
	}	
}

var model={
	boardsize:7,
	numShips:3,
	shiplength:3,
	shipSunk:0,
	
	ships:[ {location:["06","16","26"], hits : ["","",""]},
			{location:["24","34","44"], hits : ["","",""]},
			{location:["10","11","12"], hits : ["","",""]}	],
			
	fire: function(guess){
		
		for(var i=0;i<this.numShips;i++)
		{
			var ships=this.ships[i];
			var location=ships.location;
			var index= location.indexOf(guess);
			if(index >=0)
			{
				this.ships.hits[index]="hit";
				view.displaymessage("ITS A HIT..!);
				view.displayhit(guess);
				if(this.isSunk(ships))
				{
					this.shipSunk++;
					view.displaymessage("You Sank My BattleShip..!");
				}
				return true;
			}
		}
		view.displaymiss(guess);
		view.displaymessage("You Missed..!")
		return false;
		
	}
	
	isSunk:function(ships){
		
		for(var i=0:i<this.shiplength;i++){
			if(ships.hits[i]!="hit")
			{
				return false;
			}
		}
		return true;
	}
}

var controller={
	
	guesses: 0;
	
	parseGuess : function(guess){
		
		var alphabets= ["A","B","C","D","E","F","G"];
		if(guess===null || guess.length!==2)
		{
			alert("Please enter a valid location..!");
		}
		else{
		var first=guess.charAt(0);
		var row= alphabets.indexOf(first);
		var column=guess.charAt(1);
		if(isNaN(row) || column<0 || column>6 || isNaN(column))
		{
			return null;
		}
		else{
			return row+column;
		}
		
		}
	},
	
	processGuess : function(guess){
		var valid=parseGuess(guess);
		if(valid!==null)
		{
			this.guesses++;
			model.fire(valid);
			if(model.shipSunk===3)
			{
				view.displaymessage("You Sank All My BattleShips in "+this.guesses+ " guesses.");
			}
		}
		else{
			alert("Enter a valid location.");
		}
	}
}

function init(){
	var inputButton= document.getElementById("fireButton");
	inputButton.onclick= fireHandler;
	}
	
function fireHandler(){
	var input=document.getElementById("guessInput");
	var guess=input.value;
	controller.processGuess(guess);
	input.value="";
}

window.onload= init;
