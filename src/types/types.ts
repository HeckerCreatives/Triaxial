
//global
export type Events = {
    title: string
    start: string
    end:  string
    teams: Subdata[]
}
//global



// employee 

type Subdata = {
    teamname: string
   _id: string
   
}

export type Leave = {
    employeeid: string
    requestid: string
    type: number
    startdate: string
    enddate: string
    status: string
    totalworkingdays: number
    totalpublicholidays: number
    wellnessdaycycle: boolean
    workinghoursduringleave: number
    comments: string
    workinghoursonleave: number
    details: string
    requesttimestamp: string
    manager: string
    
}

export type Wellnessday = {
    createdAt: string
    requestdate:string 
    firstdayofwellnessdaycycle: string
    requestid: string
    manager: string
}

export type Wfhemployee = {
    requestid: string
    requestdate: string
    requestend:string
    wellnessdaycycle: boolean
    totalhourswfh: number
    createdAt: string
    status: string
    manager: string
  
}

//end employee 


//superadmin
 
export type Team = {
    teamname: string
    teamid: string
  }
//end superadmin


type Dates = {
    date: string
    hours: number, 
    status:string[], 
    _id: string
    leavewellnessday?: boolean,
    workinghoursduringleave?: number,
}

type Request = {
    enddate: string
startdate: string
}

type Leavedates = {
    leaveend: string
leavestart: string
}

type WFHDates = {
    requeststart: string
    requestend: string
}


export  type Members = {
    dates: Dates[]
employee: {_id: string,fullname: string, initials: string}
eventDates: Request[]
leaveDates: Leavedates[]
notes: string
role: string
wellnessDates: string[]
wfhDates: string []
_id: string
 }

 export  type MembersYourworkload = {
    dates: Dates[]
employee: {_id: string,fullname: string, initials: string}
eventDates: Request[]
leaveDates: Leavedates[]
notes: string
role: string
wellnessDates: string[]
wfhDates: string []
_id: string
 }

 type Project = {
    name: string
projectid: string
 }

export type Graph = {
    allDates: []
clientname: 
{clientid: string, name: string, priority: string}
componentid: string
jobcomponent: string
projectstart: string
projectend: string
jobmanager: {employeeid: string, fullname: string, isManager: boolean, isJobManager: boolean,initials: string}
jobno: string
members: Members[]
projectname: Project
teamname:string
_id:string
status: any
isVariation: boolean
budgettype: string
comments: string,
adminnotes: string,
estimatedbudget: number
invoice: {
    percentage: number,
    amount: number
    pendinginvoice: number,
    pendinginvoice1: number,
}
}

export  type MembersComponent = {
    dates: Dates[]
employee: {_id: string,fullname: string, initials: string}
eventDates: Request[]
leaveDates: Leavedates[]
notes: string
role: string
wellnessDates: string[]
wfhDates: string []
_id: string
 }

export type GraphComponent = {
    allDates: []
clientname: 
{clientid: string, name: string, priority: string}
componentid: string
jobcomponent: string
projectstart: string
projectend: string
jobmanager: {employeeid: string, fullname: string, isManager: boolean, isJobManager: boolean,initials: string}
jobno: string
members: MembersComponent[]
projectname: Project
teamname:string
_id:string
status: any
isVariation: boolean
budgettype: string
comments: string,
adminnotes: string,
estimatedbudget: number
invoice: {
    percentage: number,
    amount: number
    pendinginvoice: number,
    pendinginvoice1: number,
}
}


export type Workload = {
    _id: string
    jobmanager: {employeeid: string, fullname: string}
    componentid:  string
    clientname: string
    clientid: string
    clientpriority: string
    teamname:  string
    teamid: string
    projectname:  string
    jobcomponent: string
    teammembers: string[]
    members: Members[]
    jobno: string
}

type TeamManager = {
    employeeid: string
fullname: string
resources: string
role: string
}

type Memberteam = {
    employeeid: string
fullname: string
resources: string
role: string
}

type Teamleader = {
    employeeid: string
fullname: string
resources: string
role: string
}

export type TeamMembers = {
    manager: TeamManager
    members: Memberteam[]
    teamleader: Teamleader
}

export type financeInvoice = {
    currentinvoice: string
invoiceamount: string
invoiceid: string
jobcomponent: {name: string, jobmanager: string, budgettype: string, budget: number, jobno: string}
newinvoice: number
createdAt: string
status: string
client: {
    clientname: string,
    priority: string
}
comments: string
projectname: string
jobmanagercomments: string
adminnotes: string

}