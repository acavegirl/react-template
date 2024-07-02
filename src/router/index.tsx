import { createBrowserRouter } from "react-router-dom";
import Statistics from '@/pages/Statistics'
import FM from '@/pages/FM'
import TopLayout from '@/components/Layout/TopLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopLayout />,
    children: [
      {
        element: <FM />,
        index: true,
      },
      {
        path: 'statistics',
        element: <Statistics />
      },
      {
        path: 'fm',
        element: <FM />,
      }
    ]
  }
], { basename: "/file_manager" })
export default router
