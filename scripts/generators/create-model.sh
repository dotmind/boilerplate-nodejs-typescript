#!/bin/bash

serviceName="$1"

servicePath="src/services/$serviceName/models"
templatePath="scripts/templates"
expressFile="src/@types/express/index.d.ts"


echo "servicePath : $servicePath \rtemplatePath : $templatePath"

if [ ! -f "$servicePath/index.ts" ]
then
  cp -- "$templatePath/models.ts.txt" "$servicePath/index.ts"

  # Replace all template variable
  sed -i '' "s/SERVICE_NAME/$serviceName/g" "$servicePath/index.ts"

  # Uppercase first character
  modelName="$(tr '[:lower:]' '[:upper:]' <<<"${serviceName:0:1}")${serviceName:1}"

  sed -i '' "s/MODEL_NAME/$modelName/g" "$servicePath/index.ts"

  if [ -f "$expressFile" ]
  then
    import="IMPORT_GENERATED"
    type="ADD_GENERATED_TYPE"
    newImport="import { $modelName } from '@services/$serviceName/models';"
    newDef="$serviceName: $modelName;"
    newDefs="$serviceName"'s: '"$modelName[];"

    sed -i '' '/'"$import"'/ a\
'"$newImport"'
' $expressFile

    sed -i '' '/'"$type"'/ a\
      '"$newDef"'
' $expressFile

  sed -i '' '/'"$type"'/ a\
      '"$newDefs"'
' $expressFile
  fi
fi
