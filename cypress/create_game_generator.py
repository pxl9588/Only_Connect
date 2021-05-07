import sys

for i in range(4):
    if i == 0:
        print(f"cy.get('#input-{i}').type('{sys.argv[i+1]}')")
    else:
        print(f"\tcy.get('#input-{i}').type('{sys.argv[i+1]}')")

print(f"\tcy.get('#answer').type('{sys.argv[5]}')")
print(f"\tcy.get('#create-game-submit').click()")
