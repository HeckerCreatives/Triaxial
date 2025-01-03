import { ArrowRightLeft, Box, CalendarCheck2, Cog, File, Files, Folder, Home, HomeIcon, Key, List, ListChecks, Mail, PlusSquare, Search, User, Users } from "lucide-react";

export const hrold = [
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

export const hr = [
    {name: 'Dashboard', path: '/hr/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'Your Workload', path: '/hr/noaccess', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/hr/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/hr/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/hr/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/hr/noaccess', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Invoice Requests', path: '/hr/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/hr/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/hr/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/hr/noaccess', subpath: []},
        {name: 'Teams', path: '/hr/noaccess', subpath: []},
    ]},

    {name: 'Summaries', path: '/hr/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/hr/summaries', subpath: [
            {name: 'Job Master', path: '/hr/noaccess',subpath: []},
            {name: 'Due Dates', path: '/hr/noaccess',subpath: []},
        ]},
        {name: 'Requests', path: '/hr/summaries', subpath: [
            {name: 'Individual Requests', path: '/hr/noaccess'},
            {name: 'Leave List', path: '/hr/noaccess',subpath: []},
            {name: 'WFH List', path: '/hr/noaccess',subpath: []},
            {name: 'WD List', path: '/hr/noaccess',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/hr/summaries', subpath: [
            {name: 'Per Team', path: '/hr/noaccess',subpath: []},
            {name: 'Per Client', path: '/hr/noaccess',subpath: []},
        ]}
    ]},


    {name: 'Administration', path: '/hr/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/hr/noaccess', subpath: []},
        {name: 'Project Manager', path: '/hr/noaccess', subpath: []},
        {name: 'Human Resource', path: '/hr/noaccess', subpath: []},
        {name: 'Finance', path: '/hr/noaccess', subpath: []},
    ]},

    {name: 'Events', path: '/hr/events', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/hr/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/hr/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Messages', path: '/hr/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/hr/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    {name: 'Archived', path: '/hr/archived', icon: <Folder className="h-4 w-4" />, subpath: [
        {name: 'Scheduling', path: '/hr/archived/scheduling', subpath: []},
    ]},

]


export const pmold = [
    {name: 'Dashboard', path: '/pm/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: ' Your Workload', path: '/pm/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    {name: 'Team', path: '/pm/team', icon: <Users className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/pm/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
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

    {name: 'Summaries', path: '/superadmin/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/superadmin/noaccess', subpath: [
            {name: 'Job Master', path: '/superadmin/noacces',subpath: []},
            {name: 'Due Dates', path: '/superadmin/noaccess',subpath: []},
        ]},
        {name: 'Requests', path: '/superadmin/summaries', subpath: [
            {name: 'Individual Requests', path: '/pm/summaries/individualrequest'},
            {name: 'Leave List', path: '/superadmin/summaries/leave',subpath: []},
            {name: 'WFH List', path: '/superadmin/summaries/wfh',subpath: []},
            {name: 'WD List', path: '/superadmin/summaries/wellnessday',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/superadmin/summaries', subpath: [
            {name: 'Per Team', path: '/superadmin/summaries/wipperteam',subpath: []},
            {name: 'Per Client', path: '/superadmin/summaries/wipperclient',subpath: []},
        ]}
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

export const pm = [
    {name: 'Dashboard', path: '/pm/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'Your Workload', path: '/pm/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/pm/team', icon: <Users className="h-4 w-4" />, subpath: []},
    {name: 'Projects', path: '/pm/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/pm/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/pm/noaccess', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Invoice Requests', path: '/pm/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/pm/invoiceprojection/list', icon: <Files className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/pm/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/pm/noaccess', subpath: []},
        {name: 'Teams', path: '/pm/noaccess', subpath: []},
    ]},

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
        {name: 'Finance WIP List', path: '/pm/noaccess', subpath: [
            {name: 'Per Team', path: '/pm/noaccess',subpath: []},
            {name: 'Per Client', path: '/pm/noaccess',subpath: []},
        ]}
    ]},


    {name: 'Administration', path: '/pm/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/pm/noaccess', subpath: []},
        {name: 'Project Manager', path: '/pm/noaccess', subpath: []},
        {name: 'Human Resource', path: '/pm/noaccess', subpath: []},
        {name: 'Finance', path: '/pm/noaccess', subpath: []},
    ]},

    {name: 'Events', path: '/pm/noaccess', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/pm/noaccess', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Your Request', path: '/pm/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: []},
    {name: 'Messages', path: '/pm/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/pm/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    {name: 'Archived', path: '/pm/archived', icon: <Folder className="h-4 w-4" />, subpath: [
        {name: 'Scheduling', path: '/pm/archived/scheduling', subpath: []},
    ]},

]


export const employeeold = [
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

export const employee = [
    {name: 'Dashboard', path: '/employee/noaccess', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'Your Workload', path: '/employee/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/employee/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/employee/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/employee/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/employee/noaccess', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Invoice Requests', path: '/employee/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/employee/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/employee/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/employee/noaccess', subpath: []},
        {name: 'Teams', path: '/employee/noaccess', subpath: []},
    ]},

    {name: 'Summaries', path: '/employee/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/employee/summaries', subpath: [
            {name: 'Job Master', path: '/employee/noaccess',subpath: []},
            {name: 'Due Dates', path: '/employee/noaccess',subpath: []},
        ]},
        {name: 'Requests', path: '/employee/summaries', subpath: [
            {name: 'Individual Requests', path: '/hr/noaccess'},
            {name: 'Leave List', path: '/employee/noaccess',subpath: []},
            {name: 'WFH List', path: '/employee/noaccess',subpath: []},
            {name: 'WD List', path: '/employee/noaccess',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/employee/summaries', subpath: [
            {name: 'Per Team', path: '/employee/noaccess',subpath: []},
            {name: 'Per Client', path: '/employee/noaccess',subpath: []},
        ]}
    ]},


    {name: 'Administration', path: '/employee/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/employee/noaccess', subpath: []},
        {name: 'Project Manager', path: '/employee/noaccess', subpath: []},
        {name: 'Human Resource', path: '/employee/noaccess', subpath: []},
        {name: 'Finance', path: '/employee/noaccess', subpath: []},
    ]},

    {name: 'Events', path: '/employee/noaccess', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/employee/noaccess', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Your Request', path: '/employee/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Messages', path: '/employee/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/employee/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    {name: 'Archived', path: '/employee/archived', icon: <Folder className="h-4 w-4" />, subpath: [
        {name: 'Scheduling', path: '/employee/archived/scheduling', subpath: []},
    ]},

]

export const financeold = [
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

export const finance = [
    {name: 'Dashboard', path: '/finance/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'Your Workload', path: '/finance/noaccess', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/finance/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/finance/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/finance/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/finance/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    // {name: 'Invoice Requests', path: '/finance/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/finance/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    {name: 'Searches', path: '/finance/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/finance/noaccess', subpath: []},
        {name: 'Teams', path: '/finance/noaccess', subpath: []},
    ]},

    {name: 'Summaries', path: '/finance/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/finance/summaries', subpath: [
            {name: 'Job Master', path: '/finance/noaccess',subpath: []},
            {name: 'Due Dates', path: '/finance/noaccess',subpath: []},
        ]},
        {name: 'Requests', path: '/finance/summaries', subpath: [
            {name: 'Individual Requests', path: '/finance/noaccess'},
            {name: 'Leave List', path: '/finance/noaccess',subpath: []},
            {name: 'WFH List', path: '/finance/noaccess',subpath: []},
            {name: 'WD List', path: '/finance/noaccess',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/finance/summaries', subpath: [
            {name: 'Per Team', path: '/finance/summaries/team',subpath: []},
            {name: 'Per Client', path: '/finance/summaries/client',subpath: []},
            {name: 'Invoice Requests', path: '/finance/invoice', subpath: []},

        ]}
    ]},


    {name: 'Administration', path: '/finance/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/finance/noaccess', subpath: []},
        {name: 'Project Manager', path: '/finance/noaccess', subpath: []},
        {name: 'Human Resource', path: '/finance/noaccess', subpath: []},

    ]},

    {name: 'Events', path: '/finance/noaccess', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/finance/noaccess', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/finance/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Messages', path: '/finance/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/finance/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    {name: 'Archived', path: '/finance/archived', icon: <Folder className="h-4 w-4" />, subpath: [
        {name: 'Scheduling', path: '/finance/archived/scheduling', subpath: []},
    ]},

]


export const superadmin = [
    {name: 'Dashboard', path: '/superadmin/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'Your Workload', path: '/superadmin/noaccess', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/superadmin/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/superadmin/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/superadmin/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/superadmin/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    // {name: 'Invoice Request', path: '/superadmin/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Invoice Requests', path: '/superadmin/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/superadmin/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    // {name: 'Total Invoice', path: '/superadmin/totalinvoice', icon: <File className="h-4 w-4" />, subpath: [
    //     {name: 'Per Team', path: '/superadmin/totalinvoice/team', subpath: []},
    //     {name: 'Per Client', path: '/superadmin/totalinvoice/client', subpath: []}
    // ]},
    {name: 'Searches', path: '/superadmin/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/superadmin/client', subpath: []},
        {name: 'Teams', path: '/superadmin/teams', subpath: []},
    ]},

    {name: 'Summaries', path: '/superadmin/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/superadmin/noaccess', subpath: [
            {name: 'Job Master', path: '/superadmin/noaccess',subpath: []},
            {name: 'Due Dates', path: '/superadmin/noaccess',subpath: []},
        ]},
        {name: 'Requests', path: '/superadmin/summaries', subpath: [
            {name: 'Individual Requests', path: '/superadmin/summaries/individualrequest'},
            {name: 'Leave List', path: '/superadmin/summaries/leave',subpath: []},
            {name: 'WFH List', path: '/superadmin/summaries/wfh',subpath: []},
            {name: 'WD List', path: '/superadmin/summaries/wellnessday',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/superadmin/noaccess', subpath: [
            {name: 'Per Team', path: '/superadmin/noaccess',subpath: []},
            {name: 'Per Client', path: '/superadmin/noaccess',subpath: []},
        ]}
    ]},
    // {name: 'Employee Requests', path: '/superadmin/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
    //     {name: 'Wellness Day', path: '/superadmin/request/wellnessday', subpath: []},
    //     {name: 'Leaves', path: '/superadmin/request/leave', subpath: []},
    //     {name: 'Work from home', path: '/superadmin/request/wfh', subpath: []},
    // ]},

    {name: 'Administration', path: '/superadmin/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/superadmin/manageuser/employee', subpath: []},
        {name: 'Project Manager', path: '/superadmin/manageuser/pm', subpath: []},
        {name: 'Human Resource', path: '/superadmin/manageuser/hr', subpath: []},
        {name: 'Finance', path: '/superadmin/manageuser/finance', subpath: []},
    ]},

    {name: 'Events', path: '/superadmin/events', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/superadmin/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    // {name: 'My Request', path: '/superadmin/myrequest', icon: <User className="h-4 w-4" />, subpath: []},
    {name: 'Messages', path: '/superadmin/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/superadmin/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    {name: 'Archived', path: '/superadmin/archived', icon: <Folder className="h-4 w-4" />, subpath: [
        {name: 'Scheduling', path: '/superadmin/archived/scheduling', subpath: []},
    ]},

]

export const ifManager = [
    {name: 'Dashboard', path: '/dashboard/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'Your Workload', path: '/superadmin/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
   
    {name: 'Scheduling', path: '/dashboard/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/dashboard/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Invoice', path: '/dashboard/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    {name: 'Total Invoice', path: '/dashboard/totalinvoice', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Per Team', path: '/dashboard/totalinvoice/team'},
        {name: 'Per Client', path: '/dashboard/totalinvoice/client'}
    ]},
    {name: 'Searches', path: '/dashboard/client', icon: <Search className="h-4 w-4" />, subpath: [
        {name: 'Clients', path: '/dashboard/client'},
        {name: 'Teams', path: '/dashboard/teams'},
    ]},
    {name: 'Employee Requests', path: '/dashboard/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: [
        {name: 'Wellness Day', path: '/dashboard/request/wellnessday'},
        {name: 'Leaves', path: '/dashboard/request/leave'},
        {name: 'Work from home', path: '/dashboard/request/wfh'},
    ]},

    {name: 'Administration', path: '/dashboard/manageuser', icon: <Users className="h-4 w-4" />, subpath: [
        {name: 'Employee', path: '/dashboard/manageuser/employee'},
        {name: 'Project Manager', path: '/dashboard/manageuser/pm'},
        {name: 'Human Resource', path: '/dashboard/manageuser/hr'},
        {name: 'Finance', path: '/dashboard/manageuser/finance'},
    ]},

    {name: 'Events', path: '/dashboard/events', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/dashboard/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    // {name: 'My Request', path: '/superadmin/myrequest', icon: <User className="h-4 w-4" />, subpath: []},
    {name: 'Messages', path: '/dashboard/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/dashboard/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},

]