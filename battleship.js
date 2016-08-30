var view = {
	displaymessage: function(msg){
		var messageArea= document.getElementById("messageArea");
		messageArea.innerHTML=msg; 
	},
	displayhit: function(location)
	{
		var cell=document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	
	displaymiss: function(location)
	{
	var cell =document.getElementById(location);
	cell.setAttribute("class", "miss");
	}	
};


var model = {
	boardsize: 7,
	numShips: 3,
	shiplength: 3,
	shipSunk: 0,
	
	ships : [ {location:["0","0","0"], hits : ["","",""]},
			{location:["0","0","0"], hits : ["","",""]},
			{location:["0","0","0"], hits : ["","",""]}	],
			
	fire: function(guess){
		
		for(var i=0;i<this.numShips;i++)
		{
			var ship=this.ships[i];
			var index= ship.location.indexOf(guess);
			if(index >=0)
			{
				ship.hits[index]="hit";
				view.displaymessage(" Yoooooooo....!!   ITS A HIT..!");
				view.displayhit(guess);
				if(this.isSunk(ship))
				{
					this.shipSunk++;
					view.displaymessage("You Sank My BattleShip..!");
				}
				return true;
			}
		}
		view.displaymiss(guess);
		view.displaymessage("You Missed..! Ha ha ha ha ... Loser.");
		return false;
		
	},
	
	
	isSunk: function(ship){
		
		for(var i=0;i<this.shiplength;i++){
			if(ship.hits[i] !=="hit")
			{
				return false;
			}
		}
		return true;
	},
	
	generateShipsLocation : function()
	{
		for(var i=0;i<this.numShips;i++)
		{
		var newLocation=this.generateShips();
		var uniqueLoc= this.collision(newLocation);
		if(uniqueLoc == true)
		{
		this.ships[i].location=newLocation;
		}
		else
		{
			model.generateShipsLocation();
		}
		}
	},
	
	generateShips : function() 
	{
		var row;
		var col;
		var side= Math.floor(Math.random()*2);
		var shipLocation = [ ];
		if(side==0)
		{
			var row=Math.floor(Math.random()*this.boardsize);
			var col=Math.floor(Math.random()*(this.boardsize-3));
			for(var i=0;i<this.shiplength;i++)
			{
			
			shipLocation[i]=row+""+(col+i);
			}
		}
		else
		{
			var col=Math.floor(Math.random()*this.boardsize);
			var row=Math.floor(Math.random()*(this.boardsize-3));
			for(var i=0;i<this.shiplength;i++)
			{
			
			shipLocation[i]=(row+i)+""+col;
			}
		}
		return shipLocation;
	},
	
	collision : function(location)
	{
		for(var i=0;i<this.shiplength;i++)
		{
			var loc= location[i];
			for(var j=0;j<this.numShips;j++)
			{
				var match=this.ships[j].location.indexOf(loc);
				if(match>=0)
				{
				return false;
				}
			}
		}
		return true;
	}
};


 function parseGuess(guess){
		
		var alphabets= ["A","B","C","D","E","F","G"];
		if(guess===null || guess.length !==2)
		{
			alert("Where are you shooting...Shoot properly.!");
		}
		else{
		var first=guess.charAt(0);
		var row= alphabets.indexOf(first);
		var column=guess.charAt(1);
		if(isNaN(row) || column<0 || column>6 || isNaN(column) || row>6 || row<0)
		{
			alert("Oops..Go and learn how to shoot!");
		}
		else{
			return row + column;
		}
		
		}
		return null;
	}
	

var controller={
	
	guesses: 0,
	
	
	processGuess : function(guess){
		var valid=parseGuess(guess);
		if(valid)
		{
			this.guesses++;
			model.fire(valid);
			if(model.shipSunk===model.numShips)
			{
				view.displaymessage("You Sank All My BattleShips in "+this.guesses+ " guesses.");
			}
		}
	}
}; 
	 
	  
function init(){
	var inputButton= document.getElementById("fireButton");
	inputButton.onclick= fireHandler;
	model.generateShipsLocation();
	}
	
function fireHandler(){
	var input=document.getElementById("guessInput");
	var guess=input.value;
	controller.processGuess(guess);
	input.value="";
}

window.onload= init; 
