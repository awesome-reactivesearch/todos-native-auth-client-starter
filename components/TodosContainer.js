import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, FlatList, StatusBar, Button, Alert, Platform } from 'react-native';
import { View } from 'native-base';
import { ReactiveList } from '@appbaseio/reactivesearch-native';
// create auth0 service first here

import Utils from '../utils';
import TODO_TYPE from '../types/todo';
import CONSTANTS from '../constants';
import COLORS from '../constants/Colors';
import Header from './Header';
import TodoModel from '../api/todos';
import AddTodo from './AddTodo';
import AddTodoButton from './AddTodoButton';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
  },

  row: {
    top: 15,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

const propTypes = {
  screen: PropTypes.oneOf([CONSTANTS.ALL, CONSTANTS.ACTIVE, CONSTANTS.COMPLETED]).isRequired,
};

export default class TodosContainer extends React.Component {
  state = {
    addingTodo: false,
  };

  componentWillMount() {
    this.api = new TodoModel('react-todos');
  }

  onAllData = (todos, streamData) => {
    const todosData = Utils.mergeTodos(todos, streamData);

    // filter data based on "screen": [All | Active | Completed]
    const filteredData = this.filterTodosData(todosData);

    return (
      <FlatList
        style={{ width: '100%', top: 15 }}
        data={filteredData || []}
        keyExtractor={item => item._id}
        renderItem={({ item: todo }) => (
          <TodoItem
            todo={todo}
            onUpdate={this.api.update}
            onDelete={this.api.destroy}
            // pass via props
          />
        )}
      />
    );
  };

  filterTodosData = (todosData) => {
    const { screen } = this.props;

    switch (screen) {
      case CONSTANTS.ALL:
        return todosData;
      case CONSTANTS.ACTIVE:
        return todosData.filter(todo => !todo.completed);
      case CONSTANTS.COMPLETED:
        return todosData.filter(todo => todo.completed);
    }

    return todosData;
  };

  render() {
    const isAndroid = Platform.OS === 'android';
    return (
      <View style={{ flex: 1 }}>
        <Header />
        {isAndroid ? (
          <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        ) : (
          <StatusBar backgroundColor={COLORS.primary} barStyle="dark-content" />
        )}
        <ScrollView>
          {/* Add Login button */}
          <ReactiveList
            componentId="ReactiveList"
            onAllData={this.onAllData}
            stream
            defaultQuery={() => ({
              query: {
                match_all: {},
              },
            })}
            dataField="title"
            showResultStats={false}
            pagination={false}
          />
          {this.state.addingTodo ? (
            <View style={styles.row}>
              <AddTodo
                onAdd={(todo) => {
                  this.setState({ addingTodo: false });
                  this.api.add(todo, {});
                }}
                onCancelDelete={() => this.setState({ addingTodo: false })}
                onBlur={() => this.setState({ addingTodo: false })}
              />
            </View>
          ) : null}
        </ScrollView>
        <AddTodoButton onPress={() => this.setState({ addingTodo: true })} />
      </View>
    );
  }
}

TodosContainer.propTypes = propTypes;
