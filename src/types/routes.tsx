import { ArrowRightLeft, Box, CalendarCheck2, Cog, File, Files, Folder, Home, HomeIcon, Key, List, ListChecks, Mail, PlusSquare, Search, User, Users } from "lucide-react";


export const hr = [
    {name: 'Dashboard', path: '/hr/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'My Workload', path: '/hr/noaccess', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/hr/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/hr/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/hr/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    // {name: 'Project Invoice', path: '/hr/noaccess', icon: <File className="h-4 w-4" />, subpath: []},
    // {name: 'Finance', path: '/hr/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    // {name: 'Searches', path: '/hr/client', icon: <Search className="h-4 w-4" />, subpath: [
    //     {name: 'Clients', path: '/hr/noaccess', subpath: []},
    //     {name: 'Teams', path: '/hr/noaccess', subpath: []},
    // ]},

    // {name: 'Summaries', path: '/hr/summaries', icon: <File className="h-4 w-4" />, subpath: [
    //     {name: 'Projects', path: '/hr/summaries', subpath: [
    //         {name: 'Job Master', path: '/hr/noaccess',subpath: []},
    //         {name: 'Due Dates', path: '/hr/noaccess',subpath: []},
    //     ]},
    //     {name: 'Requests', path: '/hr/summaries', subpath: [
    //         {name: 'Individual Requests', path: '/hr/noaccess'},
    //         {name: 'Leave List', path: '/hr/noaccess',subpath: []},
    //         {name: 'WFH List', path: '/hr/noaccess',subpath: []},
    //         {name: 'WD List', path: '/hr/noaccess',subpath: []},
    //     ]},
    //     {name: 'Finance WIP List', path: '/hr/summaries', subpath: [
    // {name: 'Invoice Requests', path: '/hr/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    //         {name: 'Per Team', path: '/hr/noaccess',subpath: []},
    //         {name: 'Per Client', path: '/hr/noaccess',subpath: []},
    //     ]}
    // ]},


    // {name: 'Administration', path: '/hr/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
    //     {name: 'Employee', path: '/hr/noaccess', subpath: []},
    //     {name: 'Project Manager', path: '/hr/noaccess', subpath: []},
    //     {name: 'Human Resource', path: '/hr/noaccess', subpath: []},
    //     {name: 'Finance', path: '/hr/noaccess', subpath: []},
    // ]},

    {name: 'Events', path: '/hr/events', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    {name: 'Wellness day', path: '/hr/wellnessday', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/hr/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Messages', path: '/hr/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/hr/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    // {name: 'Archived', path: '/hr/archived', icon: <Folder className="h-4 w-4" />, subpath: [
    //     {name: 'Scheduling', path: '/hr/archived/scheduling', subpath: []},
    // ]},

]


export const pm = [
    {name: 'Dashboard', path: '/pm/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'My Workload', path: '/pm/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/pm/team', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/pm/projects', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/pm/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    // {name: 'Project Invoice', path: '/pm/noaccess', icon: <File className="h-4 w-4" />, subpath: []},
    {name: 'Finance', path: '/pm/invoiceprojection/list', icon: <Files className="h-4 w-4" />, subpath: []},
    // {name: 'Searches', path: '/pm/client', icon: <Search className="h-4 w-4" />, subpath: [
    //     {name: 'Clients', path: '/pm/noaccess', subpath: []},
    //     {name: 'Teams', path: '/pm/noaccess', subpath: []},
    // ]},

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
            //  {name: 'Invoice Requests', path: '/pm/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
             {name: 'Per Team', path: '/pm/summaries/team',subpath: []},
             {name: 'Per Client', path: '/pm/summaries/client',subpath: []},
         ]}
    ]},


    // {name: 'Administration', path: '/pm/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
    //     {name: 'Employee', path: '/pm/noaccess', subpath: []},
    //     {name: 'Project Manager', path: '/pm/noaccess', subpath: []},
    //     {name: 'Human Resource', path: '/pm/noaccess', subpath: []},
    //     {name: 'Finance', path: '/pm/noaccess', subpath: []},
    // ]},

    // {name: 'Events', path: '/pm/noaccess', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    // {name: 'Wellness day', path: '/pm/noaccess', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Your Request', path: '/pm/request', icon: <ArrowRightLeft className="h-4 w-4" />, subpath: []},
    {name: 'Messages', path: '/pm/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/pm/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    // {name: 'Archived', path: '/pm/archived', icon: <Folder className="h-4 w-4" />, subpath: [
    //     {name: 'Scheduling', path: '/pm/archived/scheduling', subpath: []},
    // ]},

]


export const employee = [
    // {name: 'Dashboard', path: '/employee/noaccess', icon: <Home className="h-4 w-4" />, subpath: []},
    {name: 'My Workload', path: '/employee/yourworkload', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/employee/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/employee/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/employee/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    // {name: 'Finance', path: '/employee/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    // {name: 'Searches', path: '/employee/client', icon: <Search className="h-4 w-4" />, subpath: [
    //     {name: 'Clients', path: '/employee/noaccess', subpath: []},
    //     {name: 'Teams', path: '/employee/noaccess', subpath: []},
    // ]},

    // {name: 'Summaries', path: '/employee/summaries', icon: <File className="h-4 w-4" />, subpath: [
    //     {name: 'Projects', path: '/employee/summaries', subpath: [
    //         {name: 'Job Master', path: '/employee/noaccess',subpath: []},
    //         {name: 'Due Dates', path: '/employee/noaccess',subpath: []},
    //     ]},
    //     {name: 'Requests', path: '/employee/summaries', subpath: [
    //         {name: 'Individual Requests', path: '/hr/noaccess'},
    //         {name: 'Leave List', path: '/employee/noaccess',subpath: []},
    //         {name: 'WFH List', path: '/employee/noaccess',subpath: []},
    //         {name: 'WD List', path: '/employee/noaccess',subpath: []},
    //     ]},
    //     {name: 'Finance WIP List', path: '/employee/summaries', subpath: [
    // {name: 'Invoice Requests', path: '/employee/noaccess', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    //         {name: 'Per Team', path: '/employee/noaccess',subpath: []},
    //         {name: 'Per Client', path: '/employee/noaccess',subpath: []},
    //     ]}
    // ]},


    // {name: 'Administration', path: '/employee/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
    //     {name: 'Employee', path: '/employee/noaccess', subpath: []},
    //     {name: 'Project Manager', path: '/employee/noaccess', subpath: []},
    //     {name: 'Human Resource', path: '/employee/noaccess', subpath: []},
    //     {name: 'Finance', path: '/employee/noaccess', subpath: []},
    // ]},

    // {name: 'Events', path: '/employee/noaccess', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    // {name: 'Wellness day', path: '/employee/noaccess', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Your Request', path: '/employee/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Messages', path: '/employee/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/employee/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    // {name: 'Archived', path: '/employee/archived', icon: <Folder className="h-4 w-4" />, subpath: [
    //     {name: 'Scheduling', path: '/employee/archived/scheduling', subpath: []},
    // ]},

]


export const finance = [
    {name: 'Dashboard', path: '/finance/dashboard', icon: <Home className="h-4 w-4" />, subpath: []},
    // {name: 'My Workload', path: '/finance/noaccess', icon: <List className="h-4 w-4" />, subpath: []},
    // {name: 'Team', path: '/finance/noaccess', icon: <Users className="h-4 w-4" />, subpath: []},
    // {name: 'Projects', path: '/finance/noaccess', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Scheduling', path: '/finance/scheduling', icon: <Box className="h-4 w-4" />, subpath: []},
    {name: 'Project Invoice', path: '/finance/projectinvoice/list', icon: <File className="h-4 w-4" />, subpath: []},
    // {name: 'Invoice Requests', path: '/finance/invoice', icon: <ListChecks className="h-4 w-4" />, subpath: []},
    // {name: 'Finance', path: '/finance/noaccess', icon: <Files className="h-4 w-4" />, subpath: []},
    // {name: 'Searches', path: '/finance/client', icon: <Search className="h-4 w-4" />, subpath: [
    //     {name: 'Clients', path: '/finance/noaccess', subpath: []},
    //     {name: 'Teams', path: '/finance/noaccess', subpath: []},
    // ]},

    {name: 'Summaries', path: '/finance/summaries', icon: <File className="h-4 w-4" />, subpath: [
        // {name: 'Projects', path: '/finance/summaries', subpath: [
        //     {name: 'Job Master', path: '/finance/noaccess',subpath: []},
        //     {name: 'Due Dates', path: '/finance/noaccess',subpath: []},
        // ]},
        // {name: 'Requests', path: '/finance/summaries', subpath: [
        //     {name: 'Individual Requests', path: '/finance/noaccess'},
        //     {name: 'Leave List', path: '/finance/noaccess',subpath: []},
        //     {name: 'WFH List', path: '/finance/noaccess',subpath: []},
        //     {name: 'WD List', path: '/finance/noaccess',subpath: []},
        // ]},
        {name: 'Finance WIP List', path: '/finance/summaries', subpath: [
            {name: 'Invoice Requests', path: '/finance/invoice', subpath: []},
            {name: 'Per Team', path: '/finance/summaries/team',subpath: []},
            {name: 'Per Client', path: '/finance/summaries/client',subpath: []},

        ]}
    ]},


    // {name: 'Administration', path: '/finance/noaccess', icon: <Users className="h-4 w-4" />, subpath: [
    //     {name: 'Employee', path: '/finance/noaccess', subpath: []},
    //     {name: 'Project Manager', path: '/finance/noaccess', subpath: []},
    //     {name: 'Human Resource', path: '/finance/noaccess', subpath: []},

    // ]},

    // {name: 'Events', path: '/finance/noaccess', icon: <CalendarCheck2 className="h-4 w-4" />, subpath: []},
    // {name: 'Wellness day', path: '/finance/noaccess', icon: <PlusSquare className="h-4 w-4" />, subpath: []},
    {name: 'Request', path: '/finance/request', icon: <ArrowRightLeft className="h-4 w-4" />,subpath: []},
    {name: 'Messages', path: '/finance/messages', icon: <Mail className="h-4 w-4" />, subpath: []},
    {name: 'Settings', path: '/finance/settings', icon: <Cog className="h-4 w-4"  />, subpath: []},
    // {name: 'Archived', path: '/finance/archived', icon: <Folder className="h-4 w-4" />, subpath: [
    //     {name: 'Scheduling', path: '/finance/archived/scheduling', subpath: []},
    // ]},

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
            {name: 'Job Master', path: '/superadmin/summaries/jobmaster',subpath: []},
            {name: 'Due Dates', path: '/superadmin/summaries/duedates',subpath: []},
        ]},
        {name: 'Requests', path: '/superadmin/summaries', subpath: [
            {name: 'Individual Requests', path: '/superadmin/summaries/individualrequest'},
            {name: 'Leave List', path: '/superadmin/summaries/leave',subpath: []},
            {name: 'WFH List', path: '/superadmin/summaries/wfh',subpath: []},
            {name: 'WD List', path: '/superadmin/summaries/wellnessday',subpath: []},
        ]},
        {name: 'Finance WIP List', path: '/finance/summaries', subpath: [
            {name: 'Invoice Requests', path: '/superadmin/invoice', subpath: []},
            {name: 'Per Team', path: '/superadmin/summaries/team',subpath: []},
            {name: 'Per Client', path: '/superadmin/summaries/client',subpath: []},

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
