import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Login from "./routes/login";

// 使用 import.meta.glob 动态导入 pages 文件夹中的所有组件
const M_pages = import.meta.glob('./routes/M_pages/*.jsx');
const T_pages = import.meta.glob('./routes/T_pages/*.jsx');
const P_pages = import.meta.glob('./routes/P_pages/*.jsx');

function GetRouters(pages,path) {
  var routers = Object.keys(pages).map((key) => {
    //console.info(key.match(path));
    const name = key.match(path)[1];
    //console.info(name);
    const Component = React.lazy(pages[key]);
    return {
      path: `${name}`,
      element: (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component />
        </React.Suspense>
      ),
      errorElement: <ErrorPage />,
    };
  });
  routers.push({
    path: "*",
    loader: () => {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  })
  return routers;
}

const M_routes = GetRouters(M_pages,/\.\/routes\/M_pages\/(.*)\.jsx$/);
const T_routes = GetRouters(T_pages,/\.\/routes\/T_pages\/(.*)\.jsx$/);
const P_routes = GetRouters(P_pages,/\.\/routes\/P_pages\/(.*)\.jsx$/);

// 动态添加路由
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/manager" replace />,
    //errorElement: <ErrorPage />,
  },
  {
    path: "/manager",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: M_routes,
      },
    ],
  },
  {
    path: "/teacher",
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: T_routes,
      },
    ],
  },
  {
    path: "/public",
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: P_routes,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);