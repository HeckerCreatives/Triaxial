export const leaveType = [
  {id:0, type:'Annual Leave'},
  {id:1, type:'Sick Leave'},
  {id:2, type:'Careers Leave'},
  {id:3, type:'Bereavement Leave'},
  {id:4, type:'Study Leave'},
  {id:5, type:'Long Service Leave'},
  {id:6, type:'Anniversary Day'},
  {id:7, type:'Paid Parental Leave'},
  {id:8, type:'Time in Lieu'},
  {id:9, type:'Leave without pay'},
  {id:10, type:'Other Leave'},
]

export const Tabs = [
    {name: 'Show All'},
    {name: 'Nsw Cc'},
    {name: 'Nsw Hydraulic'},
    {name: 'Nsw Renedial-Legal'},
    {name: 'Nsw Civil'},
    {name: 'Nsw Cw Civil'},
    {name: 'Nsw Remedial'},
    {name: 'Nsw Structual'},
    {name: 'Nt Remedial & Design'},
    {name: 'Old Structural'},
    {name: 'Sa Civil'},
    {name: 'Sa Industrial'},
    {name: 'Sa Structural'},
    {name: 'Sa Structural (Light Ind)'},
    {name: 'Drafting'},
    {name: 'Administration'},
]

export const Teams = [
  { name: "NSW CC/NEW. Civil", route: "/superadmin/projects/nsw-cc-new-civil" },
  { name: "NSW Hydraulic", route: "/superadmin/projects/nsw-hydraulic" },
  { name: "NSW Remedial - Legal", route: "/nsw-remedial-legal" },
  { name: "NSW Civil", route: "/superadmin/projects/nsw-civil" },
  { name: "NSW CW Civil", route: "/superadmin/projects/nsw-cw-civil" },
  { name: "NSW Remedial", route: "/superadmin/projects/nsw-remedial" },
  { name: "NSW Structural", route: "/superadmin/projects/nsw-structural" },
  { name: "NT Remedial & Design", route: "/superadmin/projects/nt-remedial-design" },
  { name: "QLD Structural", route: "/superadmin/projects/qld-structural" },
  { name: "SA Civil", route: "/superadmin/projects/sa-civil" },
  { name: "SA Industrial", route: "/superadmin/projects/sa-industrial" },
  { name: "SA Structural", route: "/superadmin/projects/sa-structural" },
  { name: "SA Structural (Light Ind)", route: "/superadmin/projects/sa-structural-light-ind" },
  { name: "Drafting", route: "/superadmin/projects/drafting" },
  { name: "Administration", route: "/superadmin/projects/administration" },
];

export const selectTeams = [
  { label: "NSW CC/NEW. Civil", value: "NSW CC/NEW. Civil" },
  { label: "NSW Hydraulic", value: "NSW Hydraulic" },
  { label: "NSW Remedial - Legal", value: "NSW Remedial - Legal" },
  { label: "NSW Civil", value: "NSW Civil" },
  { label: "NSW CW Civil", value: "NSW CW Civil" },
  { label: "NSW Remedial", value: "NSW Remedial" },
  { label: "NSW Structural", value: "NSW Structural" },
  { label: "NT Remedial & Design", value: "NT Remedial & Design" },
  { label: "QLD Structural", value: "QLD Structural" },
  { label: "SA Civil", value: "SA Civil" },
  { label: "SA Industrial", value: "SA Industrial" },
  { label: "SA Structural", value: "SA Structural" },
  { label: "SA Structural (Light Ind)", value: "SA Structural (Light Ind)" },
  { label: "Drafting", value: "Drafting" },
  { label: "Administration", value: "Administration" },
];

// routes

export const ProjectsSection = [
  // { name: "Project Master List", route: "/superadmin/project" },
  { name: "NSW CC/NEW. Civil", route: "/superadmin/project/teamproject" },
  { name: "NSW Hydraulic", route: "/superadmin/project/teamproject" },
  { name: "NSW Remedial - Legal", route: "/superadmin/project/teamproject" },
  { name: "NSW Civil", route: "/superadmin/project/teamproject" },
  { name: "NSW CW Civil", route: "/superadmin/project/teamproject" },
  { name: "NSW Remedial", route: "/superadmin/project/teamproject" },
  { name: "NSW Structural", route: "/superadmin/project/teamproject" },
  { name: "NT Remedial & Design", route: "/superadmin/project/teamproject" },
  { name: "QLD Structural", route: "/superadmin/project/teamproject" },
  { name: "SA Civil", route: "/superadmin/project/teamproject" },
  { name: "SA Industrial", route: "/superadmin/project/teamproject" },
  { name: "SA Structural", route: "/superadmin/project/teamproject" },
  { name: "SA Structural (Light Ind)", route: "/superadmin/project/teamproject" },
  { name: "Drafting", route: "/superadmin/project/teamproject" },
  { name: "Administration", route: "/superadmin/project/teamproject" },
];

export const ProjectsPm = [
  { name: "Project Master List", route: "/pm/project" },
  { name: "NSW CC/NEW. Civil", route: "/pm/project/teamproject" },
  { name: "NSW Hydraulic", route: "/pm/project/teamproject" },
  { name: "NSW Remedial - Legal", route: "/pm/project/teamproject" },
  { name: "NSW Civil", route: "/pm/project/teamproject" },
  { name: "NSW CW Civil", route: "/pm/project/teamproject" },
  { name: "NSW Remedial", route: "/pm/project/teamproject" },
  { name: "NSW Structural", route: "/pm/project/teamproject" },
  { name: "NT Remedial & Design", route: "/pm/project/teamproject" },
  { name: "QLD Structural", route: "/pm/project/teamproject" },
  { name: "SA Civil", route: "/pm/project/teamproject" },
  { name: "SA Industrial", route: "/pm/project/teamproject" },
  { name: "SA Structural", route: "/pm/project/teamproject" },
  { name: "SA Structural (Light Ind)", route: "/pm/project/teamproject" },
  { name: "Drafting", route: "/pm/project/teamproject" },
  { name: "Administration", route: "/pm/project/teamproject" },
];

export const ProjectsFinance = [
  { name: "NSW CC/NEW. Civil", route: "/finance/project/teamproject" },
  { name: "NSW Hydraulic", route: "/finance/project/teamproject" },
  { name: "NSW Remedial - Legal", route: "/finance/project/teamproject" },
  { name: "NSW Civil", route: "/finance/project/teamproject" },
  { name: "NSW CW Civil", route: "/finance/project/teamproject" },
  { name: "NSW Remedial", route: "/finance/project/teamproject" },
  { name: "NSW Structural", route: "/pm/project/teamproject" },
  { name: "NT Remedial & Design", route: "/finance/project/teamproject" },
  { name: "QLD Structural", route: "/finance/project/teamproject" },
  { name: "SA Civil", route: "/finance/project/teamproject" },
  { name: "SA Industrial", route: "/finance/project/teamproject" },
  { name: "SA Structural", route: "/finance/project/teamproject" },
  { name: "SA Structural (Light Ind)", route: "/finance/project/teamproject" },
  { name: "Drafting", route: "/finance/project/teamproject" },
  { name: "Administration", route: "/finance/project/teamproject" },
];


export const Slides = [
  { name: "Slide 1", route: "/slide1.webp" },
  { name: "Slide 2", route: "/slide2.webp" },
  { name: "Slide 3", route: "/slide3.webp" },
  { name: "Slide 4", route: "/slide4.webp" },
  { name: "Slide 4", route: "/slide5.webp" },
  { name: "Slide 4", route: "/slide6.webp" },
  { name: "Slide 4", route: "/slide7.webp" },
  { name: "Slide 4", route: "/slide8.webp" },
  { name: "Slide 4", route: "/slide9.webp" },
  { name: "Slide 4", route: "/slide10.webp" },
  { name: "Slide 4", route: "/slide11.webp" },
  { name: "Slide 4", route: "/slide12.webp" },
  { name: "Slide 4", route: "/slide13.webp" },
  { name: "Slide 4", route: "/slide14.webp" },
  { name: "Slide 4", route: "/slide15.webp" },
  { name: "Slide 4", route: "/slide16.webp" },
  { name: "Slide 4", route: "/slide17.webp" },
  { name: "Slide 4", route: "/slide18.webp" },
  { name: "Slide 4", route: "/slide19.webp" },
]

export const Employee = [
  { name: "Ava Wallace", value: "Ava Wallace" },
  { name: "Liam Patel", value: "Liam Patel" },
  { name: "Emily Lee", value: "Emily Lee" },
  { name: "Noah Hall", value: "Noah Hall" },
  { name: "Sophia Martin", value: "Sophia Martin" },
  { name: "Olivia White", value: "Olivia White" },
  { name: "Benjamin Davis", value: "Benjamin Davis" },
  { name: "Isabella Taylor", value: "Isabella Taylor" },
  { name: "Alexander Brooks", value: "Alexander Brooks" },
  { name: "Julia Jenkins", value: "Julia Jenkins" }
]


export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const weeks = Array.from({ length: 24 }, (_, i) => `Week ${i + 1}`);
