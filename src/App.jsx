import React, { useState } from 'react'
import styled from 'styled-components'
import GameBoard from './components/GameBoard'
import TileStack from './components/TileStack'
import ScoreBoard from './components/ScoreBoard'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`

const GameContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [scores, setScores] = useState({ player1: 0, player2: 0 })

  return (
    <AppContainer>
      <h1>Каркасон Дуель</h1>
      <GameContainer>
        <TileStack />
        <GameBoard />
        <ScoreBoard 
          currentPlayer={currentPlayer}
          scores={scores}
        />
      </GameContainer>
    </AppContainer>
  )
}

export default App