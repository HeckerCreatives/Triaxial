import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import refreshStore from '@/zustand/refresh'

type Props = {
    note: string,
    userid: string,
    role: string,
    children: React.ReactNode,
    componentid: string
}
export default function Editnotes({ note, userid, role, children, componentid }: Props) {

    
const [changeMember, setChangemember] = useState('')
const [editNote, setEditnote] = useState('') 
const [isEditable, setIsEditable] = useState<boolean>(false);
const router = useRouter()
const [open, setOpen] = useState(false)
const {refresh, setRefresh} = refreshStore()
const [loading, setLoading] = useState(false)


useEffect(() => {
    setEditnote(note === '' ? 'no notes' : note)
}, [note])

 const editNotesmember = async () => {
    setRefresh('true')
    setLoading(true)

    try {
      const request = axios.post(`${process.env. NEXT_PUBLIC_API_URL}/jobcomponent/updatemembernotes`,{
        jobcomponentid: componentid, 
        memberid: userid, 
        notes: editNote
      },
          {
              withCredentials: true,
              headers: {
              'Content-Type': 'application/json'
              }
          }
      )

    const response = await toast.promise(request, {
        loading: 'Updating member notes....',
        success: `Successfully updated`,
        error: 'Error while updating notes',
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
    <DialogTrigger  className="rounded-sm flex items-center text-black text-[.5rem] underline w-full h-[20px]">
        {children}
      {/* {member.notes ? <p className="text-[.5rem]">{truncateText(member.notes, 16)}</p> : <p className="text-[.5rem] h-full w-full text-center">No notes.</p>} */}
    </DialogTrigger>
    <DialogContent className="bg-secondary p-6 border-none max-w-[600px] text-white">
      <DialogHeader>
        <DialogTitle className=' text-sm'>Notes</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      {/* {member.notes ? <p className="text-xs text-zinc-400">{member.notes}</p> : <p className="text-xs text-zinc-400 h-full w-full text-center">No notes.</p>} */}

      <textarea onChange={(e) => setEditnote(e.target.value)} value={editNote} disabled={!isEditable} className=' bg-primary rounded-sm p-2 text-white text-xs h-[100px]'/>
      <div className=' flex items-center gap-1 text-xs'>
        <input 
          type="checkbox" 
          checked={isEditable} 
          onChange={() => setIsEditable(!isEditable)}
          className=' cursor-pointer'
        />
        <p>Edit</p>
      </div>

      <button disabled={loading} onClick={editNotesmember} className=' bg-red-600 text-white px-4 py-2 rounded-sm text-xs w-fit flex items-center gap-1'>
        {loading && (
            <div className=' spinner2'></div>
        )}
        Save Changes</button>
    </DialogContent>
  </Dialog>
  )
}
