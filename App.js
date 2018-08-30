import * as React from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, Button } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements'
import { Constants } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [
        {task: 'Estudar', done: false},
        {task: 'Trabalhar', done: true},
      ]
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onFinish = this.onFinish.bind(this);    
  }

  onSubmit() {
    const value = this.state.text;
    this.setState({
      text: '',
      data: [
        ...this.state.data,
        {
          task: value,
          done: false
        }
      ]
    });
  }

  onFinish(index) {
    const list = this.state.data;
    list[index] = { ...list[index], done: !list[index].done }
    this.setState({
      ...this.state,
      data: list,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sua lista de tarefas
        </Text>
        <TextInput 
          style={styles.input}
          onChangeText={(text) => this.setState({...this.state, text})}
          placeholder='Escreva aqui uma nova tarefa...'
          value={this.state.text}
          onSubmitEditing={this.onSubmit}
        />
        <Text>Faltam {this.state.data.filter(el =>el.done === false).length} tarefas</Text>
        <List>
          <FlatList
            data={this.state.data}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <View style={styles.view}>
                <Text style={styles.item}>{item.task}</Text>
                <Button
                  title={item.done ? 'Finalizado' : 'Feito?'}
                  onPress={() => this.onFinish(index)}
                  style={styles.button}
                />
              </View>
            )}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#338b01',
  },
  input: {
    height: 50,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
  },
  title: {
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  item: {
    backgroundColor: 'blue',
    padding: 10,
    fontSize: 18,
    height: 44,
    width: '80%'
  },
  button: {
    backgroundColor: 'red',
    width: '20%'
  },
  view: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row'
  }
});
