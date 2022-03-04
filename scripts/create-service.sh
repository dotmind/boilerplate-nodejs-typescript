#!/bin/bash

path="src/services"
templatePath="scripts/templates"

echo "What is service's name? \r"
read -p "" name
response() {
  pathname="$path/$name"
  sh "scripts/utils/create-folder.sh" "$pathname"
}

response

createModel() {
  modelPath="$pathname/models"

  echo "Create models directory ..."
  sh "scripts/utils/create-folder.sh" "$modelPath"

  echo "Create models index ..."
  sh "scripts/generators/create-model.sh" $name

  validatorPath="$pathname/validators"

  echo "Create validators directory ..."
  sh "scripts/utils/create-folder.sh" "$validatorPath"

  echo "Create validators index ..."
  sh "scripts/generators/create-validator.sh" $name
}

while true; do
  read -r -p "With model? (Y/N): " withModel
  case $withModel in
    [Yy]* ) createModel; break;;
    [Nn]* ) break;;
    * ) echo "Please answer Y or N.";;
  esac
done


createController() {
  middlewarePath="$pathname/middlewares"

  echo "Create middleware directory ..."
  sh "scripts/utils/create-folder.sh" "$middlewarePath"

  echo "Create middleware index..."
  sh "scripts/generators/create-middleware.sh" "$name"

  controllerPath="$pathname/controllers"

  echo "Create controller directory..."
  sh "scripts/utils/create-folder.sh" "$controllerPath"

  echo "Create controller index..."
  sh "scripts/generators/create-controller.sh" "$name"


  routePath="$pathname/routes"

  echo "Create route directory..."
  sh "scripts/utils/create-folder.sh" "$routePath"

  echo "Create route index..."
  sh "scripts/generators/create-route.sh" "$name"
}

while true; do
  read -r -p "With controller? (Y/N): " withController
  case $withController in
    [Yy]* ) createController; break;;
    [Nn]* ) break;;
    * ) echo "Please answer Y or N.";;
  esac
done

createDoc() {
  docPath="$pathname/doc"
  sh "scripts/utils/create-folder.sh" "$docPath"
  sh "scripts/generators/create-doc.sh" "$name"
}

while true; do
  read -r -p "With doc? (Y/N): " withDoc
  case $withDoc in
    [Yy]* ) createDoc; break;;
    [Nn]* ) break;;
    * ) echo "Please answer Y or N.";;
  esac
done
