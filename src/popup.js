//Set-Up Function. Hides everything but the Password Strength Page & Components on the Extension being opened.
window.onload = function()
{
  passEtiqPage.style.display = "none";
	threeRandom.style.display = "none";
	generalTips.style.display = "none";
	extraSecurity.style.display = "none";
	passStrengthPage.style.display = "block";
}

//Button Listening Function. Listens for "Input Button" clicks and calls the relevant function when they are registered.
document.addEventListener('DOMContentLoaded', function ()
{
	//Setting up the variables.
	var passPageButton = document.getElementById("passPageButton");
	var threeWordsButton = document.getElementById("threeWordsButton");
	var generalTipsButton = document.getElementById("generalTipsButton");
	var extraSecurityButton = document.getElementById("extraSecurityButton");
	var repoLinkButton = document.getElementById("repoLinkButton");
	var passCheckButton = document.getElementById("passCheckButton");

	//Adding each of the "Input Button Listeners"
    passPageButton.addEventListener('click', function()
	{
		//Runs the display function for switching between the Password Strength Checker and Password Etiquette "Pages"
		passPageToggle();
	});
	threeWordsButton.addEventListener('click', function()
	{
		//Runs the display function for the Three Random Words Division
		threeWordsToggle();
	});
	generalTipsButton.addEventListener('click', function()
	{
		//Runs the display function for the General Tips Division
		generalTipsToggle();
	});
	extraSecurityButton.addEventListener('click', function()
	{
		//Runs the display function for the Extra Security Division
		extraSecurityToggle();
	});
	repoLinkButton.addEventListener('click', function()
	{
		//Runs a function providing a link to the Github Repository
		openRepoLink();
	});
	passCheckButton.addEventListener('click', function()
	{
		//Runs the Password Checking Function
		passCheck();
		searchString();
	});
});
const LOWER_REGEX = /([a-z])/g;
const UPPER_REGEX = /([A-Z])/g;
const NUM_REGEX = /([/d])/g;
const SPECIAL_REGEX = /([$&+,:;=?@#|'<>.^*()%!-])/g
var lowerMinCount = 2;
var upperMinCount = 2;
var numMinCount = 2;
var specialMinCount = 2;
var passwordMinLength = 8;
//PassCheck Function
//Still needs checking user input against breached passwords file and the Security Consultant
function passCheck()
{
	document.getElementById("passwordTitle").innerHTML = "Your Password is: " + document.getElementById("passForm").value;
	var password = document.getElementById("passForm").value;

	//COMMENT THIS BIT OUT TO FIX
	var str = "words donkey elephant mouse cow pig";
	var wordResult = str.includes(password);
	document.write(wordResult);

	var d = new Date().getDate();
	var m = new Date().getMonth() + 1;
	var y = new Date().getFullYear();
	document.getElementById("date").innerHTML = "We recommend that you change it by: " + d + "/" + (m + 6) + "/"  + y;



	// Disect password to see what it contains
	if (password.length > 0)
	{
	var numOfCapitals = (password.match(UPPER_REGEX) || []).length;
	var numOfLower= (password.match(LOWER_REGEX) || []).length;
	var numOfNumbers = (password.match(NUM_REGEX) || []).length;
  var numOfSpecial = (password.match(SPECIAL_REGEX) || []).length;
	/*
	//var numOfConsecutiveChars = (password.match(/[a-z]\1/ig) || []).length;
	//var numOfSpecial = (password.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g ).length;
	*/
	document.getElementById("passMeasurements").innerHTML = " Password Analysis "
	document.getElementById("length").innerHTML = " Password length = " + password.length;
	document.getElementById("number").innerHTML = " Number of Numbers  = " + numOfNumbers;
	document.getElementById("upper").innerHTML = " Number of uppercase = " + numOfCapitals;
	document.getElementById("lower").innerHTML = " Number of lowercase = " + numOfLower;
  document.getElementById("special").innerHTML = " Number of special = " + numOfSpecial;

	/* Not working yet, possibly next iteration

	//document.getElementById("consecutive").innerHTML = " Number of consecutive characters = " + numOfConsecutiveChars;
	//document.getElementById("special").innerHTML = " Number of special = " + numOfSpecial;
	*/
	}
	else
	{
	//failsafe
	alert("Empty User Input, Please try again");
	}

	// set initial requirements that determine the strength of the password (will be tweaked)
	if ((password.length > passwordMinLength) && (numOfCapitals >= upperMinCount) & (numOfLower >= lowerMinCount) & (numOfNumbers >= numMinCount) & (numOfSpecial >= specialMinCount))
	{
			document.getElementById("onceCalc").innerHTML = "Your Password is: Medium";
	}
	else if ((password.length > (passwordMinLength + 2)) && (numOfCapitals >= (upperMinCount + 1)) & (numOfLower >= (lowerMinCount + 1)) & (numOfNumbers >= (numMinCount + 1)) & (numOfSpecial >= (specialMinCount + 1)))
	{
		document.getElementById("onceCalc").innerHTML = "Your Password is: Strong";
	}
  else {
    document.getElementById("onceCalc").innerHTML = "Your Password is: Weak";
  }
};

//OpenRepoLink Function
function openRepoLink()
{
		//Opens the supplied URL in a new tab
	    var newURL = "https://github.com/Team15-EH/Password-Extension-Project";
        chrome.tabs.create({ url: newURL });
}

function passPageToggle()
{
	//Gets both the passStrengthPage and passEtiqPage Divisions and assigns them to variables
	var x = document.getElementById("passStrengthPage");
	var y = document.getElementById("passEtiqPage");

	//Checks if on the passEtiqPage and if so switches display components to the passStrengthPage
	if (x.style.display === "none")
	{
		//Makes the "Check Password" button visible
		passCheckButton.style.visibility = "visible";
		//Hides passEtiqPage and displays passStrengthPage
		y.style.display = "none";
		x.style.display = "block";
		//Hides the passEtiqPage components
		threeRandom.style.display = "none";
		generalTips.style.display = "none";
		extraSecurity.style.display = "none";
		//Displays the enter password form
		passForm.style.display = "block";
	} else
	{
		//Changes the passPageButton (Used to toggle the page) to say "Back to Main Page"
		document.getElementById("passPageButton").value = "Back to Main Page";
		//Make the "Check Password" button dissapear but keep its position in the Division
		passCheckButton.style.visibility = "hidden";
		//Display the password etiquette security summary
		passSecuritySummary.style.display = "block";
		//Hide the passCheck page and display the passEtiqPage
		x.style.display = "none";
		y.style.display = "block";
		//Make the enter password form dissapear
		passForm.style.display = "none";
	}
};

//Three Random Words Function
function threeWordsToggle()
{
	//Hide password etiquette summary
	passSecuritySummary.style.display = "none";

	//Assign passEtiqPage components to variables
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");

	//Display the threeRandomWords component and hide the others
	x.style.display = "block";
	y.style.display = "none";
	z.style.display = "none";
};

function generalTipsToggle()
{
	//Hide password etiquette summary
	passSecuritySummary.style.display = "none";

	//Assign passEtiqPage components to variables
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");

	//Display the generalTips component and hide the others
	x.style.display = "none";
	y.style.display = "block";
	z.style.display = "none";
};

function extraSecurityToggle()
{
	//Hide password etiquette summary
	passSecuritySummary.style.display = "none";

	//Assign passEtiqPage components to variables
	var x = document.getElementById("threeRandom");
	var y = document.getElementById("generalTips");
	var z = document.getElementById("extraSecurity");

	//Display the Extra Security component and hide the others
	x.style.display = "none";
	y.style.display = "none";
	z.style.display = "block";
};
