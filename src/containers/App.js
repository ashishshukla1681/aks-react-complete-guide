import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside constructor', props.title);
        this.state = {
            persons: [
                {id: '12ab', name: 'Max', age: 20},
                {id: '15bc', name: 'Manu', age: 25},
                {id: '43ju', name: 'Jhon', age: 30}
            ]
        }
    }
    nameChangedHandler = (event, id) => {
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
    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()')
    }
    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()')
    }
    //No need below method in case PureComponent
    /* shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
        return nextState.persons !== this.state.persons ||
            nextState.showPersons !== this.state.showPersons;
    } */
    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
    }
    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate');
    }
    render() {
        console.log('[App.js] Inside render()')
        let persons = null;

        if(this.state.showPersons) {
            persons = <Persons 
                        persons={this.state.persons}
                        clicked={this.deletePersonsHandler}
                        changed={this.nameChangedHandler} />;
        }

        return (
              <WithClass classes={classes.App}>
                <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
                <Cockpit
                    appTitle={this.props.title}
                    persons={this.state.persons}
                    showPersons={this.state.showPersons}
                    clicked={this.togglePersonsHandler} />
                {persons}
              </WithClass>
        );
    }
}

export default App;