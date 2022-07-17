#!/bin/bash

# re-create file
rm -rf ./env-context.js
touch ./env-context.js

# Start of file
echo "window._env_ = {" >> ./env-context.js

# NOTE: printf '%s\n' = add a new line after string

targetFile=""
if test -f ".env";
then
  targetFile=.env
else
  targetFile=.env-defaults
fi

echo Reading from environment file: $targetFile

# Read each line in environment file
for line in $(cat $targetFile)
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
