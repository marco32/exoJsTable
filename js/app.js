var liste = [];
function affiche() {
	var a = localStorage.getItem('liste');

	if( a != null ) {
		liste = JSON.parse( a );
	}
	console.log( liste );
}

function stockage() {
	localStorage.setItem('liste', JSON.stringify(liste));
}


$(document).ready(function() {
	affiche();

	$("#AddList").click(function() {
		var pers = { 
			"nom" :$("#inputNom").val(),
			"prenom": $("#inputPrenom").val(),
			
		}

		liste.push(pers)

		console.log(liste)
		stockage();
		$("#inputPrenom").val("");
		$("#inputNom").val("");
	});

	function generer() {
		$('#liste').html('')
		for (var i = 0; i < liste.length; i++) {
			var un = liste[i] 
			var ligne = $('<tr/>').data("ID",i);

			$("<td>"+ un.nom +"</td>").appendTo(ligne);
			
			$('#liste').append( ligne );
			stockage();
		}	
	}
	
		function generergroupe() {
		shuffle(liste);

		console.log(liste)
			
		}	

	

	$("#View").click(function() {
		generer(liste);
	});

	$("#Group").click(function() {
		generergroupe(liste);
	});
	
















});