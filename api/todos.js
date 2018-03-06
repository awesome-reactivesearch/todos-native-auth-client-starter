import CONFIG from './../constants/Config';

// add function to getHeaders

const logger = message => console.log(message);

class TodoModel {
  constructor(key) {
    this.key = key;
    this.todos = [];
    this.onChanges = [];
    this.appbaseRef = new Appbase({
      url: CONFIG.url,
      app: CONFIG.app,
      credentials: CONFIG.credentials,
      type: CONFIG.type,
    });
  }

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
