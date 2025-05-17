import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import refreshStore from "@/zustand/refresh";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type List = {
  employeeid: string,
  name: string
};

type Props = {
  membername: string;
  memberid: string;
  userid: string
  role: string;
  children: React.ReactNode;
  memberlist: List[];
  componentid: string
};

export default function EditMember({ membername, memberid, userid, role, children, memberlist, componentid }: Props) {
  const [changeMember, setChangeMember] = useState<string>();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const {refresh, setRefresh} = refreshStore()
  const [open, setOpen] = useState(false)
const router = useRouter()
const [loading, setLoading] = useState(false)

console.log(membername)

  
  

  useEffect(() => {
    const selectedMember = memberlist.find((member) => member.name === membername);
    if (selectedMember) {
      setChangeMember(selectedMember.employeeid);
    }
  }, [memberid, memberlist]);


   const changRoleMember = async () => {
      setRefresh('true')
      setLoading(true)
      try {
        const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/jobcomponent/updatemember`,{
            jobcomponentid: componentid, 
            memberid: memberid, 
            member: changeMember
        },
            {
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            }
        )
  
      const response = await toast.promise(request, {
          loading: 'Updating member....',
          success: `Successfully updated`,
          error: 'Error while updating member',
      });
  
      setRefresh('flase')
      setOpen(false)
      setLoading(false)
  
  
    } catch (error) {
      setRefresh('flase')
      setLoading(false)
  
         if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`) 
                    router.push('/')    
                }
  
                if (axiosError.response && axiosError.response.status === 400) {
                    toast.error(`${axiosError.response.data.data}`)     
                       
                }
  
                if (axiosError.response && axiosError.response.status === 402) {
                    toast.error(`${axiosError.response.data.data}`)          
                           
                }
  
                if (axiosError.response && axiosError.response.status === 403) {
                    toast.error(`${axiosError.response.data.data}`)              
                   
                }
  
                if (axiosError.response && axiosError.response.status === 404) {
                    toast.error(`${axiosError.response.data.data}`)             
                }
        } 
       
    }
    };

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-sm flex items-center text-black text-[.5rem] underline">
        {children}
      </DialogTrigger>
      <DialogContent className="bg-secondary p-6 border-none max-w-[400px] text-white">
        <DialogHeader>
          <DialogTitle className="text-sm">Member ({role})</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* ✅ Ensure the Select component updates correctly */}
        <Select value={changeMember} onValueChange={setChangeMember} disabled={!isEditable}>
          <SelectTrigger className="bg-primary">
            <SelectValue>{memberlist.find(m => m.employeeid === changeMember)?.name || "Select member"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {memberlist.map((member) => (
              <SelectItem key={member.employeeid} value={member.employeeid}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Checkbox to enable select */}
        <div className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
            className="cursor-pointer"
          />
          <p>Edit</p>
        </div>

        {/* Save button */}
        <button disabled={loading} onClick={changRoleMember} className="bg-red-600 text-white px-4 py-2 rounded-sm text-xs w-fit flex items-center gap-2">
        {loading && (
            <div className=' spinner2'></div>
        )}
          Save Changes
        </button>
      </DialogContent>
    </Dialog>
  );
}
