import React , {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput,Button } from 'react-native';
import {CheckBox } from 'react-native-elements';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';

export default class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {list: []};
      this.handleAddTask = this.handleAddTask.bind(this);
      this.deleteTask = this.deleteTask.bind(this);

  }
  handleAddTask(task) {
      console.log("add task clicked");
      this.state.list.push(task);
      this.setState({list: this.state.list})
  }
  deleteTask(task) {
      console.log("delete task clicked");
      let d = this.state.list.filter(task_item => task_item.id !== task);
      this.setState({list: d})
  }
  CheckTask(i){
    console.log("checktask clicked");
    let check_list = this.state.list;
    check_list[i].checked = !check_list[i].checked; 
    this.setState({list: check_list})
  }
  listitem(){
    return this.state.list.map((t,i) => {
      return (
              <View>
                <ScrollView>
                <CheckBox
                title= {t.name+','+t.date}
                checked={t.checked}
                onPress={( )=> this.CheckTask(i)}
              />
              <Button 
                  title="Delete" 
                  onPress={() => this.deleteTask(t.id)}
              />
              </ScrollView>
              </View>
            )
          })
        
  }
  render() {
      return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>TODO List</Text>
        <View>
            <TaskNameForm onAddTask={this.handleAddTask} />
        </View>
        <Text style={styles.title}>Lists</Text>
        <View>
          <ScrollView>
            {this.listitem()}
          </ScrollView>
        </View>
        </SafeAreaView>
             
      );
  }
}

export class TaskNameForm extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dateChange = this.dateChange.bind(this);

  }

  handleSubmit(event) {
      const taskList = this.props.taskList;
      // create a task object
      event.preventDefault();
      const task = {id:Date.now(), name: this.state.TextInputvalue, 
      dueDate: new Date(),date:this.state.date,checked:false};
      // add the task object to the task list
      this.props.onAddTask(task);
      this.setState({TextInputvalue:''})
  }

  handleChange(event) {
      // code to set the state of the component
      this.setState({TextInputvalue: event});
    
  }
  dateChange(event){
      this.setState({date :event.target.value});
  }


  render() {
      return(
        <View>
            <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder={'Enter task'}  
                    value={this.state.TextInputvalue}
                    onChangeText={this.handleChange}
                />  
                <DatePicker 
                    style={{width: 300}}
                    date={this.state.date} 
                    mode="date" 
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2020"
                    maxDate="01-01-2035"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                onDateChange={(date) => {this.setState({date: date})}}
                />

                <Button 
                  title="Add Task" 
                  onPress={this.handleSubmit}
              />

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: 'green',
    width: '100%',
    marginTop: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title:{
    fontSize:30,
  },
});