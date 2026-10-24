with open('scripts/build_chemistry_core.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace patterns like `"[Ar] 4s²',` with `"[Ar] 4s²",`
import re
# Look for double-quoted string ending with single quote before comma
fixed = re.sub(r'\"(\[[^\]]+\][^\',]+)\',', r'"\1",', text)

with open('scripts/build_chemistry_core.py', 'w', encoding='utf-8') as f:
    f.write(fixed)

print("Quotes fixed.")
