# Planning poker - frontend


## Team Members


| Name              | University ID       |
|-------------------|---------------------|
| Julia Mularczyk     | 148062             |
| Miłosz Matuszewski        | 148185             |
| Jan Szczuka      | 148075             |
| Jakub Mrówczyński     | 148068             |



## Getting Started

First, run the development server:
Node.js is required to start the application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to deploy

To deploy frontend side of the application, one needs to specify all the environemnt variables that are stated in ci/cd pipeline file and run command below.
```bash
npx sst deploy --stage prod
```

