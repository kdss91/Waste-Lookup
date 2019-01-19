var data;
var fav = {};
var objData = {};

function readFile(searchString){
var xmlhttp = new XMLHttpRequest();
var url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    displayResults(searchString);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}


function displayResults(searchString){
	$("#result-list-group").empty();
	objData={};
	for(var i=0;i<data.length;i++){
		 if((data[i]['title'].toLowerCase().search(searchString.toLowerCase())>=0 || data[i]['keywords'].toLowerCase().search(searchString.toLowerCase())>=0 ) && searchString!=''){
		 		if(fav.hasOwnProperty(data[i]['title']))
		 			$("#result-list-group").append("<li><span><i class='fas fa-star' id='" + data[i]['title'] + "'></i>" 
		 				+ data[i]['title']  +  "</span>" + data[i]['body'] + "</li>");
		 		else
		 			$("#result-list-group").append("<li><span><i class='far fa-star' id='" + data[i]['title'] + "'></i>" 
		 				+ data[i]['title']  +  "</span>" + data[i]['body'] + "</li>");
		 		objData[data[i]['title']] = data[i]['body'];
		 } 	
	}
}


$("#searchBox").keypress(function(event){
	if(event.which === 13){
		var todoText = $(this).val();
		readFile(todoText);
	}
});


$("#searchBox").keyup(function(){
	if($(this).val().length<1){
		$("#result-list-group").empty();
		objData={};
	}
});


$(".fa-search").click(function(event){
	var todoText = $("#searchBox").val();
		readFile(todoText);
});


$("#result-list-group").on("click","i",function(){
	var myId = $(this).attr('id');
	$(this).toggleClass("far fas");
	if($(this).hasClass("fas")){
		fav[myId] = objData[myId];
	}else {
		delete fav[myId];
	}
	displayFavourites();
});


$("#fav-list-group").on("click","i",function(){
	var myId = $(this).attr('id');
	delete fav[myId.substring(4)];
	document.getElementById(myId.substring(4)).setAttribute('class','far fa-star');
	displayFavourites();
});


function displayFavourites(){
	$("#fav-list-group").empty();
	Object.keys(fav).forEach(function(key) {
		$("#fav-list-group").append("<li><span><i class='fas fa-star' id='fav_" + key + "'></i>" + key + "</span>" + fav[key] + "</li>");
	});	
}

