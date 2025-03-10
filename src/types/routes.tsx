import { ArrowRightLeft, Box, CalendarCheck2, Cog, File, Files, Folder, Home, HomeIcon, Key, List, ListChecks, Mail, PlusSquare, Search, User, Users } from "lucide-react";


export const hr = [
    {name: 'Dashboard', path: '/hr/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'Scheduling', path: '/hr/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Events', path: '/hr/events', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/hr/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/hr/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'My Messages', path: '/hr/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/hr/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},

]


export const pm = [
    {name: 'Dashboard', path: '/pm/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'My Workload', path: '/pm/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/pm/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/pm/invoiceprojection/list', icon: <Files className="h-4 w-4" />, subpath: []},
    {name: 'Summaries', path: '/pm/summaries', icon: <File className="h-4 w-4" />, subpath: [
        {name: 'Projects', path: '/pm/summaries', subpath: [
            {name: 'Master Job List', path: '/pm/summaries/jobmaster',subpath: []},
            {name: 'Master Leave List', path: '/pm/summaries/individualrequest'},

            // {name: 'Due Dates', path: '/pm/summaries/duedates',subpath: []},
            // {name: 'Master Leave List', path: '/pm/summaries/individualrequest',subpath: []},
        ]},
        // {name: 'Requests', path: '/pm/summaries', subpath: [
        //     {name: 'Master Leave List', path: '/pm/summaries/individualrequest'},
        //     {name: 'Leave List', path: '/pm/summaries/leave',subpath: []},
        //     {name: 'WFH List', path: '/pm/summaries/wfh',subpath: []},
        //     {name: 'WD List', path: '/pm/summaries/wellnessday',subpath: []},
        // ]},
        //  {name: 'Finance WIP List', path: '/pm/noaccess', subpath: [
        //     //  {name: 'Per Team', path: '/pm/summaries/team',subpath: []},
        //      {name: 'Per Client', path: '/pm/summaries/client',subpath: []},
        //  ]}
    ]},

    {name: 'Approvals', path: '/pm/approvals', icon: <Files className="h-4 w-4" />, subpath: [
        {name: 'Leave Requests', path: '/pm/summaries/leave',subpath: []},
        {name: 'WFH Requests', path: '/pm/summaries/wfh',subpath: []},
        {name: 'WD Requests', path: '/pm/summaries/wellnessday',subpath: []},
        // {name: 'Invoice Requests', path: '/pm/summaries/leave',subpath: []},
    ]},
    {name: 'My Requests', path: '/pm/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: []},
    {name: 'My Messages', path: '/pm/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/pm/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},

]


export const employee = [
    {name: 'My Workload', path: '/employee/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Scheduling', path: '/employee/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'My Requests', path: '/employee/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'My Messages', path: '/employee/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/employee/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
]


export const finance = [
    {name: 'Dashboard', path: '/finance/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/finance/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/finance/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Approvals', path: '/pm/approvals', icon: <Files className="h-4 w-4" />, subpath: [
        // {name: 'Leave Requests', path: '/pm/summaries/leave',subpath: []},
        // {name: 'WFH Requests', path: '/pm/summaries/wfh',subpath: []},
        // {name: 'WD Requests', path: '/pm/summaries/wellnessday',subpath: []},
        {name: 'Invoice Requests', path: '/finance/invoice',subpath: []},
    ]},
    // {name: 'Summaries', path: '/finance/summaries', icon: <File className="h-4 w-4" />, subpath: [
    //     {name: 'Finance WIP List', path: '/finance/summaries', subpath: [
    //         {name: 'Invoice Requests', path: '/finance/invoice', subpath: []},
    //         {name: 'Per Team', path: '/finance/summaries/team',subpath: []},
    //         {name: 'Per Client', path: '/finance/summaries/client',subpath: []},

    //     ]}
    // ]},
    {name: 'My Request', path: '/finance/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'My Messages', path: '/finance/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/finance/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},

]


export const superadmin = [
    {name: 'Dashboard', path: '/superadmin/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'My Workload', path: '/superadmin/noaccess', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/superadmin/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/superadmin/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/superadmin/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/superadmin/invoiceprojection/list', icon: <Files className="h-4 w-4" />, subpath: []},

    // {name: 'Invoice Request', path: '/superadmin/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    // {name: 'Finance', path: '/superadmin/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
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
            {name: 'Master Job List', path: '/superadmin/summaries/jobmaster',subpath: []},
            {name: 'Master Leave List', path: '/superadmin/summaries/individualrequest'},

            // {name: 'Due Dates', path: '/superadmin/summaries/duedates',subpath: []},
        ]},
        // {name: 'Requests', path: '/superadmin/summaries', subpath: [
        //     {name: 'Individual Requests', path: '/superadmin/summaries/individualrequest'},
        //     {name: 'Leave List', path: '/superadmin/summaries/leave',subpath: []},
        //     {name: 'WFH List', path: '/superadmin/summaries/wfh',subpath: []},
        //     {name: 'WD List', path: '/superadmin/summaries/wellnessday',subpath: []},
        // ]},
        // {name: 'Finance WIP List', path: '/finance/summaries', subpath: [
        //     {name: 'Invoice Requests', path: '/superadmin/invoice', subpath: []},
        //     {name: 'Per Team', path: '/superadmin/summaries/team',subpath: []},
        //     {name: 'Per Client', path: '/superadmin/summaries/client',subpath: []},

        // ]}
    ]},
    {name: 'Approvals', path: '/pm/approvals', icon: <Files className="h-4 w-4" />, subpath: [
        {name: 'Leave Requests', path: '/superadmin/summaries/leave',subpath: []},
        {name: 'WFH Requests', path: '/superadmin/summaries/wfh',subpath: []},
        {name: 'WD Requests', path: '/superadmin/summaries/wellnessday',subpath: []},
        {name: 'Invoice Requests', path: '/superadmin/invoice',subpath: []},
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
    {name: 'My Messages', path: '/superadmin/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/superadmin/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    {name: 'Archived', path: '/superadmin/archived', icon: <Folder className="h-4 w-4" />, subpath: [
        {name: 'Scheduling', path: '/superadmin/archived/scheduling', subpath: []},
    ]},

]
