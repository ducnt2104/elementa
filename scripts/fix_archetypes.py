with open('src/data/reactionsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

count1 = content.count('"SHIELD_BUFF"')
count2 = content.count('"FREEZE_SLOW"')

content = content.replace('"SHIELD_BUFF"', '"INERT_SHIELD"')
content = content.replace('"FREEZE_SLOW"', '"FREEZE_STUN"')

with open('src/data/reactionsData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Replaced {count1} SHIELD_BUFF and {count2} FREEZE_SLOW")
