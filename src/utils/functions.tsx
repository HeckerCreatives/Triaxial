

export const statusColor = (data: string) => {
    if(data === 'Pending'){
      return 'text-blue-500'
    } else if (data === 'Approved') {
      return 'text-green-500'
    } else {
      return 'text-red-500'
      
    }

  }

export  const formatDate = (date: string) => {
    const formattedDate = date.split('T');
    return formattedDate[0]
}

export  const formatDateTime = (date: string) => {
  const formattedDate =  new Date(date).toLocaleString();
  return formattedDate
}


export const getStatus = (data: number, leave: boolean, wd: boolean, event: boolean) => {
  const colorData = []
  if(leave === true){
    colorData.push('bg-pink-500')
  }
   if(wd === true){
    colorData.push('bg-violet-300')
  }
  if(event === true){
    colorData.push('bg-fuchsia-400')
  }
  if(data === 0){
   colorData.push('bg-red-500')
  }
  if(data === 1){
    colorData.push('bg-red-500')
  }
  if(data === 2){
    colorData.push('bg-amber-500')
  }
  if(data === 3){
    colorData.push('bg-yellow-500')
  }
  if(data === 4){
    colorData.push('bg-green-500')
  }
  if(data === 5){
    colorData.push('bg-blue-500')
  }
  if(data === 6){
    colorData.push('bg-cyan-300')
  }


  return colorData

 
}