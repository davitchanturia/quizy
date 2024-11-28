# Quizy 🎲

## Overview

Quizy is a dynamic web application that empowers users to create, share, and participate in interactive quizzes. Whether you're an educator, team leader, or quiz enthusiast, Quizy provides a flexible platform for generating engaging quiz experiences.

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

## Installation

1. Clone the repository

```bash
git clone git@github.com:davitchanturia/quizy.git
```

```bash
cd quizy
```

2. Install dependencies

```bash
npm install
```

3. env

```bash
cp .env.example .env
```

by default backend urls are set to localhost:8000, if you are using different urls, change them in .env file

```bash
NUXT_API_BASE_URL=
NUXT_BACKEND_BASE_URL=
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build production application
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Automatically fix ESLint issues

## Packages & Technologies

### Stack

- Vue.js
- Nuxt.js
- Typescript

### libraries

- Tailwind CSS
- PrimeVue
- Pinia

### Validation & Utilities

- Yup (Form Validation)
- VueUse (Composition Utilities)

### Development Tools

- ESLint
- Prettier

## API Reference

to set up quizy you need to set up api first.
[here](https://github.com/davitchanturia/quizy-api) you can check api repository. Backend is written in Laravel.
