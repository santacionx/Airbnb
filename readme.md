# Airbnb Project - Phase 1

## Description

This phase aims to establish the foundational structure and initial user interface elements for the Airbnb-like application using Node.js, Express, MongoDB, and EJS templating.

### Phase 1 Goals:

- Create a boilerplate structure for the application
- Implement layout templates using `ejs-mate`: navbar and footer
- Apply styling to `index.ejs` using Bootstrap and custom CSS
- Design the appearance of `new.ejs` (form), `edit.ejs` (card), and `show.ejs` pages

## Implementation Plan:

- **Boilerplate Setup:**
  - Set up the basic project structure and configuration files
  - Install required dependencies (`ejs`, `express`, `mongoose`, `method-override`, etc.)

- **Layout Templates:**
  - Utilize `ejs-mate` to create reusable layout components like navbar and footer

- **Styling:**
  - Apply Bootstrap framework to enhance the appearance of the `index.ejs` page
  - Design forms in `new.ejs` and cards in `edit.ejs` for a user-friendly interface
  - Customize the layout and style of the `show.ejs` page

# - Stages and Tasks

## Stage 0: Basic Setup

### Packages Installed:

- `ejs`: ^3.1.9
- `ejs-mate`: ^4.0.0
- `express`: ^4.18.2
- `method-override`: ^3.0.0
- `mongoose`: ^8.0.1
- `multer`: ^1.4.5-lts.1
- `nodemon`: ^3.0.1
- `uuid`: ^9.0.1

### Steps:

1. Create `app.js`
2. Database Setup:
   - Start MongoDB using Brew
   - Implement basic access to modules in `app.js`: Express, Mongoose, connect to DB named `wanderlust`
   - Create a `models` folder for schema setup, particularly `listing.js` containing: title, description, image, price, location, country
   - Initialize the database with predata using `data.js` and `index.js` into `wanderlust` DB
3. Routes:
   - Implement CRUD operations:
     - Index route: `index.ejs` GET /listings -> all listings
     - Show route (read): `show.ejs` GET /listing:id
     - New & Create route (create): `new.ejs` [form] GET /listings/new
     - Create route (method-override) POST /listings (store in DB)
     - Update (Edit & Update):
       - Edit route: `edit.ejs` [form] GET /listings/:id/edit
       - Update Route (method-override) PUT /listings/:id
     - Delete Route (method-override) DELETE /listings/:id

## Stage 1: Boilerplate and Styling

### Tasks:

- Create boilerplate structure
- Implement `navbar` using `ejs-mate`: `boilerplate.ejs`
- Develop `footer` with `ejs-mate`: `layouts.ejs`
- Style `index.ejs` using Bootstrap and custom CSS
- Style `new.ejs` (form), `edit.ejs` (card), and `show.ejs`

## Stage 2: Client-Side Validation and Error Handling

### Tasks:

- Implement client-side form validation
- Display success and failure messages
- Implement custom error handling
- Create a `utils` folder with:
  - `wrapasync`
  - `expresserror`
  - Design `error.ejs`
- Develop schema validation middleware `[schema.js]` using `joi` (backend)


-----------------------------
# End of Phase 1
