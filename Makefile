install:
	npm install express
	mkdir -p uploads
	
start:
	node server.js

clean:
	rm -rf node_modules
	rm -rf uploads/*