start: node_modules
	yarn run dev

build: node_modules
	yarn run build

#bundle: build
export VERSION=$(shell jq -r .version package.json)
bundle:
	cd dist && tar --create --verbose --file ../tales-of-arise-$${VERSION}.zip * && cd -

update-yarn:
	yarn install --frozen-lockfile
	npx yarn-check -u

test-watch:
	yarn run test:watch
test:
	yarn run test

prettier:
	yarn run prettier
prettier-fix:
	yarn run prettier:fix

lint:
	yarn lint
lint-fix:
	yarn lint:fix


node_modules:
	yarn install --frozen-lockfile

check: test prettier lint
