#!/bin/bash

serviceName="$1"

servicePath="src/services/$serviceName/middlewares"
templatePath="scripts/templates"

echo "servicePath : $servicePath \rtemplatePath : $templatePath"

if [ ! -f "$servicePath/index.ts" ]
then
  cp -- "$templatePath/middlewares.ts.txt" "$servicePath/index.ts"

  # Replace all template variable
  sed -i '' "s/SERVICE_NAME/$serviceName/g" "$servicePath/index.ts"

  # Uppercase first character
  modelName="$(tr '[:lower:]' '[:upper:]' <<<"${serviceName:0:1}")${serviceName:1}"

  sed -i '' "s/MODEL_NAME/$modelName/g" "$servicePath/index.ts"
fi
