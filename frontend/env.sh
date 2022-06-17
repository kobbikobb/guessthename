#!/bin/bash

# re-create file
rm -rf ./env-context.js
touch ./env-context.js

# Start of file
echo "window._env_ = {" >> ./env-context.js

# NOTE: printf '%s\n' = add a new line after string

# Read each line in .env file
for line in $(cat .env)
do
  if printf '%s\n' "$line" | grep -q -e '='; then
    envname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    envvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Get the value from the sourced environment
  value=$(printf '%s\n' "${!envname}")
  # if value is not set, get the value from the env file
  [[ -z $value ]] && value=${envvalue}

  echo "  $envname: \"$value\"," >> ./env-context.js
done

# End of file
echo "}" >> ./env-context.js
