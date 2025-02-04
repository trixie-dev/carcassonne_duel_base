import React from 'react'
import styled from 'styled-components'

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 100px);
  grid-template-rows: repeat(7, 100px);
  gap: 2px;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 8px;
`

const Cell = styled.div`
  background-color: ${props => props.hasTile ? '#ecf0f1' : '#34495e'};
  border-radius: 4px;
  cursor: ${props => props.isValid ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isValid ? '#bdc3c7' : '#34495e'};
  }
`

function GameBoard() {
  // Створюємо порожню сітку 7x7
  const grid = Array(7).fill(null).map(() => Array(7).fill(null))

  return (
    <BoardContainer>
      {grid.map((row, i) => 
        row.map((cell, j) => (
          <Cell 
            key={`${i}-${j}`}
            hasTile={cell !== null}
            isValid={true} // Тут буде логіка перевірки можливості розміщення
          />
        ))
      )}
    </BoardContainer>
  )
}

export default GameBoard