import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    state = {
        persons: [
            {id: '12ab', name: 'Max', age: 20},
            {id: '15bc', name: 'Manu', age: 25},
            {id: '43ju', name: 'Jhon', age: 30}
        ]
    }

    nameChangedHandler = (event, id) => {
        //console.log('Was clicked!');
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        })

        const person = {
            ...this.state.persons[personIndex]
        }

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons});
    }
    
    deletePersonsHandler = (personIndex) => {
        //const persons = this.state.persons.slice;
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }
    
    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    render() {
        let persons = null;
        
        if(this.state.showPersons) {
            persons = <Persons 
                        persons={this.state.persons}
                        clicked={this.deletePersonsHandler}
                        changed={this.nameChangedHandler} />;
        }
        
        /*const rnd = Math.random();
        if(rnd > 0.7) {
            throw new Error('Something went wrong!!');
        }*/

        return (
              <div className="App">
                <Cockpit 
                    persons={this.state.persons}
                    showPersons={this.state.showPersons}
                    clicked={this.togglePersonsHandler} />
                {persons}
              </div>
        );
    }
}

export default App;
