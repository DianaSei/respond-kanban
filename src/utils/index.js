export const getDate = (date) => {
  let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];
    
    let day = date.getDate();
    let year = date.getFullYear();
    
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    
    
    return `${monthName} ${day} ${year}`;  
}

export const checkFilter = (columns, filter) => {
  let fe = columns.map((column) => {
    let tasks = column.tasks.filter((task) => {
      if (filter.tags && filter.date) {
        return filter.tags === "All"
          ? new Date(`${task.date}`) >= new Date(filter.date[0]) &&
              new Date(`${task.date}`) <= new Date(filter.date[1])
          : task.tags === filter.tags &&
              new Date(`${task.date}`) >=
                new Date(filter.date[0]) &&
              new Date(`${task.date}`) <= new Date(filter.date[1]);
      } else if (filter.tags) {
        return filter.tags === "All"
          ? true
          : task.tags === filter.tags;
      } else {
        return (
          new Date(`${task.date}`) >= new Date(filter.date[0]) &&
          new Date(`${task.date}`) <= new Date(filter.date[1])
        );
      }
    });
    return { ...column, tasks: tasks };
  });
  return fe;
}