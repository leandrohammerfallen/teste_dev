# ---------
# Variables
# ---------
APP_NAME := example-api

# ----------------------------------
# Developments commands with DOCKER!
# ----------------------------------
.PHONY: docker-deps
docker-deps:
	@ which docker || (echo "docker not found!"; exit 1;)
	@ which docker-compose || (echo "docker-compose not found!"; exit 1;)

.PHONY: dev logs inspect stop
dev: docker-deps  # sudo chmod -R 777 storage/
	- docker network create proxy-network
	@ docker-compose up -d

logs: docker-deps
	@ docker logs -f $(APP_NAME)

inspect: docker-deps
	@ docker exec -it $(APP_NAME) bash

stop: docker-deps
	@ docker-compose stop

# -------------------------------------
# Developments commands without DOCKER!
# -------------------------------------
.PHONY: build test start debug
build:
	@ npm run esbuild
test:
	@ npm run test
start:
	@ npm run start
debug:
	@ npm run debug

# -------------------------------------
# Developments commands with SEQUELIZE!
# -------------------------------------
.PHONY: db-create db-migrate-up db-migrate-down migration-generate
db-create:
	@ npx sequelize-cli db:create
db-migrate-up:
	@ npx sequelize-cli db:migrate
db-migrate-down:
	@ npx sequelize-cli db:migrate:undo
migration-generate:
	@ npx sequelize-cli migration:generate --name=$(name)
