#!/bin/bash

# Restore all git changes
git restore -s@ -SW  -- .

# Update token
if [[ ! -z ${NODE_AUTH_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  echo `pnpm whoami`
fi

# Build the package
echo "Building @fantasies/ui"
pnpm run build

# Release package
echo "Publishing @fantasies/ui"
pnpm publish --access public --no-git-checks
