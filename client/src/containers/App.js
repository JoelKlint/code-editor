import React, { Component } from 'react'
import audio_compile_src from '../assets/audio/airhorn.mp3'

import '../styles/App.css'

import TopBar from '../components/TopBar'
import Drawer from '../components/Drawer'
import OutputArea from '../components/OutputArea'
import Editor from '../components/Editor'

import * as viewActions from '../actions/viewActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {
  constructor () {
    super()
    this.onChange = this.onChange.bind(this)
    this.onPressRun = this.onPressRun.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.finishedBeer = this.finishedBeer.bind(this)
    this.onFontChange = this.onFontChange.bind(this)

    this.state = {
      drawerOpen: false,
      tab: 2,
      font: 28
    }
  }

  onChange (newValue) {
    this.props.saveCode(newValue, this.props.lang)
  }

  onFontChange (newValue) {
    console.log(newValue)
    this.setState({font: newValue})
  }

  toggleDrawer () {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  onPressRun () {
    // Play compiling sound on compile request
    new Audio(audio_compile_src).play()
    this.props.compile(this.props.code[this.props.lang], this.props.lang, this.props.token)
  }

  async finishedBeer () {
    let res = await fetch(`/api/finishedbeer/${this.props.token}`)
    res = await res.json()
    console.log(res)
  }

  onCheck (which, checked) {
    switch (which) {
      case 'autocomplete':
        return this.props.toggleAutocomplete(checked)
      case 'liveAutocomplete':
        return this.props.toggleLiveAutocomplete(checked)
      case 'vim':
        return this.props.toggleVim(checked)
      default: 
        return null
    }
  }

  render() {
    return (
      <div className="App">
        <TopBar
          leftIconClick={this.toggleDrawer}
          onPressRun={this.onPressRun}
          loading={this.props.compiling}
          title={this.props.name}
        />
        <Drawer
          open={this.state.drawerOpen}
          toggle={this.toggleDrawer}
          lang={this.props.lang}
          setLang={this.props.changeLang}
          onCheck={this.onCheck}
          onFontChange={this.onFontChange}
          onIndentChange={this.onIndentChange}
          fontSize={this.state.font}
          tabSize={this.state.tab}
          autocomplete={this.props.autocomplete}
          liveAutocomplete={this.props.liveAutocomplete}
          vim={this.props.vim}
          finishedBeer={() => this.finishedBeer(this.props.token)}
          clearLocalStorage={() => { localStorage.clear(); window.location.reload(); }}
        />
        <div className="leftDiv">
          <Editor
            onChange={this.onChange}
            code={this.props.code[this.props.lang]}
            fontSize={this.state.font}
            tabSize={this.state.tab}
            lang={this.props.lang}
            autocomplete={this.props.autocomplete}
            liveAutocomplete={this.props.liveAutocomplete}
            vim={this.props.vim}
          />
        </div>
        <div className="rightDiv">
          <OutputArea output={this.props.output} />
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    code: state.view.code,
    lang: state.view.lang,
    fontSize: state.view.fontSize,
    compiling: state.view.compiling,
    output: state.view.output,
    autocomplete: state.view.autocomplete,
    liveAutocomplete: state.view.liveAutocomplete,
    vim: state.view.vim,
    name: state.team.name,
    token: state.team.accessToken,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...viewActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
