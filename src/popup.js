window.onload = function() {
    passEtiqPage.style.display = "none";
	passStrengthPage.style.display = "block";
	threeRandom.style.display = "none";
	generalTips.style.display = "none";
	extraSecurity.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {

	var passPageButton = document.getElementById("passPageButton");
	var threeWordsButton = document.getElementById("threeWordsButton");
	var generalTipsButton = document.getElementById("generalTipsButton");
	var extraSecurityButton = document.getElementById("extraSecurityButton");
	
    passPageButton.addEventListener('click', function(){
		passPageToggle();
	});
	threeWordsButton.addEventListener('click', function(){
		threeWordsToggle();
	});
	generalTipsButton.addEventListener('click', function(){
		generalTipsToggle();
	});
	extraSecurityButton.addEventListener('click', function(){
		extraSecurityToggle();
	});
});

function passPageToggle() {
	var x = document.getElementById("passStrengthPage");
	var y = document.getElementById("passEtiqPage");
	
	if (x.style.display === "none") {
		passCheckButton.style.visibility = "visible";
		y.style.display = "none";
		x.style.display = "block";
		passForm.style.display = "block";
	} else {
		document.getElementById("passPageButton").value = "Back to Main Page";
		passCheckButton.style.visibility = "hidden";
		passSecuritySummary.style.display = "block";
		x.style.display = "none";
		y.style.display = "block";
		passForm.style.display = "none";
	}
};

function threeWordsToggle() {
	passSecuritySummary.style.display = "none";
	
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");
	
	x.style.display = "block";
	y.style.display = "none";
	z.style.display = "none";
};

function generalTipsToggle() {
	passSecuritySummary.style.display = "none";
	
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");
	
	x.style.display = "none";
	y.style.display = "block";
	z.style.display = "none";
};

function extraSecurityToggle() {
	passSecuritySummary.style.display = "none";
	
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");

	x.style.display = "none";
	y.style.display = "none";
	z.style.display = "block";
};