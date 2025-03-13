"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Button from "./Button"
import axios from "axios"

// Define the team items
const initialTeams = [
  "NSW Hydraulic",
  "NSW CC Civil W&S",
  "NSW CC Newcastle Civil",
  "NSW Civil",
  "NSW CW Civil",
  "SA Civil",
  "NSW Remedial Strata",
  "NSW Remedial Legal",
  "NSW Structural",
  "NT Remedial & Design",
  "QLD Structural",
  "SA Structural",
  "SA Industrial",
  "Drafting",
  "Administration",
]

interface Teams {
    teamid: string
    teamname: string
    index: number
}

// Sortable item component
function SortableItem({ team }: { team: Teams }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: team.teamid })
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1 : 0,
      opacity: isDragging ? 0.8 : 1,
      boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.15)" : "none",
    }
  
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`p-2 bg-zinc-200 text-black text-[.6rem] rounded-sm cursor-move flex items-center ${
          isDragging ? "bg-zinc-300" : ""
        }`}
      >
        <div className="mr-2 text-zinc-500">⋮⋮</div>
        <span>{team.teamname}</span>
        <span className="ml-auto text-zinc-400">#{team.index}</span>
      </div>
    )
  }

export default function SortableTeamsDialog() {
  const [teams, setTeams] = useState<Teams[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getList = async () => {
     
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teams/listallteamsforselect`,{
            withCredentials: true
          })

          setTeams(response.data.data)
  
        } catch (error) {
          
        }
      
     
    }
    getList()
  },[])

  const save = async () => {
     setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teams/updateteamindexes`,{
        teamindexes: teams
      },{
        withCredentials: true
      })

      if(response.data.message === 'success'){
        setLoading(false)

        window.location.reload()
      }

    } catch (error) {
        setLoading(false)
      
    }
  
 
}

  // Set up sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Handle the end of a drag event
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTeams((items) => {
        const oldIndex = items.findIndex((item) => item.teamid === active.id)
        const newIndex = items.findIndex((item) => item.teamid === over.id)

        // Create a new array with the updated order
        const newItems = arrayMove(items, oldIndex, newIndex)

        // Update the index property to reflect the new order
        return newItems.map((item, idx) => ({
          ...item,
          index: idx + 1,
        }))
      })
    }
  }


  return (
    <Dialog>
      <DialogTrigger className=" text-[.6rem] flex items-center gap-1 bg-red-500 px-3 py-1 rounded-sm">
        <p className=" whitespace-nowrap">Sort Team</p>
        <Filter size={12} />
      </DialogTrigger>
      <DialogContent className="p-6 max-w-[400px] max-h-[80%]">
        <DialogHeader>
          <DialogTitle className="text-sm">Sort Team</DialogTitle>
          <DialogDescription className=" text-xs">Drag the team to sort.</DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-1">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={teams.map((team) => team.teamid)} strategy={verticalListSortingStrategy}>
              {teams.map((team) => (
                <SortableItem key={team.teamid} team={team} />
              ))}
            </SortableContext>
          </DndContext>

          <button disabled={loading} onClick={save} className=" text-xs bg-red-500 text-white px-3 py-1 rounded-sm w-fit mt-4">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

