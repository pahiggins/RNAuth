import React from 'react'
import { StatusBar } from 'react-native'
// import { Font } from 'expo';

import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import Tabs from '../auth/Tabs'
import Nav from '../nav/Nav'

class Main extends React.Component {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {
    // Font.loadAsync({
    //   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    // });
    StatusBar.setHidden(true)
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user.username) {
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <Nav />
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Main)