"use client"
import React, { useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Createprojectcomponent from '@/components/forms/Createprojectcomponent'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Legends from '@/components/common/Legends'
import axios, { AxiosError } from 'axios'
import { env } from 'process'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { months, weeks } from '@/types/data'
import { Pen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Editprojectjobmanager from '@/components/forms/Editprojectjobmanager'
import { Textarea } from '@/components/ui/textarea'


interface DateItem {
  date: string;
  status: number;
  hours: number;
  isOnLeave: boolean;
  isOnWellnessday: boolean;
  isOnEvent: boolean;
}

interface Member {
  role: string;
  employee: {
    employeeid: string;
    fullname: string;
  };
  dates?: DateItem[];
}

interface GraphItem {
  teamname: string;
  projectname: string;
  clientname: string;
  jobno: number;
  jobmanager: {
    employeeid: string;
    fullname: string;
    isManager: boolean;
    isJobManager: boolean,
  };
  jobcomponent: {
    componentid: string;
    componentname: string;
  };
  notes: string;
  members: Member[];
}

interface Data {
  graph: GraphItem[];
  // isManager: boolean,
}

const initialData: Data = {
  graph: [
    {
      teamname: 'team test',
      projectname: 'project test',
      clientname: 'client test',
      jobno: 1,
      jobmanager: {
        employeeid: 'id here',
        fullname: 'Darel Honrejas',
        isManager: true,
        isJobManager: false,
      },
      jobcomponent: {
        componentid: 'id here',
        componentname: 'testing component' 
      },
      notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consequuntur optio amet, labore fugiat odio eaque expedita recusandae quae, officia quod atque. Modi fugit exercitationem nulla commodi officiis consequatur perferendis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consequuntur optio amet, labore fugiat odio eaque expedita recusandae quae, officia quod atque. Modi fugit exercitationem nulla commodi officiis consequatur perferendis?', 
      members: [
        {
          role: 'Engineer (Engr.)',
          employee: {
            employeeid: 'id here',
            fullname: 'Bien Daniel'
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
           
          ]
        },
        {
          role: "Engineer Reviewer (Engr. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Bien Daniel"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
      {
          role: "Drafter (Drft.)",
          employee: {
              employeeid: "id here",
              fullname: "Joshua De Guzman"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
      {
          role: "Drafter Reviewer (Drft. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Jomarie Luistro"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
       
      ]
    },
    {
      teamname: 'team test',
      projectname: 'project test',
      clientname: 'client test',
      jobno: 1,
      jobmanager: {
        employeeid: 'id here',
        fullname: 'Darel Honrejas',
        isManager: true,
        isJobManager: false,
      },
      jobcomponent: {
        componentid: 'id here',
        componentname: 'testing component' 
      },
      notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consequuntur optio amet, labore fugiat odio eaque expedita recusandae quae, officia quod atque. Modi fugit exercitationem nulla commodi officiis consequatur perferendis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consequuntur optio amet, labore fugiat odio eaque expedita recusandae quae, officia quod atque. Modi fugit exercitationem nulla commodi officiis consequatur perferendis?', 
      members: [
        {
          role: 'Engineer (Engr.)',
          employee: {
            employeeid: 'id here',
            fullname: 'Bien Daniel'
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
           
          ]
        },
        {
          role: "Engineer Reviewer (Engr. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Bien Daniel"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
      {
          role: "Drafter (Drft.)",
          employee: {
              employeeid: "id here",
              fullname: "Joshua De Guzman"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
      {
          role: "Drafter Reviewer (Drft. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Jomarie Luistro"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
       
      ]
    },
    {
      teamname: 'team test',
      projectname: 'project test',
      clientname: 'client test',
      jobno: 1,
      jobmanager: {
        employeeid: 'id here',
        fullname: 'Darel Honrejas',
        isManager: true,
        isJobManager: false,
      },
      jobcomponent: {
        componentid: 'id here',
        componentname: 'testing component' 
      },
      notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consequuntur optio amet, labore fugiat odio eaque expedita recusandae quae, officia quod atque. Modi fugit exercitationem nulla commodi officiis consequatur perferendis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consequuntur optio amet, labore fugiat odio eaque expedita recusandae quae, officia quod atque. Modi fugit exercitationem nulla commodi officiis consequatur perferendis?', 
      members: [
        {
          role: 'Engineer (Engr.)',
          employee: {
            employeeid: 'id here',
            fullname: 'Bien Daniel'
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
           
          ]
        },
        {
          role: "Engineer Reviewer (Engr. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Bien Daniel"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
      {
          role: "Drafter (Drft.)",
          employee: {
              employeeid: "id here",
              fullname: "Joshua De Guzman"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
      {
          role: "Drafter Reviewer (Drft. Revr.)",
          employee: {
              employeeid: "id here",
              fullname: "Jomarie Luistro"
          },
          dates: [
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/11/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: true, isOnEvent: false },
            { date: '05/12/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/13/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/14/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/15/2024', status: 0, hours: 9, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/16/2024', status: 0, hours: 0, isOnLeave: true, isOnWellnessday: false, isOnEvent: true },
            { date: '05/17/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: true, isOnEvent: false },
            { date: '05/18/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
            { date: '05/19/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: true },
            { date: '05/20/2024', status: 0, hours: 0, isOnLeave: false, isOnWellnessday: false, isOnEvent: false },
          ]
      },
       
      ]
    },
   
   
  ],
  // isManager: true,
};


export default function Yourworkload() {
  const [tab2, setTab2] = useState('Leave')
  const [dialog, setDialog] = useState(false)
  const [index, setIndex] = useState(0)
  const [memberIndex, setMemberIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(0)
  const [wdStatus, setWdstatus] = useState(false)
  const [leaveStatus, setLeavestatus] = useState(false)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [hours, setHours] = useState(0)
  const [status, setStatus] = useState('')
  const [employeeid, setEmployeeid] = useState('')
  const [jobmanager, setJobmanager] = useState(false)
  const [loading, setLoading] = useState(false)


  const router = useRouter()


  const [data, setData] = useState(initialData);

  // Function to update status of a specific date
  const updateStatus = (memberIndex: number, dateIndex: number, newStatus: number,updatedHours: number, graphIndex: number,) => {
    console.log(newStatus)
    setData(prevData => {
      const newData = { ...prevData };
      const selectedMember = newData.graph[teamIndex].members[memberIndex];
      if (selectedMember.dates && selectedMember.dates[dateIndex]) {
        selectedMember.dates[dateIndex].status = newStatus;
        selectedMember.dates[dateIndex].hours = updatedHours;
      }
      return newData;
    });
  };

// Memoized data to prevent unnecessary re-renders
  const memorizedData = useMemo(() => data, [data]);

  const getStatus = (data: number, leave: boolean, wd: boolean, event: boolean, hours: number) => {

    const colorData = []
    if(leave === true){
      colorData.push('bg-violet-300')
    }
     if(wd === true){
      colorData.push('bg-fuchsia-400')
    }
    if(hours > 8){
      colorData.push('bg-pink-500')
    }
    // if(event === true){
    //   colorData.push('bg-fuchsia-400')
    // }
    // if(data === 0){
    //  colorData.push('bg-white')
    // }
    if(data === 1){
      colorData.push('bg-red-500')
    }
    if(data === 2){
      colorData.push('bg-amber-500')
    }
    if(data === 3){
      colorData.push('bg-yellow-300')
    }
    if(data === 4){
      colorData.push('bg-green-500')
    }
    if(data === 5){
      colorData.push('bg-blue-500')
    }
    if(data === 6){
      colorData.push('bg-cyan-400')
    }

    console.log(colorData)


    return colorData

   
  }

  //update workload
  const updateWorkload = async () => {
    try {
      const request = axios.post(`${env.NEXT_PUBLIC_API_URL}`,{

      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
          }
      })

      const response = await toast.promise(request, {
        loading: 'Updating workload....',
        success: `Successfully updated`,
        error: 'Error while updating the workload',
    });
    } catch (error) {
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
  }

  console.log(leaveStatus)

  const position = (jobManager: boolean, manager: boolean) => {
    if(jobManager && manager === true){
      return 'Project & Job Manager'
    }else if(jobManager === false && manager === true){
      return 'Project Manager'
    }else if(jobManager === true && manager === false){
      return 'Job Manager'
    }else{
      return 'Your not allowed to edit this project'
    }
  }


  return (
   <div className=' w-full h-full flex flex-col justify-center bg-secondary p-4 text-zinc-100'>

     
      <div className=' h-full w-full flex flex-col max-w-[1920px]'>
        <div className=' h-full overflow-y-auto flex items-start justify-center bg-secondary w-full max-w-[1920px]'>
          <table className="table-auto w-[300px] border-collapse ">
            <thead className=' bg-secondary h-[100px]'>

              <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                <th className=' w-[20px] font-normal'>Name</th>
                <th className=' w-[50px] font-normal'>Initial</th>
                <th className=' font-normal w-[50px]'>Resource</th>
             
              </tr>
            </thead>
            <tbody>
            {memorizedData.graph.map((graphItem, graphIndex) =>
              graphItem.members.map((member, memberIndex) => (
                <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                           
                    <td className="text-center text-red-600">{graphItem.teamname}</td>
                    <td className="text-center">{graphItem.jobno}</td>
                    <td className="text-center">{graphItem.clientname}</td>
                   
        
                </tr>
              ))
            )}
          </tbody>
          </table>

          <div className=' overflow-x-auto w-full'>
            <table className="table-auto w-full border-collapse ">
              <thead className=' w-full bg-secondary h-[100px]'>
                <tr className=' text-[0.6rem] text-zinc-100 font-normal'>
                
                  {memorizedData.graph[0].members[0].dates?.map((dateObj, index) => (
                    <>
                      <th key={index} className=' relative font-normal w-[30px] border-[1px] border-zinc-700'>
                        <p className=' w-[30px] absolute rotate-90 top-8'>{dateObj.date}</p>
                      </th>
                      {(index + 1) % 5 === 0 && (
                        <th key={`total-${index}`} className='font-normal w-[30px] border-[1px] border-zinc-700'>
                          <p className='rotate-90'>Total Hours</p>
                        </th>
                      )}
                    </>
                  ))}
                
                  
                </tr>
              </thead>
              <tbody>
              {memorizedData.graph.map((graphItem, graphIndex) =>
                graphItem.members.map((member, memberIndex) => (
                  <tr key={`${graphIndex}-${memberIndex}`} className="bg-primary text-[.6rem] py-2 h-[40px] border-[1px] border-zinc-600">
                    
                    {member.dates?.map((dateObj, dateIndex) => {
                        // Calculate sum every 5 days
                        const startIndex = Math.floor(dateIndex / 5) * 5;
                        const endIndex = startIndex + 5;

                        // Sum the hours for the current set of 5 days
                        const totalHours = member.dates?.slice(startIndex, endIndex).reduce((acc, date) => acc + date.hours, 0);

                        return (
                          <>
                            <td 
                              key={dateIndex} 
                              className="relative text-center overflow-hidden bg-white cursor-pointer border-[1px]"
                              onClick={() => {
                                setDialog(true);
                                setIndex(dateIndex);
                                setHours(dateObj.hours);
                                setMemberIndex(memberIndex);
                                setTeamIndex(graphIndex);
                                setWdstatus(dateObj.isOnWellnessday);
                                setLeavestatus(dateObj.isOnLeave)
                                setDate(dateObj.date);
                                setName(member.employee.fullname);
                                setRole(member.role);
                                setEmployeeid(member.employee.employeeid)
                                setJobmanager(graphItem.jobmanager.isJobManager)
                            
                              }}
                            >
                              <div className='flex absolute top-0 w-full h-[40px] text-center'>
                                {getStatus(dateObj.status, dateObj.isOnLeave, dateObj.isOnWellnessday, dateObj.isOnEvent, dateObj.hours).map((item, index) => (
                                  <div className={`w-full ${item}`} key={index}></div>
                                ))}
                              </div>
                              <p className='relative text-black font-bold text-xs z-30'>{dateObj.isOnWellnessday !== true && dateObj.hours}</p>
                            </td>

                            {/* Insert Total every 5 days */}
                            {(dateIndex + 1) % 5 === 0 && (
                              <th key={`total-${dateIndex}`} className='font-normal w-[40px] bg-primary border-[1px] border-zinc-700'>
                                <p className=''>{totalHours}</p> {/* Display the sum of hours for every 5 days */}
                              </th>
                            )}
                          </>
                        );
                      })}

                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>

          

          <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogContent className=' p-8 bg-secondary border-none text-white'>
                    <DialogHeader>
                      <DialogTitle>Update workload</DialogTitle>
                      <DialogDescription>
                        You can only update the hours rendered if the employee is not on wellness day.
                      </DialogDescription>
                    </DialogHeader>
                    <div className=' w-full flex flex-col gap-2'>

                      <div className=' text-xs flex flex-col gap-1 bg-primary p-4 rounded-sm'>
                        <p className=' text-sm font-bold'>{name} <span className=' text-xs text-red-500'>({role})</span></p>
                        <p>Employee is currently in at {date}: </p>
                        <p className=' text-zinc-400'>Leave:{leaveStatus === true ? 'Yes' : 'No'}</p>
                        <p className=' text-zinc-400'>Wellness day:{wdStatus === true ? 'Yes' : 'No'}</p>
                      </div>

                    <Select disabled={jobmanager === true ? false : true} value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-[180px] text-xs bg-primary">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Due on</SelectItem>
                        <SelectItem value="2">25 %</SelectItem>
                        <SelectItem value="3">50 %</SelectItem>
                        <SelectItem value="4">75 %</SelectItem>
                        <SelectItem value="5">100 %</SelectItem>
                        <SelectItem value="6">CNST PH.</SelectItem>
                      </SelectContent>
                    </Select>


                  </div>

                  { wdStatus !== true && (
                    <div className=' flex flex-col gap-2 text-xs'>
                      <label htmlFor="">Hours Rendered</label>
                      <input disabled={jobmanager === true ? false : true} type="number" value={hours} onChange={(e) => setHours(e.target.valueAsNumber)} placeholder='Hours' id="" className=' bg-primary p-2 rounded-md text-xs' />
                      
                    </div>
                  )}

                      <div className=' w-full flex items-end justify-end mt-4'>
                        <button disabled={jobmanager === true ? false : true} onClick={() => updateStatus(memberIndex, index, parseInt(status), hours, teamIndex )} className=' px-4 py-2 bg-red-600 text-xs text-white rounded-md'>Save</button>
                      </div>

                      {jobmanager === false && (
                        <p className=' text-red-500 text-xs'>You are not allowed to edit the workload, only the job manager have access to do that.</p>
                      )}

                 
                 
                  </DialogContent>
          </Dialog>

          

        </div>
       
        
      </div>

    
        
    </div>
  )
}
