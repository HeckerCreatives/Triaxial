import { ArrowRightLeft, Box, CalendarCheck2, Cog, File, Home, HomeIcon, Key, List, ListChecks, Mail, PlusSquare, Search, User, Users } from "lucide-react";

export const hr = [
    {name: 'Dashboard', path: '/hr/dashboard', icon: <Home className="h-4 w-4" />,subpath: []},
    // {name: ' Your Workload', path: '/hr/yourworkload', icon: <List className="h-4 w-4" />},
    {name: 'Request', path: '/hr/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Wellness Day', path: '/hr/wellnessday', icon: <PlusSquare className="h-4 w-4" />,subpath: []},
    {name: 'Events', path: '/hr/events', icon: <CalendarCheck2 className="h-4 w-4" />,subpath: []},

     //no access routes
     {name: 'Scheduling', path: '/hr/unauthorized/projects', icon: <Box className="h-4 w-4" />, subpath: []},
     {name: 'Invoice', path: '/hr/unauthorized/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
     {name: 'Searches', path: '/hr/unauthorized/noaccess', icon: <Search className="h-4 w-4" />, subpath: [
         {name: 'Clients', path: '/hr/unauthorized/client'},
         {name: 'Teams', path: '/hr/unauthorized/group'},
     ]},
     {name: 'Employee Requests', path: '/hr/unauthorized/list', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
         {name: 'Wellness Day', path: '/hr/unauthorized/list/wellnessday'},
         {name: 'Leaves', path: '/hr/unauthorized/list/leave'},
         {name: 'Work from home', path: '/hr/unauthorized/list/wfh'},
     ]},
 
     {name: 'Administration', path: '/hr/unauthorized/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
         {name: 'Employee', path: '/hr/unauthorized/manageuser/employee'},
         {name: 'Project Manager', path: '/hr/unauthorized/manageuser/pm'},
         {name: 'Human Resource', path: '/hr/unauthorized/manageuser/hr'},
         {name: 'Finance', path: '/hr/unauthorized/manageuser/finance'},
     ]},
     //end

     {name: 'Messages', path: '/hr/messages', icon: <Mail className="h-4 w-4" />,subpath: []},
    {name: 'Settings', path: '/hr/settings', icon: <Cog className="h-4 w-4" />,subpath: []},

]

export const pm = [
    {name: 'Dashboard', path: '/pm/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: ' Your Workload', path: '/pm/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    {name: 'Team', path: '/pm/team', icon: <Users className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/pm/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/pm/invoiceprojection/list', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Summaries', path: '/pm/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/pm/summaries', subpath: [
            {name: 'Job Master', path: '/pm/summaries/jobmaster',subpath: []},
            {name: 'Due Dates', path: '/pm/summaries/duedates',subpath: []},
        ]},
        {name: 'Requests', path: '/pm/summaries', subpath: [
            {name: 'Individual Requests', path: '/pm/summaries/individualrequest'},
            {name: 'Leave List', path: '/pm/summaries/leave',subpath: []},
            {name: 'WFH List', path: '/pm/summaries/wfh',subpath: []},
            {name: 'WD List', path: '/pm/summaries/wellnessday',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/pm/summaries', subpath: [
            {name: 'Per Team', path: '/pm/summaries/wipperteam',subpath: []},
            {name: 'Per Client', path: '/pm/summaries/wipperclient',subpath: []},
        ]}
    ]},


    {name: 'Request', path: '/pm/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: []},
    {name: 'Wellness Day', path: '/pm/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Leave', path: '/pm/leave', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Work from home', path: '/pm/wfh', icon: <HomeIcon className="h-4 w-4" />, subpath: []},
    
    //no access routes
    // {name: 'Invoice', path: '/pm/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/pm/noaccess', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/pm/client', subpath: []},
        {name: 'Teams', path: '/pm/group', subpath: []},
    ]},
    {name: 'Employee Requests', path: '/pm/list', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
        {name: 'Wellness Day', path: '/pm/list/wellnessday',subpath: []},
        {name: 'Leaves', path: '/pm/list/leave',subpath: []},
        {name: 'Work from home', path: '/pm/list/wfh',subpath: []},
    ]},

    {name: 'Administration', path: '/pm/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/pm/manageuser/employee',subpath: []},
        {name: 'Project Manager', path: '/pm/manageuser/pm',subpath: []},
        {name: 'Human Resource', path: '/pm/manageuser/hr',subpath: []},
        {name: 'Finance', path: '/pm/manageuser/finance',subpath: []},
    ]},

    {name: 'Events', path: '/pm/event', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},

    //end

    {name: 'Messages', path: '/pm/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/pm/settings', icon: <Cog className="h-4 w-4" />, subpath: []},

]


export const employee = [
    // {name: 'Dashboard', path: '/employee/dashboard', icon: <Home className="h-4 w-4" />},
    {name: ' Your Workload', path: '/employee/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/employee/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Invoice Projection', path: '/employee/invoiceprojection/list', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/employee/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: []},
   
    //no access routes
    {name: 'Invoice', path: '/employee/unauthorized/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/employee/unauthorized/noaccess', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/employee/unauthorized/client'},
        {name: 'Teams', path: '/employee/unauthorized/group'},
    ]},
    {name: 'Employee Requests', path: '/employee/unauthorized/list', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
        {name: 'Wellness Day', path: '/employee/unauthorized/list/wellnessday'},
        {name: 'Leaves', path: '/employee/unauthorized/list/leave'},
        {name: 'Work from home', path: '/employee/unauthorized/list/wfh'},
    ]},

    {name: 'Administration', path: '/employee/unauthorized/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/employee/unauthorized/manageuser/employee'},
        {name: 'Project Manager', path: '/employee/unauthorized/manageuser/pm'},
        {name: 'Human Resource', path: '/employee/unauthorized/manageuser/hr'},
        {name: 'Finance', path: '/employee/unauthorized/manageuser/finance'},
    ]},
    {name: 'Events', path: '/employee/unauthorized/event', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    //end


    {name: 'Messages', path: '/employee/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/employee/settings', icon: <Cog className="h-4 w-4" />, subpath: []},
]

export const finance = [
    {name: 'Dashboard', path: '/finance/dashboard', icon: <Home className="h-4 w-4" />,subpath: []},
    // {name: ' Your Workload', path: '/finance/yourworkload', icon: <List className="h-4 w-4" />},
    {name: 'Invoice Request', path: '/finance/invoice', icon: <File className="h-4 w-4" />,subpath: []},
    {name: 'Project Invoice', path: '/finance/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Total Invoice', path: '/finance/totalinvoice', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Per Team', path: '/finance/totalinvoice/team'},
        {name: 'Per Client', path: '/finance/totalinvoice/client'}
    ]},
    {name: 'Request', path: '/finance/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},

     //no access routes
     {name: 'Scheduling', path: '/finance/unauthorized/projects', icon: <Box className="h-4 w-4" />, subpath: []},
     {name: 'Invoice', path: '/finance/unauthorized/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
     {name: 'Searches', path: '/finance/unauthorized/noaccess', icon: <Search className="h-4 w-4" />, subpath: [
         {name: 'Clients', path: '/finance/unauthorized/client'},
         {name: 'Teams', path: '/finance/unauthorized/group'},
     ]},
     {name: 'Employee Requests', path: '/finance/unauthorized/list', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
         {name: 'Wellness Day', path: '/finance/unauthorized/list/wellnessday'},
         {name: 'Leaves', path: '/finance/unauthorized/list/leave'},
         {name: 'Work from home', path: '/finance/unauthorized/list/wfh'},
     ]},
 
     {name: 'Administration', path: '/finance/unauthorized/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
         {name: 'Employee', path: '/finance/unauthorized/manageuser/employee'},
         {name: 'Project Manager', path: '/finance/unauthorized/manageuser/pm'},
         {name: 'Human Resource', path: '/finance/unauthorized/manageuser/hr'},
         {name: 'Finance', path: '/finance/unauthorized/manageuser/finance'},
     ]},
     //end


    {name: 'Messages', path: '/finance/messages', icon: <Mail className="h-4 w-4" />,subpath: []},
    {name: 'Settings', path: '/finance/settings', icon: <Cog className="h-4 w-4" />,subpath: []},
]

export const superadmin = [
    {name: 'Dashboard', path: '/superadmin/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'Your Workload', path: '/superadmin/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
   
    {name: 'Scheduling', path: '/superadmin/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/superadmin/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Invoice', path: '/superadmin/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Total Invoice', path: '/superadmin/totalinvoice', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Per Team', path: '/superadmin/totalinvoice/team'},
        {name: 'Per Client', path: '/superadmin/totalinvoice/client'}
    ]},
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