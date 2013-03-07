#!/usr/bin/python
import sys

name = sys.argv[1].split('.')[:-1]
name = '.'.join(name) + '.converted.json'
content = open(sys.argv[1]).read()
start = content.find('[')
content = content[start:]
content = content.replace('\r\n', '\\n')
content = content.replace('\n\r', '\\n')
content = content.replace('\n', '\\n')
content = content.replace('\r', '\\n')
content = content.replace('\t', '\\t')
content = content.replace('\b', '\\b')
content = content.replace('\f', '\\f')
open(name, "w").write(content)
