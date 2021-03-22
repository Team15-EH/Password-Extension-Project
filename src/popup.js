//Set-Up Function. Hides everything but the Password Strength Page & Components on the Extension being opened.
window.onload = function()
{
	colourBackground.style.display = "none";
	bruteForceEstimation.style.display = "none";
	onceCalc.style.display = "block";
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
	var addToCalendar = document.getElementById("addToCalendar")


// add to calendar call
addToCalendar.addEventListener('click', function()
{
	openGoogleCal();
}
)

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
	NCSCButton.addEventListener('click', function()
	{
		//Runs a function providing a link to the Github Repository
		openNCSCLink();
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
const NUM_REGEX = /([\d])/g;
const SPECIAL_REGEX = /([$&+,:;=?@#|'<>.^*()%!-])/g;
var lowerMinCount = 2;
var upperMinCount = 2;
var numMinCount = 2;
var specialMinCount = 2;
var passwordMinLength = 8;

//PassCheck Function
//Still needs checking user input against breached passwords file and the Security Consultant
function passCheck()
{
	onceCalc.style.display = "none";
	var password = document.getElementById("passForm").value;


	colourBackground.style.display = "block";
	bruteForceEstimation.style.display = "block";

	$.get("https://raw.githubusercontent.com/Team15-EH/Password-Extension-Project/main/src/10k_pass_file.txt", function(contents)
	{
		var hasString = contents.includes(password);

		//document.write(hasString);
		if (hasString == true)
	{
		onceCalc.style.display = "none";
		passwordTitle.style.color = "maroon";
		document.getElementById("passwordTitle").innerHTML = "THIS PASSWORD IS BREACHED";
		passwordTitle.style.display = "block";
		passwordStrengthText.style.display = "block";
	}
	else
	{
		passwordTitle.style.display = "none";
	}
	})

// sets year that password needs reset too
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

		var concurrentCharsFactor = countLetters(password);
		var negativeFactor = determineNegativeFactor(numOfCapitals, numOfLower, numOfNumbers, numOfSpecial, concurrentCharsFactor);
		var passwordStrength = 0 + (password.length * 4) + ((password.length - numOfCapitals) * 2) + ((password.length - numOfLower) * 2) + (numOfNumbers * 4) + (numOfSpecial * 6 ) +  negativeFactor;
		document.getElementById("onceCalc").innerHTML="";
		if (numOfSpecial == 0)
		{
			passwordStrength = passwordStrength / 2;
		}
		else if (numOfSpecial == 1)
		{
			passwordStrength = passwordStrength / 1.125
		}

		if (passwordStrength > 100)
		{
			passwordStrength = 100;
		}
		else if (passwordStrength < 0)
		{
			passwordStrength = 0;
		}
		passwordStrength = Math.round(passwordStrength)

		document.getElementById("passMeasurements").style.color = "white";
		document.getElementById("passMeasurements").innerHTML = " Password Analysis ";

	if (password.length > 11)
	{
			document.getElementById("length").innerHTML = "Your password has a strong length";
			document.getElementById("length").style.color = "Lime";
	}
	else if (password.length > 7)
	{
		document.getElementById("length").innerHTML = "Your password has a decent length, it could be longer. Increasing the length is the biggest factor in improving security";
		document.getElementById("length").style.color = "Yellow";
	}
	else
	{
		document.getElementById("length").innerHTML = "Your password has is very short. Increasing the length is the biggest factor in improving security";
		document.getElementById("length").style.color = "Red";
	}



	if (numOfCapitals == 0)
	{
			document.getElementById("upper").innerHTML = " Your password contains no capital letters";
			document.getElementById("upper").style.color = "Red";
	}
	else
	{
			document.getElementById("upper").innerHTML = "Your password contains a capital letter";
			document.getElementById("upper").style.color = "Lime";
	}

	if (numOfLower == 0)
	{
			document.getElementById("lower").innerHTML = " Your password contains no lower case letters";
			document.getElementById("lower").style.color = "Red";
	}
	else
	{
		document.getElementById("lower").innerHTML = "Your password contains a lower case letter";
		document.getElementById("lower").style.color = "Lime";
	}

	switch (numOfNumbers){
		case 0:
			document.getElementById("number").innerHTML = " Your password contains no number characters, consider adding a few";
			document.getElementById("number").style.color = "Red";
			break;
		case 1:
			document.getElementById("number").innerHTML = " Your password contains only one number character, consider adding a few more";
				document.getElementById("number").style.color = "Yellow";
			break;
			case 2:
				document.getElementById("number").innerHTML = " Your password contains only two numbers, consider adding at least one more";
				document.getElementById("number").style.color = "Yellow";
				break;
		default:
			document.getElementById("number").innerHTML = "Your password contains a strong amount of numbers ";
			document.getElementById("number").style.color = "Lime";
		}

		switch (numOfSpecial){
			case 0:
				document.getElementById("special").innerHTML = " Your password contains no special characters, consider adding a few";
				document.getElementById("special").style.color = "Red";
				break;
			case 1:
				document.getElementById("special").innerHTML = " Your password contains only one special character, consider adding at least one more";
				document.getElementById("special").style.color = "Yellow";
				break;
			default:
				document.getElementById("special").innerHTML = "Your password contains a strong amount of special characters";
				document.getElementById("special").style.color = "Lime";
			}

			if (concurrentCharsFactor == 20)
			{
					document.getElementById("concurrent").innerHTML = " Your password contains 3 of the same characters in a row, try to not have more than two concurrent characters";
					document.getElementById("concurrent").style.color = "Yellow";
			}
			else if (concurrentCharsFactor > 20)
			{
					document.getElementById("concurrent").innerHTML = " Your password contains many concurrent characters, this should be changed as it makes a password easier to brute force";
					document.getElementById("concurrent").style.color = "Red";
			}
			else
			{
				document.getElementById("concurrent").innerHTML = "Your password contains no sets of 3 characters in a row ";
				document.getElementById("concurrent").style.color = "Lime";

			}

}
else
{
	//failsafe
	alert("Empty User Input, Please try again");
}


	// set initial requirements that determine the strength of the password (will be tweaked)

if (passwordStrength == 100)
{
		document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Very Strong";
		document.getElementById("passwordStrengthText").style.color = "Lime";
		document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
		document.getElementById("passwordStrengthScore").style.color = "Lime";
}
else if (passwordStrength >= 80)
{
		document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Strong";
		document.getElementById("passwordStrengthText").style.color = "MediumSpringGreen";
		document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
		document.getElementById("passwordStrengthScore").style.color = "MediumSpringGreen";
}
else if (passwordStrength >= 35)
{
		document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Medium";
		document.getElementById("passwordStrengthText").style.color = "Yellow";
		document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
		document.getElementById("passwordStrengthScore").style.color = "Yellow";
}
else
{
		document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Weak";
		document.getElementById("passwordStrengthText").style.color = "Red";
		document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
		document.getElementById("passwordStrengthScore").style.color = "Red";
}

document.getElementById("passwordReferal").innerHTML="Please refer to the Password Etiquette page for further information regarding password security";
}

function determineNegativeFactor(_Pcapital, _Plower, _Pnumber, _Pspecial, _Pconcurrent)
{
	let factor = 0;

	if ((_Pcapital > 0) && (_Plower > 0) && (_Pnumber == 0) && (_Pspecial ==0))
	{
		factor = factor - (capital + lower);
	}
	else if ((_Pcapital == 0) && (_Plower == 0) && (_Pnumber > 0) && (_Pspecial == 0))
	{
		factor = factor - _Pnumber;
	}

	if (_Pconcurrent > 0)
	{
		factor = factor - _Pconcurrent;
	}

	return factor;
};



 // Function that counts concurrect characters takes the password string being passed in
function countLetters(_Pstr){

let password = _Pstr.split(''); // creates a new temperary array
let letters = []; // Counting the letters
let currentLetterCount = 1; // number of times a character appears in the password in a row
let highestCount = 0;
let totalConcurrentCharactersHigherThanTwo = 0;
let totalConcurrentCharactersHigherThanFour = 0;
let factor = 0;
// This function determines if a character is the same as the next character in the password. If it is, it increases the counts
// if not it does some magic to add the number of letters found to the new array and what letter it was
for (let i = 0; i < password.length; i++)
{
	if (password[i] === password[i+1])
	{
	currentLetterCount++
	}
	else
	{
		let value = `${currentLetterCount}${password[i]}`;
		letters = [...letters,value];

		if (currentLetterCount >= 4)
		{
			totalConcurrentCharactersHigherThanFour++;
			if (highestCount < currentLetterCount)
			{
				highestCount = currentLetterCount;
			}
		}
		else if (currentLetterCount == 3)
		{
			totalConcurrentCharactersHigherThanTwo++;
		}
		currentLetterCount = 1;
	}


}
// returns what it found and joins the array into a string
//return highestCount;
//return letters.join(" ");
factor = (40 * totalConcurrentCharactersHigherThanFour) + (20 * totalConcurrentCharactersHigherThanTwo) + (10 * highestCount);
return factor;
}

//OpenRepoLink Function
function openRepoLink()
{
		//Opens the supplied URL in a new tab
	    var newURL = "https://github.com/Team15-EH/Password-Extension-Project";
        chrome.tabs.create({ url: newURL });
}

//OpenGoogleCalendar Function
function openGoogleCal()
{
		//Opens the supplied URL in a new tab
	    var newURL = "https://calendar.google.com/calendar/u/0/r/eventedit?text=Change+Password&details=Project+Perfect+Password+recommends+that+you+change+your+password+as+it%27s+been+6+months!";
        chrome.tabs.create({ url: newURL });
}

//OpenNCSCLink Function
function openNCSCLink()
{
		//Opens the supplied URL in a new tab
	    var newURL = "https://www.ncsc.gov.uk/";
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
		colourBackground.style.display = "none";
		passwordStrengthText.style.display = "none";
		//Displays the enter password form
		passForm.style.display = "inline";
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
