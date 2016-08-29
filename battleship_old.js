var location1=Math.floor(Math.random()*5);
console.log(location1);
var location2=location1+1;
console.log(location2);
var location3=location1+2;
console.log(location3);

var guess;
var hits=0;
var guesses=0;
var isSunk=false;

while(isSunk==false)
{
	guess= prompt("Guess a number from 0-6.");
	
	if(guess<0 || guess >6)
	{
		alert("Invalid Number guessed. Please enter a valid guess");
		
	}
	else{
		guesses=guesses+1;
		if(guess==location1)
		{
		hits=hits+1;
		alert("Thats a HIT.!!");
		location1=null;
		}
		else if(guess==location2)
		{
			hits=hits+1;
		alert("Thats a HIT.!!");
		location2=null;
		}
		else if(guess== location3)
		{
			hits=hits+1;
		alert("Thats a HIT.!!");
		location3=null;	
		}
		else{
			alert("you missed. Try again.!");
		}
		if(hits==3)
		{
			isSunk=true;
			Alert("you have sunk my Battleships..!");
		}
		if(guesses==3)
		{
			alert("Good try. But you lost.");
			break;
		}
	}
	
	
	
	
}