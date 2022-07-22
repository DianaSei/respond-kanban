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
      if (filter.tags !== "All" && filter.tags !== "" && filter.date.length !== 0) {
        return task.tags === filter.tags &&
              new Date(`${task.date}`) >=
                new Date(filter.date[0]) &&
              new Date(`${task.date}`) <= new Date(filter.date[1]);
      } else if (filter.tags !== "" && filter.tags !== "All") {
        return task.tags === filter.tags;
      } else if(filter.date.length !== 0) {
        return (
          new Date(`${task.date}`) >= new Date(filter.date[0]) &&
          new Date(`${task.date}`) <= new Date(filter.date[1])
        );
      } else {
        return true
      }
    });
    return { ...column, tasks: tasks };
  });
  let searchedColumns;
  if(filter.search !== ""){
    searchedColumns = fe.map(column => {
      let tasks = column.tasks.filter((task) => {
        return task.title.toLowerCase().includes(filter.search.toLowerCase()) || task.description.toLowerCase().includes(filter.search.toLowerCase());
      })
      return { ...column, tasks: tasks };
    })
  } else {
    searchedColumns = fe;
  }
  return searchedColumns;
}