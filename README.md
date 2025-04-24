# Odeon-Cinema-Charlestown

this is running on Azure- VM .. address for this is : http://20.117.236.158/
 --------------------------------------------------------------Odeon Charlestown---------------------------------------------------------------------------------------------------------


 Business Requirements and Functionalities

    Movie Listings: Home page displays a collection of movies with cards and a Bootstrap carousel.

    User Login/Signup: Users can register and login using email and password - redirect user based on role.

    Cart System: Logged-in users can add movies to their cart, update quantity, or delete movies.

    Admin Access: Admin users (verified via email stored in admin.json) can view all user data in /Admin.html where userdetail will be fetched dynamically.

     Order Handling: Cart updates reflect user-specific movie selections with quantities on cart page which can be accesed dynamically in table format with button to update and      delete in /cart.html (path)

     Dynamic Frontend: Pages use JavaScript to handle interactions like add/remove movies, update cart, fetch cart , fetch user-admin only and so on.


     Tools & Technologies Used

Backend:

    Node.js with Express.js on port:3000 value for port is in config.env file

    MongoDB (Local instance)

    JSON Web Tokens for authentication

    bcryptjs for encrypting user password we are using PEPPER+Password to make it more secure PEPPER is saved inside config.env file 

    Custom middleware for token verification and admin access

Frontend:

    HTML5

    CSS3

    JavaScript (Vanilla JS)

    Bootstrap (v5+) – for responsive design, carousel, buttons, grid , cards

Other Tools:

    dotenv – for environment variables

    bcrypt – for password hashing

    nodemon – for local development

    mongodb & mongoose – for database interaction

Project Structure Overview

     – Static files (HTML, CSS, JS) are fetched by express static sending Frontend(folder) as base 

    /backend

        /controller – Business logic for user and cart operations

        /routes – Express routing logic (userRoutes.js, cartRoutes.js)

        /model – Schema for mongodb for user and cart

        /server/server.js – Main server entry point
    /data
        /admin.json – Stores admin email(s) for login checks

    /Frontend -static folder file 

        /css - for all css files used by pages
        /images -containing all images used by pages
        /js - all js code for particular pages

        admin.html -for admin page
        carts.html -for cart page 
        index.html - index page 
        user.html -login/logout page 

   config.env – Environment variables (PEPPER, SECRET, PORT)
   package.json - All packages and sripts 
   README.md  - Readme instruction along with buisiness logic , refrences and software used 


   Attributions & References

    Bootstrap Carousel and Cards: https://getbootstrap.com/docs/5.3/components/carousel/
    Bootstrap Login/Regitser using Pills : https://mdbootstrap.com/docs/standard/extended/login/ 

    Code Inspiration/Logic Reference:

        Basic Express Server: https://expressjs.com/

        MongoDB & Mongoose Docs: https://mongoosejs.com/docs/guide.html

    Admin Auth Logic: Inspired by typical role-based authentication models using JSON and middleware. 

    Frontend Interaction Patterns: Inspired from standard vanilla JS and Bootstrap interactions (e.g., dynamic cart updates).

