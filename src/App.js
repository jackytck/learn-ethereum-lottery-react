import './App.css'

import React, { Component } from 'react'

import lottery from './lottery'
import web3 from './web3'

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: ''
  }

  async componentDidMount () {
    const [manager, players, balance] = await Promise.all([
      lottery.methods.manager().call(),
      lottery.methods.getPlayers().call(),
      web3.eth.getBalance(lottery.options.address)
    ])

    this.setState({
      manager,
      players,
      balance
    })
  }

  render () {
    const { manager, players, balance } = this.state

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {manager}.
          There are currently {players.length} people entered,
          copmeting to win {web3.utils.fromWei(balance, 'ether')} Ether!
        </p>
      </div>
    )
  }
}

export default App
