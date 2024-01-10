<div>
<h1 align="center">
Brain Agriculture API
</h1>
</div>

<div align="center">

<img src="https://img.shields.io/badge/NodeJS-18.17.1-green">

<img src="https://img.shields.io/badge/Nest.js-17.0.2-EA2845">

<img src="https://img.shields.io/badge/Typescript-5.1.3-blue">

</div>

# Overview

"Brain Agriculture" is an API for registering agricultural producers and their farms. The platform was created using Node.js with the Nest.JS framework and TypeScript. Some concepts of Domain-Driven Design (DDD) were employed in its development. PostgreSQL was chosen as the relational database. The project includes unit tests.

# Contribute

1. Clone the repository:

```shell
git clone https://github.com/wendelsantosd/brain-agriculture-api.git
```

2. Enter the directory:

```shell
cd brain-agriculture-api
```

3. Install dependencies:

```shell
yarn
```

4. Start development server:

```shell
yarn start:dev
```

# PostgreSQL with Docker

1. Execute:

```shell
docker compose -f docker-compose.local.yml up -d
```

# Routes

1. Create a Farmer

```shell
POST
```

```shell
/farmer
```

```shell
body: {
    "name": "Name Example",
    "cpfCnpj": "00000000000",
    "farmName": "Farm Example",
    "city": "São Paulo",
    "state": "São Paulo",
    "totalArea": 1000,
    "agriculturalArea": 500,
    "vegetationArea": 500,
    "plantedCrops": [
        "Soja",
        "Milho",
        "Algodão",
        "Café",
        "Cana de Açucar",  
    ]
}
```

2. Update a Farmer

```shell
PUT
```

```shell
/farmer/:id
```

```shell
body: {
    "name": "Name Example",
    "cpfCnpj": "00000000000",
    "farmName": "Farm Example",
    "city": "São Paulo",
    "state": "São Paulo",
    "totalArea": 1000,
    "agriculturalArea": 500,
    "vegetationArea": 500,
    "plantedCrops": [
        "Soja",
        "Milho",
        "Algodão",
        "Café",
        "Cana de Açucar",  
    ]
}
```

3. List Farmers

```shell
GET
```

```shell
/farmer
```

3. Get a Farmer

```shell
GET
```

```shell
/farmer/:id
```

4. Delete a Farmer

```shell
DELETE
```

```shell
/farmer/:id
```

5. Data for Dashboard (Calculate)

```shell
GET
```

```shell
/farmer/calculate
```

# Contact us

<p style="font-size: 18px;">
Wendel Santos, 2024.
</p>
<p style="font-size: 18px;">
wendelwcsantos@gmail.com
</p>
