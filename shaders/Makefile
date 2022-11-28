
LAST_FILE=`ls -tp src | grep -v /$ | head -1`

all:
	glslviewer src/$(LAST_FILE)

%.frag:
	glslviewer src/$@

clean:
