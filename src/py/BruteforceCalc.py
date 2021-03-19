#Brute Force Time Calculator
#Edward Duffy

import math

#Input Analysis
#Takes input password, finds what characters and how long it is for use as params for calculation

def analysePass(pword):
    length = len(pword)

    #symbols
    testset = set('`¬!"£$%^&*()_+-=[]{};:@~\|,<.>/?')
    if any((c in testset) for c in pword):
        symbols = 1
    else:
        symbols = 0

    #numbers
    testset = set('1234567890')
    if any((c in testset) for c in pword):
        numbers = 1
    else:
        numbers = 0

    #upper, lower, both
        ######NEEDS A CHECK FOR IF ALPHABETICAL CHARS ARE PRESENT AT ALL!
    mixedcase = 0
    upper = pword.isupper()
    lower = pword.islower()
    if not upper and not lower:
        mixedCase = 1

    #number of possible chars
    #35 symbols on english keyboard
    #26 chars, 10 numbers
    chars = 0

    
    if (upper or lower):
        chars = 26
    elif mixedcase:
        chars = 52
    if numbers:
        chars += 10
    if symbols:
        chars += 35

    return length, chars

#Calculation
#Using data found above, calculate roughly how long it would take to brute force the password

#formula is (n!)/(k!(n-k)!) where N is the total number of values, and K is the length of the password
def BFCalc(k, n):

  nMinusK = n-k

  n_fac = math.factorial(n)
  k_fac = math.factorial(k)
  nMinusK_fac = math.factorial(nMinusK)

  totalCombinations = n_fac/(k_fac*nMinusK_fac)

  seconds = totalCombinations/500

  return seconds


#func calls

inputpass = input("enter password: ")

analysis = analysePass(inputpass)

timetaken = BFCalc(analysis[0],analysis[1])

print(timetaken)


#end
