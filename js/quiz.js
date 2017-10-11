window.onload = function(e){ 
    var modal = document.getElementById('MyModal');

	var btn = document.querySelectorAll("#wrongAnswer");
	
	var close = document.getElementsByClassName("close")[0];

	for (var i = 0; i < btn.length; i++) {
		btn[i].addEventListener("click", function() {
			modal.style.display = "block";
		});
	}

	close.onclick = function() {
		modal.style.display = "none";
	}
}
