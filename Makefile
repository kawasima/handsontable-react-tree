all:
	./node_modules/.bin/webpack -p
clean:
	rm dist/*
	rm example/bundle*
