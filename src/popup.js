//Set-Up Function. Hides everything but the Password Strength Page & Components on the Extension being opened.
window.onload = function()
{
	passEtiqPage.style.display = "none";
	threeRandom.style.display = "none";
	generalTips.style.display = "none";
	extraSecurity.style.display = "none";
	passStrengthPage.style.display = "block";
	analyzerRule.style.display = "none";

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
	//document.getElementById("passwordTitle").innerHTML = "Your Password is: " + document.getElementById("passForm").value;
	var password = document.getElementById("passForm").value;

	//var str = "words donkey elephant mouse cow pig";
	//var wordResult = str.includes(password);

	$.get("https://mayar.abertay.ac.uk/~cmp311g20eh15/words.txt", function(contents)
	{
		var hasString = contents.includes(password);

		//document.write(hasString);
		if (hasString == true)
	{
		passwordTitle.style.display = "block";
		document.getElementById("passwordTitle").innerHTML = "THIS PASSWORD IS BREACHED";
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
	var concurrentChars = countLetters(password);
	var negativeFactor = determineNegativeFactor(numOfCapitals, numOfLower, numOfNumbers, numOfSpecial, concurrentChars);
	var passwordStrength = 0 + (password.length * 4) + ((password.length - numOfCapitals) * 2) + ((password.length - numOfLower) * 2) + (numOfNumbers * 4) + (numOfSpecial * 6) + negativeFactor;

	if (numOfSpecial == 0)
	{
		passwordStrength = passwordStrength / 2;
	}

	if (passwordStrength > 100)
	{
		passwordStrength = 100;
	}
	else if (passwordStrength < 0)
	{
		passwordStrength = 0;
	}

	document.getElementById("passMeasurements").innerHTML = " Password Analysis ";
	//document.getElementById("length").innerHTML = " Password length = " + password.length;
	if (numOfCapitals == 0)
	{
			document.getElementById("upper").innerHTML = " Your password contains no capital letters";
	}
	else
	{
		document.getElementById("upper").innerHTML = " ";
	}


	if (numOfLower == 0)
	{
		document.getElementById("lower").innerHTML = " Your password contains no lower case letters";
	}
	else
	{
			document.getElementById("lower").innerHTML = " ";
	}



	if (numOfNumbers == 0)
	{
		document.getElementById("number").innerHTML = " Your password contains no numbers";
	}
	else
	{
		document.getElementById("number").innerHTML = " ";
	}

	if (numOfSpecial == 0)
	{
		document.getElementById("special").innerHTML = " Your password contains no special characters";
	}
	else
	{
		document.getElementById("special").innerHTML = " ";
	}


//  document.getElementById("concurrent").innerHTML = " Concurrent = " + concurrentChars;
	//
	}
	else
	{
	//failsafe
	alert("Empty User Input, Please try again");
	}

	// set initial requirements that determine the strength of the password (will be tweaked)

	if (passwordStrength == 100)
	{
		document.getElementById("onceCalc").innerHTML = "";
		document.getElementById("strong").innerHTML = "";
		document.getElementById("medium").innerHTML = "";
		document.getElementById("weak").innerHTML = "";
		document.getElementById("pwdStr4").innerHTML = "";
		document.getElementById("pwdStr2").innerHTML = "";
		document.getElementById("pwdStr3").innerHTML = "";
		
		document.getElementById("veryStrong").innerHTML = "Your Password is: Very Strong";
		document.getElementById("pwdStr1").innerHTML = " Password Stength = " + passwordStrength + "%";
	}
	else if (passwordStrength >= 80)
	{
		document.getElementById("onceCalc").innerHTML = "";
		document.getElementById("veryStrong").innerHTML = "";
		document.getElementById("medium").innerHTML = "";
		document.getElementById("weak").innerHTML = "";
		document.getElementById("pwdStr1").innerHTML = "";
		document.getElementById("pwdStr4").innerHTML = "";
		document.getElementById("pwdStr3").innerHTML = "";
		
		document.getElementById("strong").innerHTML = "Your Password is: Strong";
		document.getElementById("pwdStr2").innerHTML = " Password Stength = " + passwordStrength + "%";
	}
	else if (passwordStrength >= 35)
	{
		document.getElementById("onceCalc").innerHTML = "";
		document.getElementById("veryStrong").innerHTML = "";
		document.getElementById("strong").innerHTML = "";
		document.getElementById("weak").innerHTML = "";
		document.getElementById("pwdStr1").innerHTML = "";
		document.getElementById("pwdStr2").innerHTML = "";
		document.getElementById("pwdStr4").innerHTML = "";
		
		document.getElementById("medium").innerHTML = "Your Password is: Medium";
		document.getElementById("pwdStr3").innerHTML = " Password Stength = " + passwordStrength + "%";
	}
  else
	{
		document.getElementById("onceCalc").innerHTML = "";
		document.getElementById("veryStrong").innerHTML = "";
		document.getElementById("strong").innerHTML = "";
		document.getElementById("medium").innerHTML = "";
		document.getElementById("pwdStr1").innerHTML = "";
		document.getElementById("pwdStr2").innerHTML = "";
		document.getElementById("pwdStr3").innerHTML = "";
		
		document.getElementById("weak").innerHTML = "Your Password is: Weak";
		document.getElementById("pwdStr4").innerHTML = " Password Stength = " + passwordStrength + "%";
  }
};

function determineNegativeFactor(cap, low, num, speci,conc)
{
	let factor = 0;
	if ((cap > 0) && (low > 0) && (num == 0) && (speci ==0))
	{
		factor = factor - (cap + low);
	}
	else if ((cap == 0) && (low == 0) && (num > 0) && (speci == 0))
	{
		factor = factor - num;
	}

	if (conc > 2)
	{
		factor = factor - (conc * 3);
	}

	return factor;

}



 // Function that counts concurrect characters takes the password string being passed in
function countLetters(str)
{
let tempArr = str.split(''); // creates a new temperary array
let letters = []; // Counting the letters
let count = 1; // number of times a character appears in the password in a row
let highestCount = 0;
// This function determines if a character is the same as the next character in the password. If it is, it increases the counts
// if not it does some magic to add the number of letters found to the new array and what letter it was
for (let i = 0; i < tempArr.length; i++)
{
	if (tempArr[i] === tempArr[i+1])
	{
	count++
	}
else
	{
		let value = `${count}${tempArr[i]}`;
		letters = [...letters,value];
		if (count > highestCount)
		{
			highestCount = count;
		}
		count = 1;
	}
}
// returns what it found and joins the array into a string
return highestCount;
//	return letters.join(" ");
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
