import { any, z } from "zod";

export const leaveSchema = z.object({
 details: z
    .string().optional(),
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
 wdcycle: z
     .string(),
declaration: z.boolean().refine((val) => val === true, { message: "You must agree to the declaration" }),


});

export const wdSchema = z.object({
// name: z
//     .string()
//     .nonempty("Name is empty"),
startdate: z
    .string().optional(),
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
    reason: z
    .string(),
startdate: z
    .string()
    .nonempty("Start date is empty"),

totalhoursonleave: z
    .number(),
duringleave: z
    .number(),
// workingdays: z
//     .number(),
// holidays: z
//     .number(),
 wdcycle: z
     .string(),
 declaration: z.boolean().refine((val) => val === true, { message: "You must agree to the declaration" })

});

export const createProjectSchema = z.object ({
    team: z.string().nonempty("Team is empty"),
    projectname: z.string().nonempty("Project name is empty"),
    client: z.string().nonempty("Client is empty"),
    start: z.string().nonempty("Start date is empty"),
    end: z.string().nonempty("End date is empty"),
    jobno: z.string().nonempty("Job no is empty"),

})

export const createProjectComponenent = z.object ({
    jobmanager: z.string(),
    estbudget: z.number(),
    adminnotes: z.string(),
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
    firstname: z
    .string()
    .nonempty("Please enter a firstname")
    .max(25, "First Name cannot exceed 25 characters")
    .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),
  lastname: z
    .string()
    .nonempty("Please enter a lastname")
    .max(25, "Last Name cannot exceed 25 characters")
    .regex(/^[A-Za-z]+$/, "Last Name must contain only letters"),
  initial: z
    .string()
    .nonempty("Please enter an initial")
    .max(10, "Initial cannot exceed 10 characters")
    .regex(/^[A-Za-z]+$/, "Initial must contain only letters"),
  contactno: z
    .string()
    .nonempty("Please enter a contact number")
    .max(20, "Contact number cannot exceed 20 numbers")
    .regex(/^\d+$/, "Contact number must contain only numbers"),
  team: z.string().nonempty("Please enter a team"),
  reportingto: z.string().nonempty("Please enter a reporting person"),
  email: z.string().email("Invalid email address"),
  position: z.string().nonempty("Please enter a position"),
  resource: z.string().nonempty("Please select a resource"),  
  password: z.string(),
})

export const createTeam = z.object({
    teamname: z
    .string()
    .nonempty("Please enter a team name")
    .max(25, "Team Name cannot exceed 25 characters")
    .regex(/^[A-Za-z0-9\s]+$/, "Team Name can only contain letters and numbers"),
    directorpartner: z.string().nonempty('Please enter a director partner'),
    associate: z.string(),
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

export const processLeave = z.object({
    comments: z.string(),
    status: z.string()
})

export const wdrequestperiod = z.object({
    start: z.string().nonempty("Please enter a starting date"),
    end: z.string().nonempty("Please enter an end date"),
    cycleend: z.string().nonempty("Please enter a cycle end date"),
    cyclestart: z.string().nonempty("Please enter a cycle start date"),
  })
    // End date should not be the same as Start date
    .refine((data) => data.end !== data.start, {
      message: "End date cannot be the same as Start date",
      path: ["end"],
    })
  
    // Cycle start should not be the same as Cycle end
    .refine((data) => data.cycleend !== data.cyclestart, {
      message: "Cycle End date cannot be the same as Cycle Start date",
      path: ["cycleend"],
    })
  
    // Cycle start should be the same or after start date
    .refine((data) => new Date(data.cyclestart) >= new Date(data.start), {
      message: "Cycle Start should not be before Start date.",
      path: ["cyclestart"],
    })
  
    // Cycle end should be after the end date
    .refine((data) => new Date(data.cycleend) > new Date(data.end), {
      message: "Cycle End should be after End date.",
      path: ["cycleend"],
    });
  
export const changepassword = z
  .object({
    cpassword: z.string().max(20).nonempty('Please enter your current password'),
    newpassword: z.string().max(20).nonempty('Please enter a new password'),
    confirmpassword: z.string().max(20)
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords don't match",
    path: ['confirmpassword'], // Error will appear under confirmpassword field
  });


export const editProjectComponentAsManager = z.object({
    client: z.string(),
    projectname: z.string(),
    jobmanager: z.string(),
})

export type LeaveSchema = z.infer<typeof leaveSchema>;
export type WdSchema = z.infer<typeof wdSchema>;
export type WfhSchema = z.infer<typeof wfhSchema>;
export type CreateProjectSchema = z.infer<typeof createProjectSchema>
export type CreateProjectComponentSchema = z.infer<typeof createProjectComponenent>
export type VariationSchema = z.infer<typeof projectVariationSchema>
export type LoginSchema = z.infer<typeof login>
export type CreateEmployee = z.infer<typeof createEmployee>
export type CreateTeam = z.infer<typeof createTeam>
export type CreateClient = z.infer<typeof createClient>
export type CreateEvent = z.infer<typeof createEvent>
export type ProcessLeave = z.infer<typeof processLeave>
export type Wdrequestperiod = z.infer<typeof wdrequestperiod>
export type Changepassword = z.infer<typeof changepassword>