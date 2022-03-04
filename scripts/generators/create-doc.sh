#!/bin/bash

serviceName="$1"
serviceTag="$(tr '[:lower:]' '[:upper:]' <<<"${serviceName}")_TAG"
modelName="$(tr '[:lower:]' '[:upper:]' <<<"${serviceName:0:1}")${serviceName:1}"

servicePath="src/services/$serviceName/doc"
templatePath="scripts/templates/doc"
expressFile="src/@types/express/index.d.ts"

openApiDirectory="src/services/open-api"
constantFile="$openApiDirectory/constants/index.ts"
openApiFile="$openApiDirectory/index.ts"

nameToReplace="SERVICE_NAME"
modelToReplace="MODEL_NAME"
tagToReplace="SERVICE_TAG"
insertImportTagAfter="GENERATED_TAG"
insertImportAfter="GENERATED_IMPORT"
insertTagAfter="ADD_TAG_GENERATED"
insertSchemaAfter="GENERATED_SCHEMA"
insertEndpointAfter="GENERATED_ENDPOINT"



sh "scripts/utils/create-folder.sh" "$servicePath/endpoints"
sh "scripts/utils/create-folder.sh" "$servicePath/schemas"

if [ ! -f "$servicePath/schemas/index.ts" ]
then
  cp -- "$templatePath/schema.ts.txt" "$servicePath/schemas/index.ts"
  sed -i '' "s/$modelToReplace/$modelName/g" "$servicePath/schemas/index.ts"

fi

if [ ! -f "$servicePath/endpoints/index.ts" ]
then
  cp -- "$templatePath/endpoints/create.ts.txt" "$servicePath/endpoints/create.ts"
  sed -i '' "s/$nameToReplace/$serviceName/g" "$servicePath/endpoints/create.ts"
  sed -i '' "s/$modelToReplace/$modelName/g" "$servicePath/endpoints/create.ts"
  sed -i '' "s/$tagToReplace/$serviceTag/g" "$servicePath/endpoints/create.ts"


  cp -- "$templatePath/endpoints/update.ts.txt" "$servicePath/endpoints/update.ts"
  sed -i '' "s/$nameToReplace/$serviceName/g" "$servicePath/endpoints/update.ts"
  sed -i '' "s/$modelToReplace/$modelName/g" "$servicePath/endpoints/update.ts"
  sed -i '' "s/$tagToReplace/$serviceTag/g" "$servicePath/endpoints/update.ts"


  cp -- "$templatePath/endpoints/show.ts.txt" "$servicePath/endpoints/show.ts"
  sed -i '' "s/$nameToReplace/$serviceName/g" "$servicePath/endpoints/show.ts"
  sed -i '' "s/$modelToReplace/$modelName/g" "$servicePath/endpoints/show.ts"
  sed -i '' "s/$tagToReplace/$serviceTag/g" "$servicePath/endpoints/show.ts"

  cp -- "$templatePath/endpoints/list.ts.txt" "$servicePath/endpoints/list.ts"
  sed -i '' "s/$nameToReplace/$serviceName/g" "$servicePath/endpoints/list.ts"
  sed -i '' "s/$modelToReplace/$modelName/g" "$servicePath/endpoints/list.ts"
  sed -i '' "s/$tagToReplace/$serviceTag/g" "$servicePath/endpoints/list.ts"


  cp -- "$templatePath/endpoints/index.ts.txt" "$servicePath/endpoints/index.ts"
  sed -i '' "s/$nameToReplace/$serviceName/g" "$servicePath/endpoints/index.ts"
fi

if [ -f "$constantFile" ]
then
  newExport="export const $serviceTag = '$modelName';"

  sed -i '' '/'"$insertImportTagAfter"'/ a\
'"$newExport"'
' $constantFile
fi

if [ -f "$openApiFile" ]
then
  serviceEndpoint="$serviceName"'Endpoints'
  importTag="$serviceTag,"
  importEndpoint="import $serviceEndpoint from '@services/$serviceName/doc/endpoints';"
  importSchema="import { $modelName } from '@services/$serviceName/doc/schemas';"

  sed -i '' '/'"$insertImportTagAfter"'/ a\
  '"$importTag"'
' $openApiFile
  sed -i '' '/'"$insertImportAfter"'/ a\
'"$importSchema"'
' $openApiFile
  sed -i '' '/'"$insertImportAfter"'/ a\
'"$importEndpoint"'
' $openApiFile

  sed -i '' '/'"$insertTagAfter"'/ a\
    '"{ name: $serviceTag },"'
' $openApiFile

  sed -i '' '/'"$insertSchemaAfter"'/ a\
      '"$modelName,"'
' $openApiFile

  sed -i '' '/'"$insertEndpointAfter"'/ a\
    '"...$serviceEndpoint,"'
' $openApiFile
fi
