import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "./default-board";
import { saveStatePlugin, uuid } from "./utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

// const actions = {
//   createTask({ commit, state }, name) {
//     commit("CREATE_TASK", { tasks: state.board.columns[0].tasks, name });
//   },

//   createColumn({ commit }, name) {
//     commit("CREATE_COLUMN", { name });
//   },

//   updateTask({ commit }, { task, key, value }) {
//     commit("UPDATE_TASK", { task, key, value });
//   },

//   moveTask(
//     { commit, state },
//     { fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex }
//   ) {
//     const fromTasks = state.board.columns[fromColumnIndex].tasks;
//     const toTasks = state.board.columns[toColumnIndex].tasks;
//     const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
//     toTasks.splice(toTaskIndex, 0, taskToMove);
//   },

//   moveColumn({ commit, state }, { fromColumnIndex, toColumnIndex }) {
//     const columnList = state.board.columns;
//     const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
//     columnList.splice(toColumnIndex, 0, columnToMove);
//   }
// };

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ""
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;

      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    }
  },
  actions: {
    createTask({ commit, state }, name) {
      commit("CREATE_TASK", { tasks: state.board.columns[0].tasks, name });
    },

    createColumn({ commit }, name) {
      commit("CREATE_COLUMN", { name });
    },

    updateTask({ commit }, { task, key, value }) {
      commit("UPDATE_TASK", { task, key, value });
    },

    moveTask(
      { commit, state },
      { fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex }
    ) {
      const fromTasks = state.board.columns[fromColumnIndex].tasks;
      const toTasks = state.board.columns[toColumnIndex].tasks;
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },

    moveColumn({ commit, state }, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    }
  }
});
