import sys


vowels = ['A', 'E', 'I', 'O', 'U', 'Y']


words = ['SOCCER', 'LACROSSE', 'SWIMMING', 'FOOTBALL']

for word in words:
    res = ""
    for c in word:
        if c not in vowels:
            res += c

    print(f"{{'clue': '{res}', 'answer': '{word}'}},")

