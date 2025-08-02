# TypeScript Complete Guide

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static type definitions to JavaScript, which helps catch errors during development.

## Installation

### Global Installation
```bash
npm install -g typescript
```

### Project-specific Installation
```bash
npm install --save-dev typescript
npm install --save-dev @types/node  # For Node.js types
```

### Using with Create React App
```bash
npx create-react-app my-app --template typescript
```

### Using with Next.js
```bash
npx create-next-app@latest my-app --typescript
```

## Basic Setup

### 1. Initialize TypeScript Configuration
```bash
tsc --init
```

This creates a `tsconfig.json` file with default settings.

### 2. Basic tsconfig.json Example
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020", "dom"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Basic TypeScript Syntax

### 1. Basic Types
```typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let data: null = null;
let value: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuple
let person: [string, number] = ["John", 30];

// Any (avoid when possible)
let anything: any = "could be anything";

// Unknown (safer than any)
let userInput: unknown;

// Void (for functions that don't return)
function logMessage(): void {
  console.log("Hello");
}

// Never (for functions that never return)
function throwError(): never {
  throw new Error("Error occurred");
}
```

### 2. Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

// Using the interface
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};

// Function interfaces
interface Calculate {
  (x: number, y: number): number;
}

const add: Calculate = (a, b) => a + b;
```

### 3. Types and Type Aliases
```typescript
// Type aliases
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

// Object types
type Product = {
  id: ID;
  name: string;
  price: number;
  status: Status;
};

// Function types
type EventHandler = (event: Event) => void;

// Union types
type StringOrNumber = string | number;

// Intersection types
type Admin = User & {
  permissions: string[];
  role: "admin";
};
```

### 4. Classes
```typescript
class Animal {
  private name: string;
  protected species: string;
  public age: number;

  constructor(name: string, species: string, age: number) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  public getName(): string {
    return this.name;
  }

  protected getSpecies(): string {
    return this.species;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, breed: string, age: number) {
    super(name, "Canine", age);
    this.breed = breed;
  }

  public getInfo(): string {
    return `${this.getName()} is a ${this.breed} (${this.getSpecies()})`;
  }
}
```

### 5. Generics
```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Using generics
let output1 = identity<string>("hello");
let output2 = identity<number>(42);

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Generic class
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const stringStore = new DataStore<string>();
const numberStore = new DataStore<number>();
```

### 6. Enums
```typescript
// Numeric enum
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// String enum
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

// Using enums
let userDirection: Direction = Direction.Up;
let favoriteColor: Color = Color.Blue;
```

## Advanced Features

### 1. Utility Types
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - exclude specific properties
type UserWithoutPassword = Omit<User, "password">;

// Required - makes all properties required
type RequiredUser = Required<PartialUser>;

// Record - create object type with specific keys and values
type UserRoles = Record<string, "admin" | "user" | "guest">;
```

### 2. Conditional Types
```typescript
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
```

### 3. Mapped Types
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};
```

## Common Patterns

### 1. React Component with TypeScript
```typescript
import React from 'react';

interface Props {
  title: string;
  count: number;
  onIncrement: () => void;
}

const Counter: React.FC<Props> = ({ title, count, onIncrement }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
};

export default Counter;
```

### 2. API with TypeScript
```typescript
interface ApiError {
  message: string;
  code: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message);
    }
    
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### 3. Event Handling
```typescript
// DOM events
function handleClick(event: MouseEvent): void {
  event.preventDefault();
  console.log('Button clicked');
}

// Custom events
interface CustomEventData {
  userId: number;
  action: string;
}

type CustomEventHandler = (data: CustomEventData) => void;

const handleCustomEvent: CustomEventHandler = (data) => {
  console.log(`User ${data.userId} performed ${data.action}`);
};
```

## Build and Development

### 1. Compilation
```bash
# Compile TypeScript files
tsc

# Compile specific file
tsc app.ts

# Watch mode
tsc --watch

# Compile to specific directory
tsc --outDir dist
```

### 2. Development with ts-node
```bash
# Install ts-node for development
npm install --save-dev ts-node

# Run TypeScript directly
npx ts-node app.ts

# Or add to package.json scripts
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### 3. With Webpack
```typescript
// webpack.config.js
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

## Best Practices

### 1. Type Safety
```typescript
// Use strict mode
"strict": true

// Prefer interfaces over types for object shapes
interface User {
  name: string;
  age: number;
}

// Use types for unions and computed types
type Status = "loading" | "success" | "error";

// Avoid any, use unknown instead
function processInput(input: unknown) {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  return String(input);
}
```

### 2. Naming Conventions
```typescript
// Interfaces: PascalCase
interface UserProfile {}

// Types: PascalCase
type ApiResponse = {};

// Variables/functions: camelCase
const userName = "john";
function getUserData() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";

// Enums: PascalCase
enum HttpStatus {
  OK = 200,
  NotFound = 404
}
```

### 3. Error Handling
```typescript
// Custom error types
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Result type pattern
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function safeApiCall(): Promise<Result<User>> {
  try {
    const user = await fetchUser(1);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

## Common Tools and Libraries

### 1. ESLint with TypeScript
```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Prettier
```bash
npm install --save-dev prettier
```

### 3. Jest for Testing
```bash
npm install --save-dev jest @types/jest ts-jest
```

### 4. Popular Type Definitions
```bash
npm install --save-dev @types/node
npm install --save-dev @types/react
npm install --save-dev @types/express
npm install --save-dev @types/lodash
```

## Migration from JavaScript

### 1. Gradual Migration
```typescript
// Start with .ts files and basic types
// Rename .js to .ts gradually
// Add types incrementally
// Use // @ts-ignore for temporary issues

// Example migration step
// Before (JavaScript)
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// After (TypeScript)
interface Item {
  price: number;
  name: string;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

This guide covers the essential aspects of TypeScript. Start with basic types and gradually move to more advanced features as you become comfortable with the language.