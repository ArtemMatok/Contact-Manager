

export const isValidDate = (dateString: string): boolean => {
    //  YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!dateRegex.test(dateString)) {
      return false;
    }
  

    const date = new Date(dateString);
    const timestamp = date.getTime();
  
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }
  
    return dateString === date.toISOString().split('T')[0];
  };