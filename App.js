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
  }
  
  onSubmit() {
    const value = this.state.text;
    this.setState({text: '', task: [{task: value, done: false}]});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          O que você deseja fazer?
        </Text>
        <TextInput 
          style={{ height: 50 }}
          onChangeText={(text) => this.setState({...this.state, text})}
          placeholder='Digite...'
          value={this.state.text}
        />
        <Button
          title='Ok!'
          onPress={this.onSubmit}
        />
        <List>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.item}>{item.task}</Text>
                <Button
                  title='feito'
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
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
