#!/bin/bash

serviceName="$1"

servicePath="src/services/$serviceName/validators"
templatePath="scripts/templates"

echo "servicePath : $servicePath \rtemplatePath : $templatePath"

if [ ! -f "$servicePath/index.ts" ]
then
  cp -- "$templatePath/validators.ts.txt" "$servicePath/index.ts"

  # Replace all template variable
  sed -i '' "s/SERVICE_NAME/$serviceName/g" "$servicePath/index.ts"
fi
