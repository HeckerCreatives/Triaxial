
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
    
}

export type Wellnessday = {
    createdAt: string
    requestdate:string 
    firstdayofwellnessdaycycle: string
    requestid: string
}

export type Wfhemployee = {
    requestid: string
    requestdate: string
    requestend:string
    wellnessdaycycle: boolean
    totalhourswfh: number
    createdAt: string
    status: string
  
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
    status:[], 
    _id: string
}

type Request = {
    enddate: string
startdate: string
}

type Leavedates = {
    leaveend: string
leavestart: string
}


export  type Members = {
    dates: Dates[]
employee: {employeeid: string,fullname: string}
eventDates: Request[]
leaveDates: Leavedates[]
notes: string
role: string
wellnessDates: string[]
_id: string
 }

 type Project = {
    name: string
projectid: string
 }

export type Graph = {
    allDates: []
clientname: 
{clientid: string, name: string}
componentid: string
jobcomponent: string
jobmanager: {employeeid: string, fullname: string, isManager: boolean, isJobManager: boolean}
jobno: string
members: Members[]
projectname: Project
teamname:string
_id:string
}
