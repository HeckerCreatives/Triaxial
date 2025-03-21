

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
    const formattedDate = date?.split('T');
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

export const formatDMY = (date: string) => {
  const monthName = new Date(date).toLocaleString('default', { month: 'long' });
  const year = new Date(date).getFullYear();
  const day = new Date(date).getDate();

  return `${day}-${monthName.slice(0,3)}-${(`${year}`).slice(2,4)}`

}


export const formatAustralianDate = (date: string) => {
  const dates = new Date(date); // Convert string to Date object
  const day = dates.getUTCDate().toString().padStart(2, '0');
  const month = (dates.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = dates.getUTCFullYear().toString().slice(-2); // Get last 2 digits of the year

  return `${day}/${month}/${year}`;
};

export const formatMonthYear = (date: string) => {
  const dates = new Date(date); // Convert the string to a Date object
  return dates.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
};


export const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  const firstInitial = parts[0] ? parts[0][0].toUpperCase() : "";
  const lastInitial = parts.length > 1 ? parts[1][0].toUpperCase() : "";
  return firstInitial + lastInitial;
};


export const DDMMYYHMS = (data: string) => {
  const date = new Date(data).toLocaleString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  })

  return date
}


export const DDMMYY = (data: string) => {
  const date = new Date(data).toLocaleString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: '2-digit', 
   
  })

  return date
}


export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
