#!/bin/bash

serviceName="$1"

servicePath="src/services/$serviceName/routes"
templatePath="scripts/templates"

echo "servicePath : $servicePath \rtemplatePath : $templatePath"

if [ ! -f "$servicePath/index.ts" ]
then
  cp -- "$templatePath/routes.ts.txt" "$servicePath/index.ts"

  # Replace all template variable
  sed -i '' "s/SERVICE_NAME/$serviceName/g" "$servicePath/index.ts"
fi
