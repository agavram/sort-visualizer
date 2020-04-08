import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
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
            barMap: new Map(),
            sorted: false,
            navHeight: 0,
        };

        // Used to track when the user enters a different size
        this.sizeChange = this.sizeChange.bind(this);
    }

    sizeChange(event) {
        this.setState({ newSize: event.target.value });
    }

    componentDidMount() {
        const height = this.nav.clientHeight;
        this.setState({ navHeight: height });
        this.generateArray(15);
    }

    render() {
        const bars = this.state.barMap;
        const subtractWidth = ((bars.size + 1) * 10) / (bars.size);

        const mapIterator = (map, cb) => {
            const agg = [];
            for (let [key, value] of map) {
                agg.push(cb(value, key));
            }
            return agg;
        };

        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark" ref={(nav) => { this.nav = nav; }}>
                    <Navbar.Brand>Sort Visualizer</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => this.sort(insertionSort)}>Insertion</Nav.Link>
                        <Nav.Link onClick={() => this.sort(selectionSort)}>Selection</Nav.Link>
                        <Nav.Link onClick={() => this.sort(bubbleSort)}>Bubble</Nav.Link>
                        <Nav.Link onClick={() => this.sort(shellSort)}>Shell</Nav.Link>
                        {/* <Nav.Link onClick={() => this.sort(mergeSort) }>Merge</Nav.Link> */}
                        <Nav.Link onClick={() => this.sort(heapSort)}>Heap</Nav.Link>
                        <Nav.Link onClick={() => this.sort(quickSort)}>Quick</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={e => { e.preventDefault(); this.generateArray(); }}>
                        <FormControl type="number" placeholder="Size of list" className="mr-sm-2" onChange={this.sizeChange} max="35" min="5" style={{ width: '125px' }} />
                        <Button variant="outline-info" onClick={() => this.generateArray(this.state.newSize)}>Randomize</Button>
                    </Form>
                </Navbar>
                {mapIterator(bars, (value, key) => {
                    return <div key={value[1]} id={value[1]} className="bar" style={{
                        width: `calc(${100 / (bars.size)}% - ${subtractWidth}px)`,
                        height: `calc(${value[0]}% - ${this.state.navHeight}px`,
                        bottom: `10px`,
                        position: 'absolute',
                        left: `calc((${100 / (bars.size)}% - ${subtractWidth}px) * ${key} + ${key + 1} * 10px)`,
                    }} >
                        {/* Text inside the bar showing the height for the user to see */}
                        <span className="value">{value[0]}</span>
                    </div>;
                })}
            </React.Fragment>
        );
    }

    /**
     * Generates a random divArray based off the newSize
     */
    generateArray() {
        // The inputted size
        const size = parseInt(this.state.newSize);
        // This takes into account the margin of 10px
        const barMap = new Map();

        for (let i = 0; i < size; i++) {
            // Height is a random number from 10 to 97
            const height = Math.floor(Math.random() * 88) + 10;
            barMap.set(i, [height, i]);
        }

        this.setState({ barMap, sorted: false });
    }

    sort(algorithm) {
        let nums = this.getArray();
        if (this.state.sorted) {
            return;
        }
        this.setState({ sorted: true });

        let animationArray = algorithm(nums);
        let animationCounter = 0;

        for (let i = 0; i < animationArray.length; i++) {
            if (animationArray[i][0] !== animationArray[i][1]) {
                setTimeout(() => {
                    this.swapDivPositions(animationArray[i][0], animationArray[i][1]);
                }, ANIMATION_SPEED * animationCounter);
                animationCounter++;
            }
        }
    }

    getArray() {
        let nums = [];

        const bars = this.state.barMap;

        bars.forEach((value, _) => {
            nums.push(value[0])
        })

        return nums;
    }

    /**
     * Used to swap the positions of two elements
     * @param {*} id1 ID of first element
     * @param {*} id2  ID of second element
     */
    swapDivPositions(id1, id2) {
        const barMap = this.state.barMap;

        const id1Value = barMap.get(id1);
        const id2Value = barMap.get(id2);
        barMap.set(id1, id2Value);
        barMap.set(id2, id1Value);

        this.setState({ barMap })
    }
}

export default Visualizer;