
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
