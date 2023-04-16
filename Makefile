start: node_modules
	yarn run dev

build: node_modules
	yarn run build

export VERSION=$(shell jq -r .version package.json)
bundle: build
	sed -i '/version/c\  \"version\" : \"${VERSION}\",' info.json
	cd dist && tar --create --verbose --file ../tales-of-arise-$${VERSION}.zip * && cd -

update-yarn:
	yarn install --frozen-lockfile
	npx yarn-check -u

test-watch:
	yarn run test:watch
test: node_modules
	yarn run test

prettier: node_modules
	yarn run prettier
prettier-fix:
	yarn run prettier:fix

lint: node_modules
	yarn lint
lint-fix:
	yarn lint:fix

node_modules:
	yarn install --frozen-lockfile

check: test prettier lint
