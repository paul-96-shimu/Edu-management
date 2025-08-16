import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayots from "../layouts/RootLayots";
import Home from "../Pages/Home";
import AuthLayouts from "../AuthLayouts/AuthLayouts";

import Login from "../Authentation/Login";
import Register from "../Authentation/Register";



import PrivteRoute from "./PrivteRoute";

import DashBoard from "../layouts/DashBoard";

import TeachOnEdu from "../Pages/TeachOnEdu";
import AllClass from "../Pages/Home/AllClass";

import MyClass from "../Pages/Dasboard/MyClass";
import PendingClasses from "../Pages/Admin/PendingClasses";
import AddClass from "../Pages/Dasboard/TeacherAddclass/AddClass";

import TeacherRequest from "../Pages/Admin/TeacherRequest";
import MyEnrollClass from "../Pages/Dasboard/Studen Dashoard/MyEnrollClass";

import DynamicProfile from "../Pages/Dasboard/DynamicProfile";
import PendingTeachers from "../Pages/Admin/PendingTeachers";
import ActiveTeachers from "../Pages/Admin/ActiveTeachers";
import ActiveClass from "../Pages/Admin/ActiveClass";
import ClassDetails from "../Pages/Home/ClassDetails";
import Payment from "../Pages/Home/Payment";
import EditClass from "../Pages/Home/Edtclass";
import AllUsers from "../Pages/Admin/AllUsers";
import DashboardAllClasses from "../Pages/Admin/DashboardAllClasses";
import ManageAdmin from "../Pages/Dasboard/ManageAdmin";
import Forbidden from "../Pages/Forbidden/ForBidden";
import AdminRoute from "./AdminRoute";
import MyPayments from "../Pages/Dasboard/Studen Dashoard/MyPayments";
import SeeDetails from "../Pages/Dasboard/SeeDetails";
import CreateAssignment from "../Pages/Dasboard/TeacherAddclass/CreateAssignment";
import EnrollClassDetails from "../Pages/Dasboard/Studen Dashoard/EnrollClassDetails";
import About from "../Pages/Home/About";
import ContactUs from "../Pages/Home/ContactUs";







export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayots,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'allclass',
        Component: AllClass,
      },
      {
        path: 'about',
        Component: About,
      },

      {
        path: 'contact',
        Component: ContactUs,
      },

      {
        path: 'class/:id',
        Component: ClassDetails
      },

      {
        path: 'payment/:classId',


        element: <PrivteRoute>

          <Payment></Payment>
        </PrivteRoute>
      },


      {
        path: 'forbidden',
        Component: Forbidden
      },



      {
        path: 'teach',
        element:
          <PrivteRoute>
            <TeachOnEdu></TeachOnEdu>
          </PrivteRoute>,

      },




    ]
  },


  {
    path: '/',
    Component: AuthLayouts,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }

    ]
  },

  {
    path: '/dashboard',
    element: <PrivteRoute>
      <DashBoard></DashBoard>
    </PrivteRoute>,
    children: [
      {

        path: 'myclasses',
        Component: MyClass
      },

      {

        path: 'see-details/:id',
        Component: SeeDetails
      },
      {
        path: 'create-assignment/:id',
        Component: CreateAssignment

      },

      {
        path: 'users',
        Component: AllUsers,

      },
      {

        path: 'panding-classes',
        Component: PendingClasses
      },

      {
        path: 'active-classes',
        Component: ActiveClass
      },

      {

        path: 'teacher-request',
        element: <AdminRoute><TeacherRequest></TeacherRequest></AdminRoute>
      },
      {

        path: 'my-enroll-class',
        Component: MyEnrollClass
      },

      {
        path: 'class/:id',

        Component: EnrollClassDetails
      },



      {

        path: 'my-orders',
        Component: MyPayments
      },
      {
        path: 'my-profile',
        Component: DynamicProfile
      },
      {
        path: 'pending-teachers',
        element: <AdminRoute>
          <PendingTeachers></PendingTeachers>
        </AdminRoute>
      },

      {
        path: 'active-teachers',
        element: <AdminRoute>

          <ActiveTeachers></ActiveTeachers>
        </AdminRoute>

      },
      {
        path: 'edit-class/:id',
        Component: EditClass

      },

      {
        path: 'all-classes',
        Component: DashboardAllClasses

      },

      {
        path: 'manage-admin',


        element: <AdminRoute>
          <ManageAdmin></ManageAdmin>
        </AdminRoute>

      },
      {
        path: 'addclass',

        Component: AddClass

      },


    ]
  }



]);

