import { createStore } from "vuex";
import { getDate } from "../utils";
export default createStore({
  state: {
    columns: [
      {
        title: "New Requests",
        tasks: [
          {
            id: 1,
            title: "Add discount code to checkout page",
            description: "Some description for every task",
            date: "Sep 14",
            files: [],
            comments: [],
            tags: "Feature Request",
          },
          {
            id: 2,
            title: "Provide documentation on integrations",
            description: "Some description for every task",
            date: "Sep 12",
            files: [],
            comments: [],
          },
          {
            id: 3,
            title: "Design shopping cart dropdown",
            description: "Some description for every task",
            date: "Sep 9",
            files: [],
            comments: [],
            tags: "Design",
          },
          {
            id: 4,
            title: "Add discount code to checkout page",
            description: "Some description for every task",
            date: "Sep 14",
            files: [],
            comments: [],
            tags: "Feature Request",
          },
          {
            id: 5,
            title: "Test checkout flow",
            description: "Some description for every task",
            date: "Sep 15",
            files: [],
            comments: [],
            tags: "QA",
          },
        ],
      },
      {
        title: "In Development",
        tasks: [
          {
            id: 6,
            title: "Design shopping cart dropdown",
            description: "Some description for every task",
            date: "Sep 9",
            files: [],
            comments: [],
            tags: "Design",
          },
          {
            id: 7,
            title: "Add discount code to checkout page",
            description: "Some description for every task",
            date: "Sep 14",
            files: [],
            comments: [],
            tags: "Feature Request",
          },
          {
            id: 8,
            title: "Provide documentation on integrations",
            description: "Some description for every task",
            date: "Sep 12",
            files: [],
            comments: [],
            tags: "Backend",
          },
        ],
      },
      {
        title: "Production",
        tasks: [
          {
            id: 9,
            title: "Provide documentation on integrations",
            description: "Some description for every task",
            date: "Sep 12",
            files: [],
            comments: [],
          },
          {
            id: 10,
            title: "Design shopping cart dropdown",
            description: "Some description for every task",
            date: "Sep 9",
            files: [],
            comments: [],
            tags: "Design",
          },
          {
            id: 11,
            title: "Add discount code to checkout page",
            description: "Some description for every task",
            date: "Sep 14",
            files: [],
            comments: [],
            tags: "Feature Request",
          },
          {
            id: 12,
            title: "Design shopping cart dropdown",
            description: "Some description for every task",
            date: "Sep 9",
            files: [],
            comments: [],
            tags: "Design",
          },
          {
            id: 13,
            title: "Add discount code to checkout page",
            description: "Some description for every task",
            date: "Sep 14",
            files: [],
            comments: [],
            tags: "Feature Request",
          },
        ],
      },
    ],
  },
  mutations: {
    addTask(state, item) {
      let id = state.columns[2].tasks.at(-1).id + 1;
      const refItem = {
        date: getDate(item.date),
        description: item.description,
        id: id,
        tags: item.tags,
        title: item.title,
        files: item.files,
        comments: []
      }
      if(!item.stage){
        state.columns[0].tasks.push(refItem)
      } else { 
        state.columns.map(column => {
        if(column.title === item.stage){
            column.tasks.push(refItem)
          } else {
            return column
          }
        })
      }
    },
    removeTask(state, item) {      
      state.columns = state.columns.map(column => {
        return ({
          ...column,
          tasks: column.tasks.filter((task) => {
            return task.id != item.id;
          })
        }
        )
      })
    },
    updateTask(state, data) {     
      state.columns = state.columns.map(column => {
        return ({
          ...column,
          tasks: column.tasks.map((task) => {
            if(task.id === data.id){
              if(data.comment){
                task.comments.push(data.comment);
              }
              if(data.files){
                data.files.map(file => task.files.push(file));
              } 
              return task
            } else {
              return task
            }
          })
        }
        )
      })
    }
  }
});