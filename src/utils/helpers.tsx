 export const clientColor = (data: string) => {
    if(data?.includes('1')){
      return 'bg-[#93C47D]'
    } else if(data?.includes('2')){
      return 'bg-[#B6D7A8]'
    } else if(data?.includes('3')){
      return 'bg-[#D9ead3]'
    } else {
      return 'bg-gray-200'

    }
  }


export const formatAustralianDate = (date: any) => {
    const parsedDate = new Date(date); // Ensure the date is converted to a Date object
    return parsedDate.toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };
  
export const formatMonthYear = (date: any) => {
    const parsedDate = new Date(date); // Ensure the date is converted to a Date object
    return parsedDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
  };