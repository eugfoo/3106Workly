# Workly

## Setup
Project Structure
```
backend/
frontend/
├── node_modules/ (Node modules folder for frontend)
├── public/
├── slices/
├── src/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
node_modules/ (Node modules folder for backend)
.gitignore
.env (Create this file)
package-lock.json
package.json
README.md
```
The node_modules folder for the backend is in the root directory. To install any npm packages for the backend, make sure that you are in this directory.  

The node_modules folder for the frontend is in the frontend/ directory. Again, make sure that you are in the correct directory.  

Within the root directory, create a `.env` file and enter the following environment variables:  
```
PORT=8000
DATABASE_URL=mongodb://localhost:27017/workly
JWT_SECRET=secret
EMAILJS_SERVICE_ID=service_vch2kx9
EMAILJS_TEMPLATE_ID=template_nbj82nm
EMAILJS_PUBLIC_KEY=CX1n_PEs7nMjxftrM
EMAILJS_PRIVATE_KEY=E2GBBplRkB0ANKaOIHTbN
```

Before running the project, make sure to install the necessary packages in both the frontend and backend using `npm install`  

To run the entire project (Both frontend and backend), use `npm run dev` in the root directory  
