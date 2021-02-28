#Brute Force Time Calculator
#Edward Duffy

#Input Analysis
#Takes input password, finds what characters and how long it is for use as params for calculation

def analysePass(pword):
    length = len(pword)

    #symbols
    testset = set('`¬!"£$%^&*()_+-=[]{};:@~\|,<.>/?')
    if any((c in testset) for c in s):
        symbols = true
    else:
        symbols = false

    #numbers
    testset = set('1234567890')
    if any((c in testset) for c in s):
        numbers = true
    else:
        numbers = false

    #upper, lower, both
        ######NEEDS A CHECK FOR IF ALPHABETICAL CHARS ARE PRESENT AT ALL!
    upper = pword.isupper()
    lower = pword.islower()
    if not upper and not lower:
        mixedCase = true
    

#Calculation
#Using data found above, calculate roughly how long it would take to brute force the password



#func calls



#end
