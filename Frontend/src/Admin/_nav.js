import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Admin',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
       {
      component:CNavItem,
      name:'Admin',
      to:'/Admin'
    },
    {
      component:CNavItem,
      name:'View Admin',
      to:'/viewadmin'
    },

    ]},
  

 
  {
    component: CNavGroup,
    name: 'View',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [

    
      {
        component: CNavItem,
        name: 'viewuser',
        to: '/viewuser',
      },
      {
        component: CNavItem,
        name: 'viewfaculty',
        to: '/viewfaculty',
      },
      {
        component: CNavItem,
        name: 'viewStudents',
        to: '/viewstudents',
      },
      {
        component: CNavItem,
        name: 'addsubjects',
        to: '/addsubjects',
      },
      {
        component: CNavItem,
        name: 'viewsubjects',
        to: '/viewsubjects',
      },
      ],
  },
  {
    component: CNavGroup,
    name: 'courses',
    to: '/courses',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'addcourses',
        to: '/courses/addcourses',
      },
      {
        component: CNavItem,
        name: 'viewcourses',
        to: '/courses/viewcourse',
      },
      
      
    ],
  },
  
  
  
  
]

export default _nav
