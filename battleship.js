var view= {
	displaymessage: function(msg){
		var messageArea= document.getElementById("messageArea").value;
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