// schemas/userSchema.ts
import { any, z } from "zod";

export const leaveSchema = z.object({
// name: z
//     .string()
//     .nonempty("Name is empty"),
 details: z
    .string(),
startdate: z
    .string()
    .nonempty("Start date is empty"),
enddate: z
    .string()
    .nonempty("End date is empty"),
type: z
    .string(),
totalhoursonleave: z
    .number(),
duringleave: z
    .number(),
workingdays: z
    .number(),
holidays: z
    .number(),
// wdcycle: z
//     .string(),
declaration: z.boolean().refine((val) => val === true, { message: "You must agree to the declaration" })

});

export const wdSchema = z.object({
// name: z
//     .string()
//     .nonempty("Name is empty"),
startdate: z
    .string()
    .nonempty("Start date is empty"),
// enddate: z
//     .string(),
// totalworkingdays: z
//     .string()
//     .transform((val) => parseFloat(val))
//     .refine((val) => !isNaN(val), { message: "Total working days must be a number" }),
// totalhoursduring: z
//     .string()
//     .transform((val) => parseFloat(val))
//     .refine((val) => !isNaN(val), { message: "Total hours must be a number" }),
 declaration: z.boolean().refine((val) => val === true, { message: "You must agree to the declaration" })
});

export const wfhSchema = z.object({
name: z
    .string()
    .nonempty("Name is empty"),
dateofbirth: z
    .string()
    .nonempty("Date of birth is empty"),
wdcycle: z
    .string(),
totalhourswfh: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Total hours WFH must be a number" }),
hoursofleave: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: "Hours of leave must be a number" }),
reason: z
    .string()
    .nonempty('Please provide a reason'),
 declaration: z.boolean().refine((val) => val === true, { message: "You must agree to the declaration" })

});

export const createProjectSchema = z.object ({
    team: z.string().nonempty("Name is empty"),
    jobno: z.string().nonempty("Job no is empty"),
    projectname: z.string().nonempty("Project name is empty"),
    client: z.string().nonempty("Client is empty"),
    others: z.string(),
    jobmanager: z.string().nonempty("Please select a job manager"),
    estbudget: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val), { message: "Please enter an estimated budget, must be a number" }),
    adminnotes: z.string(),
    jobcomponent: z.string().nonempty('Job component is empty')
})

export const projectVariationSchema = z.object ({
    team: z.string().nonempty("Name is empty"),
    jobno: z.string().nonempty("Job no is empty"),
    projectname: z.string().nonempty("Project name is empty"),
    client: z.string().nonempty("Client is empty"),
    others: z.string(),
    jobmanager: z.string().nonempty("Please select a job manager"),
    estbudget: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val), { message: "Please enter an estimated budget, must be a number" }),
    adminnotes: z.string(),
    // jobcomponent: z.string().nonempty('Job component is empty'),
    variationno: z.string().nonempty("Variation no is empty"),
    variationname: z.string().nonempty("Variation name is empty"),
    description: z.string().nonempty("Description is empty"),
})

export const login = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(5, "Password must be at least 5 characters")
        .max(15, "Password must be at most 15 characters")
        .regex(/^[a-zA-Z0-9]*$/, "Password must not contain special characters")
});


export const createEmployee = z.object ({
    firstname: z.string().nonempty('Please enter a firstname'),
    lasttname: z.string().nonempty('Please enter a lastname'),
    initial: z.string().nonempty('Please enter a initial'),
    contactno: z.string().nonempty('Please enter a contact no.'),
    team: z.string().nonempty('Please enter a contact no.'),
    reportingto: z.string().nonempty('Please enter a contact no.'),
    email: z.string().email("Invalid email address"),
    position: z.string().nonempty("Please enter a position"),
    img: any(),
    password: z.string().nonempty('Please enter a password')
})

export const createTeam = z.object({
    teamname: z.string().nonempty('Please enter a team name'),
    directorpartner: z.string().nonempty('Please enter a director partner'),
    associate: z.string().nonempty('Please enter a associate'),
    manager: z.string().nonempty('Please enter a manager'),
    teamleader: z.string().nonempty('Please enter a team leader'),
})

export const createClient = z.object({
    clientname: z.string().nonempty('Please enter a client name'),
    priority: z.string().nonempty('Please select a priority level'),
})

export const createEvent = z.object({
    eventitle: z.string().nonempty('Please enter a event title'),
    startdate: z.string().nonempty('Please add a start date'),
    enddate: z.string().nonempty('Please add a end date'),
})

export type LeaveSchema = z.infer<typeof leaveSchema>;
export type WdSchema = z.infer<typeof wdSchema>;
export type WfhSchema = z.infer<typeof wfhSchema>;
export type CreateProjectSchema = z.infer<typeof createProjectSchema>
export type VariationSchema = z.infer<typeof projectVariationSchema>
export type LoginSchema = z.infer<typeof login>
export type CreateEmployee = z.infer<typeof createEmployee>
export type CreateTeam = z.infer<typeof createTeam>
export type CreateClient = z.infer<typeof createClient>
export type CreateEvent = z.infer<typeof createEvent>