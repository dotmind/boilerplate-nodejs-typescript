## 🚀 Getting Started

First, to launch the project locally create `.env` file and run the development server:

```bash
npm run dev
# or
yarn dev
```

## 🛠 Example

An example of service exists in project :
- `src/services/notifications`:
  - controllers -> send response to client (no logic in the controller function)
  - doc -> create open documentation
  - middlewares -> process client request
  - models -> create mongoose models
  - routes -> create routes for services and call middlewares + controllers
  - types -> only type in services scope
  - validators -> validators of request

## 🚚 Documentation

To create route documentation, you need :
- Create schema (`src/services/YOUR_SERVICE/doc/schemas/index.ts`)
  - export schemas to show in documentation (ex: `src/services/notifications/doc/schemas/index.ts`)
- Create Endpoints (`src/services/YOUR_SERVICE/doc/endpoints/index.ts`)
  - export endpoints (ex: `src/services/notifications/doc/endpoints/index.ts`)
- Import Schema and Endpoints on `src/services/open-api/index.ts`
  - On this file you are comment with `@TODO` to add documentation schema + endpoint + some instructions

## 🎉 Use boilerplate
- git clone git@github.com:dotmind/boilerplate-nodejs-typescript.git myProject
- git remote add origin1 MY_GITHUB_PROJECT
- git branch -M main
- git push -u origin1 main
- git remote remove origin
- git remote rename origin1 origin

## 🔑 Api key
- generate public / private api key : `npm run bash:generate-keys`
- generate new api key : `npm run cli:apikey`
