import React, { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import Page1 from '@/pages/Page1'
import Page2 from '@/pages/Page2'

const BasicLayout = React.lazy(() => import('@/components/Layout/BasicLayout'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        element: <Page1 />,
        index: true,
      },
      {
        path: 'api',
        children: [
          {
            path: 'page1',
            element: <Page1 />
          },
        ],
      },
      {
        path: 'page2',
        element: <Page2 />,
      }
    ]
  }
])
export default router
