import React from 'react';
import { StyleSheet } from 'react-native';
import Header from "./components/Header";

export default class App extends React.Component {
  render() {
    return (
      <Header title={''} img={require('./assets/icons/solar-panel-voltage.png')}/>
    );
  }
}

const styles = StyleSheet.create({
});
