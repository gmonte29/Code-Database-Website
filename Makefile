install:
	npm install express
	
start:
	node server.js

clean:
	rm -rf node_modules
	rm -rf uploads/*