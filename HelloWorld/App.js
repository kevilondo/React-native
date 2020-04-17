/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { isUserWhitespacable } from '@babel/types';

/*const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes Hello world</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};*/


type Props = {};
export default class HelloWorldApp extends Component <Props> {

constructor()
{
  super()
  this.state = {
    ResultText: "",
    answer: ""
  }

  this.operations = ['DEL', '+', '-', 'X', '/'];

}

calculateResult()
{
  const result = this.state.ResultText;
  const notAllowed = ['+', '-', '/', 'X'];
  const lastCharacter = result.slice(-1);

  if (notAllowed.indexOf(lastCharacter) > 0)
  {
    return
  }
  else
  {
    this.setState({
      answer: eval(result)
    })
  }
}

buttonPressed(text)
{
  if (text == '=')
  {
    return this.calculateResult();
  }

  else
  {
    this.setState({
      ResultText: this.state.ResultText + text
    })
  }
}

operate(operation)
{
  switch(operation)
  {
    case 'DEL':
      
      let text = this.state.ResultText.split('');
      text.pop()
      this.setState({
        ResultText: text.join('')
      })
      break

    case '+':
    case '-':
    case 'X':
    case '/':

      const lastCharacter = this.state.ResultText.split('').pop();

      if (this.operations.indexOf(lastCharacter) > 0) return

      if (this.state.ResultText == "") return

      this.setState({
        ResultText: this.state.ResultText + operation
      })
  }
}

clear()
{
  this.setState({
    ResultText: "",
    answer: ""
  })
}

  render() {

    let rows = [];
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.', 0, '=']];

    for (let i=0; i < 4; i++){
      let row = [];
      for (let j=0; j < 3; j++){
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.button}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>);
      }

      rows.push(<View key={i} style={styles.rows}>{row}</View>);
    }

    let ops = []; 
 
    for (let i = 0; i < 5; i++){
      ops.push(<View key={i} style={styles.btnOps}>
        <TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.button}>
        <Text style={styles.btnText}>{this.operations[i]}</Text>
      </TouchableOpacity></View> );
    }

    return (
      <View style={styles.container}>

        <View style={styles.displayOutput}>

        <View style={styles.calculations}>
            <Text style={styles.credits}> Made by Kevin ;-) </Text>
          </View>

          <View style={styles.calculations}>
            <Text style={styles.text}> {this.state.ResultText} </Text>
          </View>
          <View style={styles.results}>
            <Text style={styles.text}> {this.state.answer} </Text>
            <TouchableOpacity onPress={() => this.clear()} style={styles.button}>
              <Text style={[styles.btnText, styles.clearBtn]}> Clear </Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.buttonsContainer}>

          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  displayOutput: {
    flex:1,
  },

  calculations: {
    flex: 2,
    backgroundColor: 'white',
  },

  results: {
    flex:1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    
  },

  numbers: {
    flex: 2,
    backgroundColor: '#3c4042',
    flexWrap: 'wrap',    
    
  },

  text: {
    fontSize: 55, 
  },

  operations: {
    flex: 1,
    backgroundColor: '#5f6267',
    flexWrap: 'wrap',
  },

  rows: {
   flex: 1,
   flexDirection:'row',
   justifyContent: 'space-around',
   marginRight: '10%',
   marginTop: '5%',
  },

  btnText: {
    fontSize: 45,
    color: 'white',
  },

  button: {
    alignContent: 'stretch',
    alignSelf: 'stretch',
  },

  btnOps: {
    flex:1,
    justifyContent: 'space-between',
    marginLeft: '40%',
    marginTop: '10%',
  },

  clearBtn: {
    color: '#4286f5',
    fontSize: 45,
    
  },

  credits: {
    fontSize: 20
  },
})

//export default App;
