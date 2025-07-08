# Lincoln School Frontend

A modern, scalable web application for managing student data at Lincoln School.

## Tech Stack

- **Next.js 15** (App Router)
- **React 18** (Functional Components)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Utility-first styling)
- **Shadcn UI** & **Radix UI** (Accessible UI components)
- **PostgreSQL** (Backend database)
- **Zod** (Validation)
- **Jest** & **React Testing Library** (Testing)

## Project Structure

- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable UI and feature components
- `lib/` — Types, utilities, and backend helpers
- `public/` — Static assets

## Development Guidelines

- **Type Safety:** Use TypeScript interfaces for all data and props
- **Component-Driven:** Prefer functional, composable components
- **Styling:** Use Tailwind CSS and Shadcn UI for consistent, accessible design
- **State Management:**
  - Use local state/hooks for UI and in-memory data (e.g., searching/sorting 1200 records)
  - Use TanStack Query for server data fetching and caching
  - Use Redux Toolkit only for complex, global state needs
- **Data Fetching:**
  - Fetch all student records once, cache on the client
  - Perform searching and sorting in-memory
  - Use server-side caching to minimize database load
- **Validation:** Use Zod for schema validation
- **Testing:** Write unit and integration tests for all components and logic
- **Accessibility:** Follow a11y best practices (semantic HTML, keyboard navigation, color contrast)

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run test` — Run tests

## Contributing

- Follow code style and naming conventions
- Write clear, concise JSDoc comments for public APIs
- Document new components and utilities

## License

MIT

## API Documentation

### Endpoint: `/api/students`

- **Method:** `GET`
- **Description:** Retrieve a list of students. Supports searching/filtering by any field.
- **Query Parameters:** Any field listed below can be used as a query parameter for filtering. All parameters are optional and can be combined.

#### Student Fields

- `id` (string)
- `census_record_1900` (string)
- `indian_name` (string)
- `family_name` (string)
- `english_given_name` (string)
- `alias` (string)
- `sex` (string)
- `year_of_birth` (number)
- `year_of_birth_uncertain` (boolean)
- `year_of_birth_uncertainty_type` (string)
- `year_of_birth_original_text` (string)
- `arrival_at_lincoln` (ISO date string)
- `arrival_at_lincoln_uncertain` (string)
- `arrival_at_lincoln_uncertainty_type` (string)
- `arrival_at_lincoln_original_text` (string)
- `departure_from_lincoln` (ISO date string)
- `departure_from_lincoln_uncertain` (string)
- `departure_from_lincoln_uncertainty_type` (string)
- `departure_from_lincoln_original_text` (string)
- `nation` (string)
- `band` (string)
- `agency` (string)
- `trade` (string)
- `source` (string)
- `comments` (string)
- `cause_of_death` (string)
- `cemetery_burial` (string)
- `relevant_links` (string)

#### Example: Search by Family Name and Nation

```
GET /api/students?family_name=Smith&nation=Omaha
```

#### Example: Search by Year of Birth Range

```
GET /api/students?year_of_birth_gte=1880&year_of_birth_lte=1890
```

#### Response

- **200 OK**
- **Body:** Array of student objects matching the filter criteria

```json
[
  {
    "id": "1",
    "census_record_1900": "...",
    "indian_name": "...",
    "family_name": "Smith",
    "english_given_name": "John"
    // ...other fields
  }
  // ...more students
]
```

### Filtering Examples

#### 1. Filter by Name (Partial Match)

```
GET /api/students?english_given_name=John
```

- Returns students whose English given name contains "John" (case-insensitive).

#### 2. Filter by Sex

```
GET /api/students?sex=F
```

- Returns all female students.

#### 3. Filter by Nation

```
GET /api/students?nation=Omaha
```

- Returns all students from the Omaha nation.

#### 4. Filter by Band

```
GET /api/students?band=Wolf
```

- Returns all students from the Wolf band.

#### 5. Filter by Year of Birth (Exact and Range)

```
GET /api/students?year_of_birth=1885
GET /api/students?year_of_birth_gte=1880&year_of_birth_lte=1890
```

- Returns students born in 1885, or between 1880 and 1890 (inclusive).

#### 6. Filter by Arrival/Departure Dates (Range)

```
GET /api/students?arrival_at_lincoln_gte=1890-01-01&arrival_at_lincoln_lte=1895-12-31
GET /api/students?departure_from_lincoln_gte=1892-01-01&departure_from_lincoln_lte=1894-12-31
```

- Returns students who arrived or departed within the specified date ranges (use ISO date format: YYYY-MM-DD).

#### 7. Filter Out Records with Empty Fields

```
GET /api/students?exclude_empty=family_name,english_given_name
```

- Returns only students where `family_name` and `english_given_name` are not empty/null.
- You can specify any comma-separated list of fields to require non-empty values.
