export type Login = {
    username: string
    password: string
}

export interface JobComponent {
    name: string
    description: string
}

export interface Project {
    jobno: number
    name: string
    client: string
    manager: string
    budget: number
    jobcomponent: JobComponent
    note: string
}

interface Members{
    name: string
}

export interface Team {
    name: string
    members: Members[]
}

export interface ManageUser {
    fname: string
    mname: string
    lname: string
    email: string
    password: string
}

export interface Mail {
    subject: string
    content: string
}

export interface Event {
    name: string
    start: string
    end: string
}

// export interface Invoice {
//     name: string
//     address: string
//     email: string
//     description: string
//     amount: number
// }

export interface Request {
    type: string
    start: string
    end: string
}

export interface Invoice {
    open: boolean
    openChange: () => void;
    date: string
    invoiceNumber: string
    name: string
    address: string
    email: string
    description: string
    amount: number
    
}

// requests
interface WD {
    name: string
    start: Date
    end: Date
    totalwd: number
    totalwh: number
}

interface Leave {
    name: string
    type: string
    details: string
    start: Date
    end: Date
}

interface Leave {
    name: string
    type: string
    details: string
    start: Date
    end: Date
}