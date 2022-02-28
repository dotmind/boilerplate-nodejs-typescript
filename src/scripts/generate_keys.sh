#!/bin/bash

GENERATOR_PRIVATE_KEY=${1:-"./.keys/API_KEY_GENERATOR_PRIVATE_KEY"}
GENERATOR_PUBLIC_KEY=${2:-"./.keys/API_KEY_GENERATOR_PUBLIC_KEY"}

if ! test -f "$GENERATOR_PRIVATE_KEY" && ! test -f "$GENERATOR_PUBLIC_KEY"; then
  echo "Generating RSA keys ✍️"

  ssh-keygen -t rsa -b 2048 -m PEM -f "$GENERATOR_PRIVATE_KEY" -q -N ""

  ssh-keygen -e -f "$GENERATOR_PRIVATE_KEY".pub -m pem >"$GENERATOR_PUBLIC_KEY"

  rm "$GENERATOR_PRIVATE_KEY".pub

  echo "Keys generated! 🤝"

  exit 0
else
  echo -e "At least one of the file already exists 🛑"

  exit 0
fi
