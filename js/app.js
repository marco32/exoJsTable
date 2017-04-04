var liste = [];
var table = ["table 0", "table 1", "table 2", "table 3", "table 4", "table 5"];
var idtable = 0;
var archiveA = [];
var archiveB = [];

function affiche() {
	var a = localStorage.getItem('liste');
	if( a != null ) {
		liste = JSON.parse( a );
	}
}

function afficheA() {
	var b = localStorage.getItem('archiveA');
	if( b != null ) {
		archiveB = JSON.parse( b );
	}
}

function stockage() {
	localStorage.setItem('liste', JSON.stringify(liste));
	localStorage.setItem('archiveA', JSON.stringify(archiveA));
}

$(document).ready(function() {
	affiche();
	afficheA()

	$("#AddList").click(function() {
		var pers = { 
			"prenom": $("#inputPrenom").val(),	
		}
		liste.push(pers)
		console.log(liste)
		generer();
		stockage();
		$("#inputPrenom").val("");		
	});

	function generer() {
		$('#membres').html('')
		for (var i = 0; i < liste.length; i++) {
			var un = liste[i] 
			var ligne = $('<ul />').data("ID",i);
			$("#membres").append(ligne)
			$("<li>" + "<button>Supp</button>" + un.prenom + " " + "</li>").appendTo(ligne);
			stockage();
		}	
	}

	$('#membres').delegate('button', 'click', function(){
		var ligne = $(this).parent().parent();
		var ID = ligne.data('ID');
		ligne.remove();
		liste.splice(ID, 1);
		console.log( liste );
		stockage();
		generer();
	});

	function generergroupe() {
		shuffle(liste);
		$('#group').html('')
		for (var i = 0; i < liste.length; i++) {
			var nomPersonne = liste[i];
			$("#group").append ("<li>" + nomPersonne.prenom + " " + "est a la table " + idtable + "</li>");
			var archive ={
				"prenom":nomPersonne.prenom,
				"place" : "est a la table",
				"table": idtable
			}
			console.log(archive)			
			if(idtable >= 4 ){
				idtable=0
			}else {
				idtable++;
			}
			archiveA.push(archive);
			stockage()
		}
	}

	function ancien() {
		$('#ancien').html('')
		for (var i = 0; i < archiveB.length; i++) {
			var deux = archiveB[i] 
			var div = $("<div>"+ deux.prenom + " " + deux.place + " " + deux.table + "</div>")
			$('#ancien').append(div);		
		}	
	}

	$("#View").click(function() {
		generer(liste);
	});

	$("#Group").click(function() {
		generergroupe(liste);
	});

	$("#Archive").click(function() {
		ancien();
	});
});


