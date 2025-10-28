# React Features Used in This Project

```
<react-app>-
  /public
  /src -
    -/assets
    -/components
    -/context
    -/pages
    -App.jsx
    -App.css
    -index.css
    -main.jsx
  -index.html
  -package.json

```
---

## 1. Functional Components

All UI pieces like the `Navbar`, `ProductCard`, and `Home page` are built as **functional components** instead of class components.

**Syntax:**

```jsx
function ProductCard({ product }) {
  return (
    <div>
      <h5>{product.title}</h5>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductCard;
```

**Explanation:**
Functional components are plain JavaScript functions that return JSX. They are lightweight and the preferred way to create components in modern React.

---

## 2. JSX (JavaScript XML)

JSX allows writing HTML-like syntax directly inside JavaScript, making UI structure more readable and declarative.

**Syntax:**

```jsx
return (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
```

**Explanation:**
JSX combines markup with JavaScript logic. Curly braces `{}` allow embedding dynamic data or expressions.

---

## 3. Props (Component Properties)

Props are used to pass data from a parent component to a child component.

**Syntax:**

```jsx
<ProductCard product={item} />
```

**Child Component:**

```jsx
function ProductCard({ product }) {
  return <h5>{product.title}</h5>;
}
```

**Explanation:**
Props make components reusable by allowing them to receive different data and behave differently based on input.

---

## 4. useState Hook

The `useState` hook allows React components to store and update local state.

**Syntax:**

```jsx
import { useState } from "react";

const [currency, setCurrency] = useState("USD");
```

**Explanation:**
`useState` returns an array with the current state value and a function to update it.
It is commonly used for form inputs, UI toggles, and simple data handling.

---

## 5. useEffect Hook

The `useEffect` hook is used for performing **side effects** like fetching data from an API or updating the document title.

**Syntax:**

```jsx
useEffect(() => {
  fetchData();
}, []);
```

**Explanation:**
The function inside `useEffect` runs after the component renders.
An empty dependency array `[]` ensures the effect runs only once when the component mounts.

---

## 6. useContext Hook

The `useContext` hook allows components to access shared data without prop drilling.
Used here for global features like the **currency converter**.

**Syntax:**

```jsx
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

const { currency, setCurrency } = useContext(CurrencyContext);
```

**Explanation:**
`useContext` subscribes the component to the context value. When the context value changes, all subscribed components re-render automatically.

---

## 7. createContext API

Used to create a global data store accessible from any component in the app.

**Syntax:**

```jsx
import { createContext } from "react";

export const CurrencyContext = createContext();
```

**Explanation:**
`createContext` returns an object that holds a provider and a consumer.
In this project, the `CurrencyProvider` wraps the entire app so all components can use currency data and conversion rates.

---

## 8. Context Provider Pattern

A provider component supplies data and functions to the entire app tree.

**Syntax:**

```jsx
<CurrencyContext.Provider value={{ currency, setCurrency }}>
  {children}
</CurrencyContext.Provider>
```

**Explanation:**
Everything inside the provider can access its value.
Here, currency, conversion functions, and API data are shared across all pages.

---

## 9. Custom Hooks

A **custom hook** is a reusable function that uses React hooks internally.
This project includes a custom hook `useCurrency()` for easy access to currency context data.

**Syntax:**

```jsx
export const useCurrency = () => useContext(CurrencyContext);
```

**Explanation:**
It simplifies imports and makes the code cleaner — any component can call `useCurrency()` to get currency data and functions.

---

## 10. Conditional Rendering

Used to display different UI based on state, such as showing "Loading..." when API data is not ready.

**Syntax:**

```jsx
{loading ? "Loading..." : `${getSymbol()} ${convertPrice(price)}`}
```

**Explanation:**
The ternary operator checks a condition and renders one of two elements depending on the result.

---

## 11. React Router (v6+)

Used to handle multiple pages (Home, About, Contact) with clean URL-based navigation.

**Syntax:**

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "about", element: <About /> },
]);

<RouterProvider router={router} />;
```

**Explanation:**
React Router allows navigation without reloading the page, providing a single-page app experience with multiple routes.



---

## 12. Context + API Integration with Axios

Currency conversion rates are fetched from a public API using Axios.

**Syntax:**

```jsx
useEffect(() => {
  const fetchRates = async () => {
    const res = await axios.get("https://api.exchangerate.host/latest?base=USD");
    setRates(res.data.rates);
  };
  fetchRates();
}, []);
```

**Explanation:**
Axios is an HTTP client. The fetched data is stored in context and shared globally for conversions.

---

## 13. Dynamic Class and Attribute Binding

React allows conditional or dynamic assignment of classes and attributes.
  - While mapping array objects to components, each component carries its own values for props in which attributes like `href`, `src`, `alt`, `target`, `style`, etc can be used for providing dynamic component building.
  - Class names can also be decided on the basis of props using conditional statements and expressions.


**Syntax:**

```jsx
<img
  src={`/images/products/${product.img_src}`}
  className="card-img-top"
  alt={product.title}
/>
```

**Explanation:**
Here the image source and alt text are dynamically generated from product data.

---

## 14. Mapping Arrays to Components

Used in the Home page to render multiple product cards dynamically.

**Syntax:**

```jsx
{products.map((item) => (
  <ProductCard key={item.id} product={item} />
))}
```

**Explanation:**
`map()` loops through an array of objects and renders a component for each item.
A unique `key` is required for efficient re-rendering.

---

## 15. Component Composition

Smaller components like `ProductCard`, `Navbar`, and `Carousel` are combined to form larger pages such as `Home` or `App`.

**Syntax:**

```jsx
function Home() {
  return (
    <>
      <Carousel />
      <ProductList />
    </>
  );
}
```

**Explanation:**
React encourages composition — building UIs by combining smaller, focused components.

---

## 16. StrictMode

Used in the root file (`main.jsx`) to highlight potential problems in an application.

**Syntax:**

```jsx
<StrictMode>
  <RouterProvider router={router} />
</StrictMode>
```

**Explanation:**
`StrictMode` doesn’t render visible UI but helps find bugs by running certain checks twice in development.

---

## 17. Default Exports and Imports

Each component is exported as default and imported without curly braces.

**Syntax:**

```jsx
export default Navbar;
import Navbar from "./components/Navbar/Navbar";
```

**Explanation:**
Default exports make the import syntax cleaner and easier to maintain.

---

## 18. Bootstrap Integration in React

Bootstrap CSS and JS are imported globally in `main.jsx` for responsive design and interactivity.

**Syntax:**

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
```

**Explanation:**
Bootstrap provides pre-built UI classes for layout, grid, buttons, and responsiveness without extra dependencies.

---

## 19. File-Based Modularity

The project follows a clear structure separating components, pages, and context:

```
src/
  components/
  context/
  pages/
  App.jsx
  router.jsx
```

**Explanation:**
This modular structure keeps the project maintainable, scalable, and easy to understand.

---

## 20. Responsive and Declarative UI

All layouts use **Bootstrap grid classes** and **React declarative syntax** to ensure a mobile-first, responsive design.

**Syntax:**

```jsx
<div className="col-12 col-sm-6 col-md-4 col-lg-3">
  <ProductCard product={item} />
</div>
```

**Explanation:**
Bootstrap grid ensures that cards adjust automatically to different screen sizes without extra CSS.

---


