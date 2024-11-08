import { ArrowRightLeft, Box, CalendarCheck2, Cog, Home, HomeIcon, Key, List, ListChecks, Mail, PlusSquare, Search, User, Users } from "lucide-react";

export const hr = [
    {name: 'Dashboard', path: '/hr/dashboard', icon: <Home className="h-4 w-4" />},
    {name: ' Your Workload', path: '/hr/yourworkload', icon: <List className="h-4 w-4" />},
    {name: 'Request', path: '/hr/request', icon: <ArrowRightLeft className="h-4 w-4" />},
    {name: 'Wellness Day', path: '/hr/wellnessday', icon: <PlusSquare className="h-4 w-4" />},
    {name: 'Events', path: '/hr/events', icon: <CalendarCheck2 className="h-4 w-4" />},
    {name: 'Messages', path: '/hr/messages', icon: <Mail className="h-4 w-4" />},
    {name: 'Settings', path: '/hr/settings', icon: <Cog className="h-4 w-4" />},

]

export const pm = [
    {name: 'Dashboard', path: '/pm/dashboard', icon: <Home className="h-4 w-4" />},
    {name: ' Your Workload', path: '/pm/yourworkload', icon: <List className="h-4 w-4" />},
    {name: 'Teams', path: '/pm/team', icon: <Users className="h-4 w-4" />, subpath: []},
    {name: 'Projects', path: '/pm/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/pm/request', icon: <ArrowRightLeft className="h-4 w-4" />},
    {name: 'Wellness Day', path: '/pm/wellnessday', icon: <PlusSquare className="h-4 w-4" />},
    {name: 'Leave', path: '/pm/leave', icon: <CalendarCheck2 className="h-4 w-4" />},
    {name: 'Work from home', path: '/pm/wfh', icon: <HomeIcon className="h-4 w-4" />},
    {name: 'Messages', path: '/pm/messages', icon: <Mail className="h-4 w-4" />},
    {name: 'Settings', path: '/pm/settings', icon: <Cog className="h-4 w-4" />},

]


export const employee = [
    {name: 'Dashboard', path: '/employee/dashboard', icon: <Home className="h-4 w-4" />},
    {name: ' Your Workload', path: '/employee/yourworkload', icon: <List className="h-4 w-4" />},
    {name: 'Projects', path: '/employee/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/employee/request', icon: <ArrowRightLeft className="h-4 w-4" />},
    {name: 'Messages', path: '/employee/messages', icon: <Mail className="h-4 w-4" />},
    {name: 'Settings', path: '/employee/settings', icon: <Cog className="h-4 w-4" />},
]

export const finance = [
    {name: 'Dashboard', path: '/finance/dashboard', icon: <Home className="h-4 w-4" />},
    {name: ' Your Workload', path: '/finance/yourworkload', icon: <List className="h-4 w-4" />},
    {name: 'Request', path: '/finance/request', icon: <ArrowRightLeft className="h-4 w-4" />},
    {name: 'Messages', path: '/finance/messages', icon: <Mail className="h-4 w-4" />},
    {name: 'Settings', path: '/finance/settings', icon: <Cog className="h-4 w-4" />},
]

export const superadmin = [
    {name: 'Dashboard', path: '/superadmin/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'Your Workload', path: '/superadmin/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
   
    {name: 'Projects', path: '/superadmin/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Invoice', path: '/superadmin/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/superadmin/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/superadmin/client'},
        {name: 'Teams', path: '/superadmin/teams'},
    ]},
    {name: 'Employee Requests', path: '/superadmin/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
        {name: 'Wellness Day', path: '/superadmin/request/wellnessday'},
        {name: 'Leaves', path: '/superadmin/request/leave'},
        {name: 'Work from home', path: '/superadmin/request/wfh'},
    ]},

    {name: 'Administration', path: '/superadmin/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/superadmin/manageuser/employee'},
        {name: 'Project Manager', path: '/superadmin/manageuser/pm'},
        {name: 'Human Resource', path: '/superadmin/manageuser/hr'},
        {name: 'Finance', path: '/superadmin/manageuser/finance'},
    ]},

    {name: 'Events', path: '/superadmin/events', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/superadmin/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    // {name: 'My Request', path: '/superadmin/myrequest', icon: <User className="h-4 w-4" />, subpath: []},
    {name: 'Messages', path: '/superadmin/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/superadmin/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},

]