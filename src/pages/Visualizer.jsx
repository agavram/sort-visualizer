import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { swapDivPositions, getArray } from '../utilities/Helpers';
import { insertionSort } from '../sorting/Insertion';
import { selectionSort } from '../sorting/Selection';
import { bubbleSort } from '../sorting/Bubble';
import { shellSort } from '../sorting/Shell';
import { quickSort } from '../sorting/Quick';
import { heapSort } from '../sorting/Heap';


// The animation speed in milliseconds which can be modified
// Must also be changed in the CSS file.
// In the future this will be configurable by the user
const ANIMATION_SPEED = 500;

class Visualizer extends Component {

    constructor(props) {
        super(props);

        // Keep track of the array and if it is sorted
        this.state = {
            newSize: 15,
            array: [],
            sorted: false,
        }

        // Used to track when the user enters a different size
        this.sizeChange = this.sizeChange.bind(this);
    }

    sizeChange(event) {
        this.setState({ newSize: event.target.value });
    }

    componentDidMount() {
        this.generateArray(15);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark" ref={(nav) => { this.nav = nav }}>
                    <Navbar.Brand>Sort Visualizer</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => this.sort(insertionSort)}>Insertion</Nav.Link>
                        <Nav.Link onClick={() => this.sort(selectionSort)}>Selection</Nav.Link>
                        <Nav.Link onClick={() => this.sort(bubbleSort)}>Bubble</Nav.Link>
                        <Nav.Link onClick={() => this.sort(shellSort)}>Shell</Nav.Link>
                        {/* <Nav.Link onClick={() => this.sort(mergeSort) }>Merge</Nav.Link> */}
                        <Nav.Link onClick={() => this.sort(heapSort) }>Heap</Nav.Link>
                        <Nav.Link onClick={() => this.sort(quickSort)}>Quick</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={e => { e.preventDefault(); this.generateArray() }}>
                        <FormControl type="number" placeholder="Size of list" className="mr-sm-2" onChange={this.sizeChange} max="35" min="5" style={{ width: '125px' }} />
                        <Button variant="outline-info" onClick={() => this.generateArray(this.state.newSize)}>Randomize</Button>
                    </Form>
                </Navbar>
                {this.state.array}
            </React.Fragment>
        )
    }

    /**
     * Generates a random array based off the newSize
     */
    generateArray() {
        // The inputted size
        const size = parseInt(this.state.newSize);
        const newArray = []
        // This takes into account the margin of 10px
        const subtractWidth = ((size + 1) * 10) / size;

        for (let i = 0; i < size; i++) {
            // Height is a random number from 10 to 97
            const height = Math.floor(Math.random() * 88) + 10
            newArray.push(
                <div key={i} id={i} location={i} className="bar" value={height} style={{
                    width: `calc(${100 / size}% - ${subtractWidth}px)`,
                    height: `calc(${height}% - ${this.nav.clientHeight}px`,
                    bottom: `10px`,
                    position: 'absolute',
                    left: `calc((${100 / size}% - ${subtractWidth}px) * ${i} + ${i + 1} * 10px)`,
                }} >
                    {/* Text inside the bar showing the height for the user to see */}
                    <span className="value">{height}</span>
                </div>)
        }

        let bars = document.getElementsByClassName('bar');

        this.setState({ array: newArray, sorted: false })

        // React doesn't seem to be setting the correct ID. This code is necessary for sorting to be animated properly
        if (newArray.length !== bars.length) {
            bars = document.getElementsByClassName('bar');
            for (let i = 0; i < bars.length; i++) {
                bars[i].id = bars[i].getAttribute('location');
            }
        }

    }

    sort(algorithm) {
        let nums = getArray();
        if (this.state.sorted) {
            return;
        }
        this.setState({ sorted: true });

        let animationArray = algorithm(nums);
        let animationCounter = 0;

        for (let i = 0; i < animationArray.length; i++) {
            if (animationArray[i][0] !== animationArray[i][1]) {
                setTimeout(() => {
                    swapDivPositions(animationArray[i][0], animationArray[i][1])
                }, ANIMATION_SPEED * animationCounter);
                animationCounter++;
            }
        }
    }
}

export default Visualizer;