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

//Setting up of variables
//These are used as part of the Security Consultant feature
const LOWER_REGEX = /([a-z])/g;
const UPPER_REGEX = /([A-Z])/g;
const NUM_REGEX = /([\d])/g;
const SPECIAL_REGEX = /([$&+,:;=?@#|'<>.^*()%!-])/g;
//var lowerMinCount = 2;
//ar upperMinCount = 2;
//var numMinCount = 2;
//var specialMinCount = 2;
//var passwordMinLength = 8;

//PassCheck Function
function passCheck()
{
	onceCalc.style.display = "none";
	var password = document.getElementById("passForm").value;


	colourBackground.style.display = "block";
	bruteForceEstimation.style.display = "block";

	$.get("https://raw.githubusercontent.com/Team15-EH/Password-Extension-Project/main/src/10k_pass_file.txt", function(contents)
	{
		var hasString = contents.includes(password);

		if (hasString == true && password.length >0)
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

	//Sets up variables to hold the date. Day is always stored as the first of the month.
	var d = "01";
	var m = new Date().getMonth() + 1;
	var y = new Date().getFullYear();

	//Checks if future month will be higher than twelve, if so it will be fixed and the year will be incremented. A "0" is added to start of month to look cool.
	//The next two checks are to check if the future month will be a single or double digit number. If single the required "0" is added for cool factor.
	if (m>6)
	{
		m = m - 6;
		y = y + 1;
		m = "0" + m;
	}
	else if (m>4)
	{
		m = m + 6;
	}
	else
	{
		m = m + 6;
		m = "0" + m;
	}

	//Change display to show the date the user should reset their password on.
	document.getElementById("date").innerHTML = "We recommend that you change it by: " + d + "/" + m + "/"  + y;





	// Disect password to see what it contains
if (password.length > 0)
{
 		var numOfCapitals = (password.match(UPPER_REGEX) || []).length; // Finding the number of Upper Case characters
		var numOfLower= (password.match(LOWER_REGEX) || []).length;  // Finding the number of lower Case characters
		var numOfNumbers = (password.match(NUM_REGEX) || []).length;  // Finding the number of Number characters
		var numOfSpecial = (password.match(SPECIAL_REGEX) || []).length;  // Finding the number of special characters

		var concurrentCharsFactor = countLetters(password); // determines a factor based on the number of concurrent characters
		var negativeFactor = determineNegativeFactor(numOfCapitals, numOfLower, numOfNumbers, numOfSpecial, concurrentCharsFactor); // Determines a negative factor based on the mistakes in the password
		// Function determines the strength of the password

		var passwordStrength = 0 + (password.length * 4) + ((password.length - numOfCapitals) * 2) + ((password.length - numOfLower) * 2) + (numOfNumbers * 4) + (numOfSpecial * 6 ) +  negativeFactor;
		//document.getElementById("onceCalc").innerHTML="";
		var bruteForceTime = bruteForce(numOfCapitals, numOfLower, numOfNumbers, numOfSpecial, password.Length);

		if (numOfSpecial == 0) // if the number of special characters is 0 or 1, this negativly impacts the password strength
		{
			passwordStrength = passwordStrength / 2;
		}
		else if (numOfSpecial == 1)
		{
			passwordStrength = passwordStrength / 1.125;
		}

		if (passwordStrength > 100) // if the strength is higher than 100 or less than 0, this sets them to 100 or 0 respectavly so that strength scores are not inflated.
		{
			passwordStrength = 100;
		}
		else if (passwordStrength <= 0)
		{
			passwordStrength = 0;
		}
		passwordStrength = Math.round(passwordStrength) // rounds out decimals for a nicer user experiance

		document.getElementById("passMeasurements").style.color = "white";
		document.getElementById("passMeasurements").innerHTML = " Password Analysis ";

	if (password.length > 11)
	{
			document.getElementById("length").innerHTML = "Your password has a strong length"; // setting colors and text on the HTML page
			document.getElementById("length").style.color = "Lime";
	}
	else if (password.length > 7)
	{
		document.getElementById("length").innerHTML = "Your password has a decent length, it could be longer. Increasing the length is the biggest factor in improving security";
		document.getElementById("length").style.color = "Yellow"; // setting colors and text on the HTML page
	}
	else
	{
		document.getElementById("length").innerHTML = "Your password has is very short. Increasing the length is the biggest factor in improving security";
		document.getElementById("length").style.color = "Red"; // setting colors and text on the HTML page
	}



	if (numOfCapitals == 0)
	{
			document.getElementById("upper").innerHTML = " Your password contains no capital letters";
			document.getElementById("upper").style.color = "Red";// setting colors and text on the HTML page
	}
	else
	{
			document.getElementById("upper").innerHTML = "Your password contains a capital letter";
			document.getElementById("upper").style.color = "Lime"; // setting colors and text on the HTML page
	}

	if (numOfLower == 0)
	{
			document.getElementById("lower").innerHTML = " Your password contains no lower case letters";
			document.getElementById("lower").style.color = "Red";// setting colors and text on the HTML page
	}
	else
	{
		document.getElementById("lower").innerHTML = "Your password contains a lower case letter";
		document.getElementById("lower").style.color = "Lime";// setting colors and text on the HTML page
	}

	switch (numOfNumbers){
		case 0:
			document.getElementById("number").innerHTML = " Your password contains no number characters, consider adding a few";
			document.getElementById("number").style.color = "Red";// setting colors and text on the HTML page
			break;
		case 1:
			document.getElementById("number").innerHTML = " Your password contains only one number character, consider adding a few more";
				document.getElementById("number").style.color = "Yellow";// setting colors and text on the HTML page
			break;
			case 2:
				document.getElementById("number").innerHTML = " Your password contains only two numbers, consider adding at least one more";
				document.getElementById("number").style.color = "Yellow";// setting colors and text on the HTML page
				break;
		default:
			document.getElementById("number").innerHTML = "Your password contains a strong amount of numbers ";
			document.getElementById("number").style.color = "Lime";// setting colors and text on the HTML page
		}

		switch (numOfSpecial){
			case 0:
				document.getElementById("special").innerHTML = " Your password contains no special characters, consider adding a few";
				document.getElementById("special").style.color = "Red";// setting colors and text on the HTML page
				break;
			case 1:
				document.getElementById("special").innerHTML = " Your password contains only one special character, consider adding at least one more";
				document.getElementById("special").style.color = "Yellow";// setting colors and text on the HTML page
				break;
			default:
				document.getElementById("special").innerHTML = "Your password contains a strong amount of special characters";
				document.getElementById("special").style.color = "Lime";// setting colors and text on the HTML page
			}

			if (concurrentCharsFactor == 20)
			{
					document.getElementById("concurrent").innerHTML = " Your password contains 3 of the same characters in a row, try to not have more than two concurrent characters";
					document.getElementById("concurrent").style.color = "Yellow";// setting colors and text on the HTML page
			}
			else if (concurrentCharsFactor > 20)
			{
					document.getElementById("concurrent").innerHTML = " Your password contains many concurrent characters, this should be changed as it makes a password easier to brute force";
					document.getElementById("concurrent").style.color = "Red"; // setting colors and text on the HTML page
			}
			else
			{
				document.getElementById("concurrent").innerHTML = "Your password contains no sets of 3 characters in a row ";
				document.getElementById("concurrent").style.color = "Lime"; // setting colors and text on the HTML page

			}


	// showing the user their password strength

			if (passwordStrength == 100)
			{
				document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Very Strong";
				document.getElementById("passwordStrengthText").style.color = "Lime";
				document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
				document.getElementById("passwordStrengthScore").style.color = "Lime"; // setting colors and text on the HTML page
			}
			else if (passwordStrength >= 80)
			{
				document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Strong";
				document.getElementById("passwordStrengthText").style.color = "MediumSpringGreen";
				document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
				document.getElementById("passwordStrengthScore").style.color = "MediumSpringGreen"; // setting colors and text on the HTML page
			}
			else if (passwordStrength >= 35)
			{
				document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Medium";
				document.getElementById("passwordStrengthText").style.color = "Yellow";
				document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
				document.getElementById("passwordStrengthScore").style.color = "Yellow"; // setting colors and text on the HTML page
			}
			else
			{
				document.getElementById("passwordStrengthText").innerHTML = "Your Password is: Weak";
				document.getElementById("passwordStrengthText").style.color = "Red";// setting colors and text on the HTML page
				document.getElementById("passwordStrengthScore").innerHTML = " Password Stength = " + passwordStrength + "%";
				document.getElementById("passwordStrengthScore").style.color = "Red";
			}


			document.getElementById("bruteForceTime").innerHTML = "The time to brute force this password is " + bruteForceTime + " seconds";
			document.getElementById("passwordReferal").innerHTML="Please refer to the Password Etiquette page for further information regarding password security";
			}

else
	{
	//failsafe
	alert("Empty User Input, Please try again");
	document.getElementById("passMeasurements").style.display="none";



	document.getElementById("bruteForceEstimation").style.display="none";
	document.getElementById("passwordStrengthScore").style.display="none";

	document.getElementById("colourBackground").style.display="none";

	document.getElementById("passwordStrengthText").innerHTML="You have not entered a password. Please try again!";

	}
}

function determineNegativeFactor(_Pcapital, _Plower, _Pnumber, _Pspecial, _Pconcurrent)
{
	let factor = 0;

	if ((_Pcapital > 0) && (_Plower > 0) && (_Pnumber == 0) && (_Pspecial == 0))
	{
		factor = factor - (_Pcapital + _Plower);
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
}



 // Function that counts concurrect characters takes the password string being passed in
function countLetters(_Pstr){

let password = _Pstr.split(''); // creates a new array to hold each character
let letters = []; // Counting the letters
let currentLetterCount = 1; // number of times a character appears in the password in a row
let highestCount = 0; // holds the highest of any concurrent characters. e.g if 5 "A"s appear this number will be 5
let totalConcurrentCharactersHigherThanTwo = 0; // total number of times a set of 3 concurrent characters appear
let totalConcurrentCharactersHigherThanFour = 0; // total number of times a set of concurrent characters above 4 or equal to 4 appear
let factor = 0;


// this function determines the number of times sets of concurrent characters appear.
for (let i = 0; i < password.length; i++)
{
	if (password[i] === password[i+1]) // if the current character is the same as the next one, increase the current letter count
	{
	currentLetterCount++
	}
	else // if the next character is not the same, do this code
	{
	//	let value = `${currentLetterCount}${password[i]}`; leftover code
	//	letters = [...letters,value]; leftover code

		if (currentLetterCount >= 4)
		{
			totalConcurrentCharactersHigherThanFour++; // checking if the number of concurrent characters is more than 4 and if so, increasing the number of sets of 4 found
			if (highestCount < currentLetterCount)
			{
				highestCount = currentLetterCount;
			}
		}
		else if (currentLetterCount == 3) // if its not 4 or more, it checks if it is 3, if it is, then it increases the number of sets of 3 found.
		{
			totalConcurrentCharactersHigherThanTwo++;
		}
		currentLetterCount = 1; // set found letter count back to one
	}


}

//return highestCount;legacy code
//return letters.join(" "); legacy code

// calculates a factor based on the number of concurrent characters and then returns them
factor = (40 * totalConcurrentCharactersHigherThanFour) + (20 * totalConcurrentCharactersHigherThanTwo) + (10 * highestCount);
return factor;
}

function bruteForce (_NumCapital,_NumLower,_NumNumber,_NumSpecial,_NumLength) // function for calculating the brute force time, Edwards Stuff
{
var mixedCase = 1;
var charSet = 0;

if ((_NumCapital > 0 ) && (_NumLower > 0))
{
	mixedCase = 52;
}
else if ((_NumCapital > 0 ) || (_NumLower > 0))
{
	charSet = 26;
}

if (_NumNumber > 0)
{
	charSet = charSet + 10;
}
if (_NumSpecial > 0)
{
	charSet = charSet + 35;
}


return BFCalc(_NumLength, charSet);


}

function BFCalc(_n,_k){ // Edwards function for calculating the brute force tiem

let nMinusK = _n -_k;
let n_fac = 10;// factorial(_n);
let k_fac =  factorial(_k);
let nMinusK_Fac = 10;//factorial(nMinusK);
let totalCombinations = n_fac/(k_fac * nMinusK_Fac);
let seconds = (totalCombinations/500);
return seconds;

}

function factorial(_Number){ // calculates the factorial

if (_Number == 0)
{
	return 1;
}
else
 {
	return (_Number * factorial(_Number - 1));
}
}

//OpenRepoLink Function
function openRepoLink()
{
		//Opens the supplied URL in a new tab
	    var newURL = "https://github.com/Team15-EH/Password-Extension-Project";
        chrome.tabs.create({ url: newURL });
}

//OpenGoogleCalendar Function
//This function opens a new tab containg a Google Calendar event form pre-filled with a date set 6 months in the future.
//This allows the user to add the event to their Google Calendar which will remind them to reset their password.
function openGoogleCal()
{
		//Sets up variables for the dates. Day is always first of the month.
		var d = "01";
		var m = new Date().getMonth() + 1;
		var y = new Date().getFullYear();

		//Checks if future month will be higher than twelve, if so it will be fixed and the year will be incremented. A "0" is added to start of month for link formatting.
		//The next two checks are to check if the future month will be a single or double digit number. If single the required "0" is added for link formatting.
		if (m>6)
		{
			m = m - 6;
			y = y + 1;
			m = "0" + m;
		}
		else if (m>4)
		{
			m = m + 6;
		}
		else
		{
			m = m + 6;
			m = "0" + m;
		}

		//Sets the variables required to set the time of the Google Calendar event
		var startTime = "T150000Z/";
		var endTime = "T160000Z";

		//Sets variables containing the "meat" of the Google Calendar link. This contains the details and title of the event as well.
		var urlStart = "https://calendar.google.com/calendar/u/0/r/eventedit?text=Change+Password&dates=";
		var urlEnd = "&details=Project+Perfect+Password+recommends+that+you+change+your+password+as+it%27s+been+6+months";

		//This section "concatenates" the URL together and opens the link in a new tab.
		//I tried to use Javascripts built in concatenation function but that breaks everything somehow.
		var newURL = urlStart + y + m + d + startTime + y + m + d + endTime + urlEnd;
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
