# Instructions for the Project AdonisJS - Schedule

## Install

```bash
git clone git@github.com:AloisSvnt/Schedule.git
cd Schedule
npm install
```

## Config :

##### 1. Create the .env from .env.exemple
```bash
cp .env.example .env
```

##### 3. Generate the APP_KEY'
```bash
node ace generate:key
```

##### 3. Create the folder '/tmp'
```bash
mkdir tmp
```

## Migrations

```bash
node ace migration:run
```

## Seeds

```bash
node ace db:seed
```

## Server

```bash
npm run dev
```