

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
    const formattedDate = date.split('T')[0];

    return formattedDate
  }