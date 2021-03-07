import sys


vowels = ['A', 'E', 'I', 'O', 'U', 'Y']


words = ['HAMLET', 'A MIDSUMMER NIGHTS DREAM', 'KING LEAR', 'MUCH ADO ABOUT NOTHING']

for word in words:
    res = ""
    for c in word:
        if c not in vowels:
            res += c

    print(f"{{'clue': '{res}', 'answer': '{word}'}},")

