import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { insertionSort } from '../sorting/Insertion';
import { selectionSort } from '../sorting/Selection';
import { bubbleSort } from '../sorting/Bubble';
import { shellSort } from '../sorting/Shell';
import { quickSort } from '../sorting/Quick';
import { heapSort } from '../sorting/Heap';
import { cocktail } from '../sorting/Cocktail';


// The animation speed in milliseconds which can be modified via a slider
let ANIMATION_SPEED = 350;

class Visualizer extends Component {

    constructor(props) {
        super(props);

        // Keep track of the array and if it is sorted
        this.state = {
            newSize: 15,
            barMap: new Map(),
            sorted: false,
            sorting: false,
            animationSpeed: 350,
            hideText: false
        };

        // Used to track when the user enters a different size
        this.animationSpeedChange = this.animationSpeedChange.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
    }

    sizeChange(event) {
        this.setState({ newSize: event.target.value });
    }

    animationSpeedChange(event) {
        this.setState({ animationSpeed: parseInt(event.target.value) });

        if (!this.state.sorting) {
            ANIMATION_SPEED = event.target.value;
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        this.generateArray(15);
    }

    resize() {
        this.setState({ hideText: window.innerWidth <= 900});
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
                <Navbar expand="xl" bg="dark" variant="dark">
                    <Navbar.Brand>Sort Visualizer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.sort(insertionSort)}><span className="sort-selection">Insertion</span></Nav.Link>
                            <Nav.Link onClick={() => this.sort(selectionSort)}><span className="sort-selection">Selection</span></Nav.Link>
                            <Nav.Link onClick={() => this.sort(bubbleSort)}><span className="sort-selection">Bubble</span></Nav.Link>
                            <Nav.Link onClick={() => this.sort(shellSort)}><span className="sort-selection">Shell</span></Nav.Link>
                            <Nav.Link onClick={() => this.sort(cocktail)}><span className="sort-selection">Cocktail</span></Nav.Link>
                            {/* <Nav.Link onClick={() => this.sort(mergeSort) }>Merge</Nav.Link> */}
                            <Nav.Link onClick={() => this.sort(heapSort)}><span className="sort-selection">Heap</span></Nav.Link>
                            <Nav.Link onClick={() => this.sort(quickSort)}><span className="sort-selection">Quick</span></Nav.Link>
                        </Nav>
                        <Form inline onSubmit={e => { e.preventDefault(); this.generateArray(); }}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Animation Speed: {this.state.animationSpeed}ms</Tooltip>}>
                                <input value={this.state.animationSpeed} onChange={this.animationSpeedChange} data-toggle="tooltip" title="Animation Speed" data-placement="bottom" type="range" className="custom-range mr-2" min="200" max="1000" step="5" />
                            </OverlayTrigger>
                            <FormControl type="number" placeholder="Size of list" className="mr-sm-2" onChange={this.sizeChange} max="35" min="5" style={{ width: '125px' }} />
                            <Button variant="outline-info" type="submit">Randomize</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {
                mapIterator(bars, (value, key) => {
                    return <div key={key} id={key} className="bar" style={{
                        width: `calc(${100 / (bars.size)}% - ${subtractWidth}px)`,
                        // height: `calc(${value[0]}% - ${this.nav.clientHeight}px`,
                        height: `calc(${value[0]}vh - 56px)`,
                        bottom: `10px`,
                        position: 'absolute',
                        left: `calc((${100 / (bars.size)}% - ${subtractWidth}px) * ${value[1]} + ${value[1] + 1} * 10px)`,
                        transition: `${this.state.animationSpeed / 1000}s`
                    }} >
                        {/* Text inside the bar showing the height for the user to see */}
                        <span hidden={this.state.hideText} className="value">{value[0]}</span>
                    </div>;
                })}
            </React.Fragment>
        );

    }

    /**
     * Generates a random divArray based off the newSize
     */
    generateArray() {
        if (this.state.sorting) {
            return;
        }

        // The inputted size
        let size = parseInt(this.state.newSize);
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
        if (this.state.sorted || this.state.sorting) {
            return;
        }
        this.setState({ sorted: true, sorting: true });

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

        setTimeout(() => {
            this.setState({ sorting: false });
        }, animationCounter * ANIMATION_SPEED);
    }

    getArray() {
        let nums = [];

        const bars = this.state.barMap;

        bars.forEach((value, _) => {
            nums.push(value[0]);
        });

        return nums;
    }

    /**
     * Used to swap the positions of two elements
     * @param {*} id1 ID of first element
     * @param {*} id2  ID of second element
     */
    swapDivPositions(id1, id2) {
        const barMap = this.state.barMap;
        let id1Value;
        let index1;
        let id2Value;
        let index2;
        barMap.forEach((value, key) => {
            if (value[1] === id1) {
                id1Value = value;
                index1 = key;
            } else if (value[1] === id2) {
                id2Value = value;
                index2 = key;
            }
        });

        const temp = id1Value[1];
        id1Value[1] = id2Value[1];
        id2Value[1] = temp;

        barMap.set(index1, id1Value);
        barMap.set(index2, id2Value);

        this.setState({ barMap });
    }
}

export default Visualizer;