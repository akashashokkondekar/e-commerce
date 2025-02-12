# E-Commerce Website Project

## Project Overview
I have developed a functional, responsive e-commerce website with a product/home page and a persistent mini-basket that allows users to interact with their shopping cart seamlessly. This application fetches product data from the **mock.shop API**, displays product images, titles, descriptions, and prices, and allows users to add items to their basket. The mini basket remains persistent across page navigation and updates in real-time as users add or remove products.

The app features:
- A **product/home page** that displays essential product details and allows users to add products to their basket.
- A **mini basket** that:
  - Displays the items added to the basket.
  - Allows users to view the basket from any page.
  - Let users update the quantity or remove items.
  - Shows the total basket value dynamically.
  - Remove the item automatically if the user reduces the item count to 0.
- A **checkout page** where users can view the items in their basket and proceed with their final purchase by providing their Personal details.
- A **navigation bar** to simulate a multi-page app with links such as **Home** and **About Us**.
- The mini basket remains visible and functional across all pages, enhancing user experience.
- **Confetti Animation & Toast Notification** are triggered when a product is successfully added to the basket. This adds a fun and engaging micro-interaction, enhancing the overall user experience.
- A **Product Skelton loading indicator** is shown during data fetches or when a process is ongoing. This ensures users are aware when the application is loading or waiting for data, improving the UX during those times.
- If users attempt to access a page that doesn’t exist, they will be shown a custom **404 Error page** with an error message: "Opsss...page not found." This informs users when they navigate to a non-existent page, keeping the app user-friendly and informative.
- A **sliding banner feature** was added, which can be used to display offers, promotions, or announcements on the site. This dynamic element adds interactivity to the page and keeps users engaged.

The overall goal was to build a smooth, intuitive shopping experience with an emphasis on usability and performance. 

## **Live Demo**
```bash
https://osc-e-commerce.netlify.app/
```

## Setup Instructions
To set up the project on your local machine, follow these steps:

1.**Clone the repository:**
```bash
git clone https://github.com/akashashokkondekar/osc-e-commerce.git
cd <project-folder>
```

2.**Pull all branches** from the origin:
   ```bash
   git fetch --all
   ```

3.**Switch to the Deployment/Prod branch:**
  ```bash
  git checkout Deployment/Prod
  ```

4.**Install dependencies:** Ensure you are using **Node.js v18.16.0** and **npm v9.5.1** (use nvm or a similar version manager if needed).
  ```bash
  npm install
  ```
5.**Run the development server:**
```bash
  npm run dev
  ```
The application should now be running at **http://localhost:5173**.

6.**Running Tests:** You can run unit and integration tests using **Vitest**:
```bash
  npm run test
  ```
7.**Build for production:** If you would like to build the app for production:
```bash
npm run build
```
## **Technical Decisions and Reasoning**
- **React+Vite, TypeScript & Vite:** I chose React for its flexibility, component-based architecture, and large ecosystem, which is ideal for building interactive UIs. TypeScript was used for type safety, enhancing developer experience, and reducing runtime errors.
- **State Management:** React's built-in Context API was used to manage the basket state globally. This allows the mini basket to persist across different pages and routes without needing to re-fetch the basket data each time.
- **Routing:** React Router was used to implement navigation between pages, providing a smooth, single-page application experience.
- **UI/UX:** I used CSS Modules for styling the components, ensuring scoped and modular styles that prevent potential conflicts. Website was designed to be responsive and functional across devices.
- **App Performance Improvements:**
  - **Lazy Loading:** I implemented lazy loading for images and other media-heavy content. The decision to do so was driven by the need to improve initial page load times. By deferring the loading of images until they are needed (i.e., when they enter the viewport), I significantly reduced the initial resource load and minimized unnecessary network requests. This results in faster page rendering, particularly on slower networks and mobile devices, enhancing the user experience.
  - **Code Splitting (React.lazy & Suspense):** I used React.lazy() and Suspense to enable code splitting within the app. This decision helps optimize performance by breaking down the JavaScript bundle into smaller, manageable chunks, which are loaded only when needed. By loading only the code required for the current page, this reduces the overall bundle size and speeds up the initial load time. As the user navigates between pages, additional JavaScript is fetched on demand, making the app more responsive and efficient.

## **Potential Improvements (If Given More Time)**

- **Dynamic Toast Messages for Product Name:** Currently, the toast message shown when a product is added or removed from the basket is generic. It would be more user-friendly to dynamically display the product name in the toast notification, such as "Test Product 1 added to your basket."
- **Reusing Mini Basket Component on the Checkout Page:** Rather than using a separate UI for listing the cart items on the checkout page, the mini-basket item component can be reused. This will help maintain consistency across the application, reduce code duplication, and improve maintainability.
- **More Refined Folder Structure:** The current folder structure could be made more modular and efficient. Moving towards a structure where the pages and components are better organized can help improve the scalability of the project. This will make it easier to navigate and manage the app as it grows.
- **Redirect User to Home with Error Message on Empty Basket:** If the user removes all items from the basket via the mini basket in the navbar (when he/she is actually on the checkout page), it would be ideal to redirect them to the home page with a notification like, "Your basket is empty. Redirecting you to the home page in {X} seconds." This ensures that users are always aware of their actions and the resulting state. Also, this will help to minimize the user interaction of going back to the home/product page.
- **Hide Mini Basket UI on Clicking Anywhere (Except Mini Basket UI):** The mini basket UI (which pops up using NavBar) should hide if the user clicks anywhere outside the mini basket component on the page. This will enhance the usability of the application and prevent the UI from remaining open unintentionally.
- **Centralized Interfaces to Avoid Code Duplication:** I have noticed that some interfaces are defined multiple times in different places. Moving all interfaces to a single file and referencing them across components will improve the organization of the code and reduce duplication, making it easier to maintain.
- **Improvement of Mini Basket UI:** While functional, the mini basket UI could be improved in terms of user experience and design. Adding features like better animations, smoother transitions, and a more visually appealing design can make the application more engaging for users.
- **Converting the App to Remix (Future Enhancement):** Although the app is currently built with React and TypeScript, a potential improvement would be to migrate it to Remix. Remix provides more robust routing and enhanced data-fetching strategies, which could improve the performance and scalability of the app.
- **Pagination on Product Listing Page or Load items on Page Scroll:** Instead of loading the entire product list at once, I would prefer to implement a pagination feature, where a set number of unique products are loaded on each page. Alternatively, we can consider another approach where more items are loaded as the user scrolls down the page. I would prefer this method over pagination.
- **Implementing Basic CI Workflow on GitHub:** Setting up continuous integration (CI) using GitHub Actions will help automate testing and deployment processes. This will ensure that any changes made to the codebase are tested before deployment, reducing the risk of bugs in production.
- **Code Comments**: Although I have used clear and simple naming conventions for variables, functions, pages, components, etc., throughout the application code, I would still like to add comments where necessary to ensure complete clarity for everyone.
- **Better Error Handling**: To manage unexpected errors (such as failed API calls or network issues), I would implement Error Boundaries around important components. This would display fallback UIs, rather than causing the entire page to break, unlike the Toast message I currently use to show the error to the user.
- **More Micro-Interactions:** I would incorporate some fun micro-interactions, such as animating items when they are added, or removed, or the quantity is changed in the basket. Additionally, hovering over the product card would enlarge the corresponding cart item. These animations would improve the user experience, making the app feel more engaging and dynamic.

## Important References that I took it from:

- Confetti Effect: https://codepen.io/zer0kool/pen/KjZWRW
- Icons: https://lucide.dev/guide/packages/lucide-react
- Banner Slider: https://keen-slider.io/examples
- Toast Messages: https://www.npmjs.com/package/react-toastify
- Vitest + Jest: https://testing-library.com/docs/queries/byrole/
- Banner Slider Language: https://slogangenius.com/slogan-for-e-commerce/
- For Analyzing build: https://github.com/webpack-contrib/webpack-bundle-analyzer
