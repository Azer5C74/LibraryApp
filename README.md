
# OLYX Library

Olyx Library Graphql API.



## Prerequisites
Before you begin, ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm (Node Package Manager) or Yarn
- MySQL (or other supported database)
- Insomnia
## Run Locally

Unzip the Library.zip file
Head into the directory of the project using your terminal/cmd depending on your operating system.

#### Step1: Install dependencies
```
    npm install
    # or
    yarn install
```
#### Step2: Edit the .env file in the project root and provide your MySQL database credentials

#### Step3: Run database migrations to create the necessary tables:
```
    npx prisma migrate dev
```

#### Step4: Seeding the DB
```
    Windows :  npx ts-node .\prisma\seed.ts
    Linux/OSX: npx ts-node ./prisma/seed.ts
```

#### Step5: Run the Project
```
    npm start
    # or
    yarn start
```

#### Hint: If for some reason you needed to reset the tables it is possible using this command
```
    Windows :  npx ts-node .\prisma\seed-reset.ts
    Linux/OSX: npx ts-node ./prisma/seed-reset.ts
```

##### Finally Enjoy and happy testing!
## Authors

- [@Azer](https://github.com/Azer5C74)
