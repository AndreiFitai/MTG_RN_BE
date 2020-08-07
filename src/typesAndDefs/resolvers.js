const resolvers = {
  Query: {
    todos: (root, args) => {
      return todos.filter((todo) => todo.user === id);
    },
  },
};
