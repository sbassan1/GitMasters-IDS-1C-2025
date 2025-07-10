
.PHONY: start

begin:
	cd backend && \
	npm install
	make start

start:
	cd backend && docker compose up -d && npm start