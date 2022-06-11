#!/bin/bash

# re-create file
rm -rf ./load-env.js
touch ./load-env.js

# Start of file
echo "window._env_ = {" >> ./load-env.js

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

  echo "  $envname: \"$value\"," >> ./load-env.js
done

# End of file
echo "}" >> ./load-env.js