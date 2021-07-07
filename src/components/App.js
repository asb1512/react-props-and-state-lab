import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

const BASE_URL = '/api/pets'
// const CAT_URL = BASE_URL + '?type=cat'
// const DOG_URL = BASE_URL + '?type=dog'
// const MICROPIG_URL = BASE_URL + '?type=micropig'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    let matchedPet = this.state.pets.find(e => e.id === id)
    matchedPet.isAdopted = true
  }

  // makeFetchCall = (url) => {
  //   fetch(url)
  //   .then(resp => resp.json())
  //   .then(json => console.log(json))
  // }


  fetchPets = () => {
    if (this.state.filters.type === 'all') {
      fetch(BASE_URL)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    } else {
      fetch(BASE_URL + '?type=' + this.state.filters.type)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App