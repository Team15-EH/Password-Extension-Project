function setUp() {
	passEtiqPage.style.display = "none";
	passStrengthPage.style.display = "block";
	threeRandom.style.display = "none";
	generalTips.style.display = "none";
	extraSecurity.style.display = "none";
};

function passPageToggle() {
	var x = document.getElementById("passStrengthPage");
	var y = document.getElementById("passEtiqPage");
	
	if (x.style.display === "none") {
		y.style.display = "none";
		x.style.display = "block";
		passForm.style.display = "block";
	} else {
		x.style.display = "none";
		y.style.display = "block";
		passForm.style.display = "none";
	}
};

function threeWordsToggle() {
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");
	
	x.style.display = "block";
	y.style.display = "none";
	z.style.display = "none";
};

function generalTipsToggle() {
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");
	
	x.style.display = "none";
	y.style.display = "block";
	z.style.display = "none";
};

function extraSecurityToggle() {
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");

	x.style.display = "none";
	y.style.display = "none";
	z.style.display = "block";
};