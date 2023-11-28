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
-----------------------------

# End of Phase 1
# Project Phase 2

## Stage 1: Deletion Handling & Review Creation
- Handling deletion using Mongoose middlewares:
  - Cascading deletion vs. no data deletion scenarios
- Review model creation:
  - Fields: comment (string), ratings (1 to 5), createdAt (date, time)
- Review creation via form submission:
  - Endpoint: POST: /listings/:id/reviews
- Validation, rendering, and styling of reviews
- Deleting reviews from listings using Mongoose middlewares (pre, post)
- Implementation of delete listing functionality

## Stage 2: Express Router & Restructuring
- Implementation of Express Router
- Restructuring of listings and reviews
- Handling web cookies:
  - Sending cookies, using cookie parser, handling signed cookies

## Stage 3: Session Management & Flash Messages
- Introduction to state management
- Utilization of Express session:
  - Exploration of session options, storage, and usage
- Implementation of flash messages:
  - Configuration in app.js, listing.js, and views

## Stage 4: Authentication, Authorization & User Management
- Understanding authentication vs. authorization
- Storage of passwords: hashing, salting
- Overview of Passport.js for authentication
- Creation of user model (user.js)
- Configuration of Passport.js strategies
- Implementation of signup, login, and logout routes
- Redirection post-login based on the original page
- Set up authorization for listing owners

## Stage 5 Tasks
1. Connect the Login Route:
   - Implementation restricting creating a new listing without being logged in
2. Implement Logout Functionality:
   - Implement logout using Passport.js
3. Add Styling to Enhance UI
4. Enable Login After Signup Process
5. Develop the Post-Login Page
6. Set Up Authorization for Listing Owners and Reviews:
   - Implement authorization for `/LISTINGS` and `/reviews`

# End of Phase 2