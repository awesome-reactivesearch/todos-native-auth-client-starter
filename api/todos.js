import CONFIG from './../constants/Config';

// add function to getHeaders

const logger = message => console.log(message);

class TodoModel {
  add(todo, screenProps) {
    // add todo API goes here
    console.log('Called add API')
  }

  update = (todo, screenProps) => {
    // update todo API goes here
    console.log('Called update API')
  };

  destroy = (todo, screenProps) => {
    // delete todo API goes here
    console.log('Called delete API')
  };
}

export default TodoModel;
