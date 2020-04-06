import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

const ANIMATION_SPEED = 500;

class Visualizer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newSize: 15,
            array: [],
            sorted: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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
                        <Nav.Link onClick={() => this.insertionSort()}>Insertion</Nav.Link>
                        <Nav.Link onClick={() => this.selectionSort()}>Selection</Nav.Link>
                        <Nav.Link>Bubble</Nav.Link>
                        <Nav.Link>Shell</Nav.Link>
                        <Nav.Link>Merge</Nav.Link>
                        <Nav.Link>Heap</Nav.Link>
                        <Nav.Link>Quick</Nav.Link>
                    </Nav>
                    <Form inline onSubmit={e => { e.preventDefault(); this.generateArray() }}>
                        <FormControl type="number" placeholder="Size of list" className="mr-sm-2" onChange={this.handleChange} max="35" min="5" style={{ width: '125px' }} />
                        <Button variant="outline-info" onClick={() => this.generateArray(this.state.newSize)}>Randomize</Button>
                    </Form>
                </Navbar>
                {this.state.array}
            </React.Fragment>
        )
    }

    generateArray() {
        const size = parseInt(this.state.newSize);
        const newArray = []
        const subtractWidth = ((size + 1) * 10) / size;

        for (let i = 0; i < size; i++) {
            const height = Math.floor(Math.random() * 88) + 10
            newArray.push(
                <div key={i} id={i} className="bar" value={height} style={{
                    width: `calc(${100 / size}% - ${subtractWidth}px)`,
                    height: `calc(${height}% - ${this.nav.clientHeight}px`,
                    bottom: `10px`,
                    position: 'absolute',
                    left: `calc((${100 / size}% - ${subtractWidth}px) * ${i} + ${i + 1} * 10px)`,
                }} >
                    <span className="value">{height}</span>
                </div>)
        }

        this.setState({ array: newArray, sorted: false })

        return false;
    }

    insertionSort() {
        if (this.state.sorted) {
            return;
        }

        let nums = [];
        this.state.array.forEach(element => nums.push(parseInt(element.props.value)));
        console.log(nums)

        for (let i = 1; i < nums.length; i++) {
            let j = i - 1;
            let temp = nums[i];
            setTimeout(() => {
                document.getElementById(i).style.backgroundColor = 'red';
                if (i - 1 >= 0) {
                    document.getElementById(i - 1).style.backgroundColor = 'rgb(40, 40, 40)';
                }
                while (j >= 0 && nums[j] > temp) {
                    const tempLeft = document.getElementById(j + 1).style.left
                    document.getElementById(j + 1).style.left = document.getElementById(j).style.left;
                    document.getElementById(j).style.left = tempLeft;

                    nums[j + 1] = nums[j];
                    j--;
                }
                const tempLeft = document.getElementById(j + 1).style.left;
                document.getElementById(j + 1).style.left = document.getElementById(i).style.left;
                document.getElementById(i).style.left = tempLeft;
                nums[j + 1] = temp;
            }, i * ANIMATION_SPEED);
        }

        this.setState({ sorted: true })

    }

    selectionSort() {
        if (this.state.sorted) {
            return;
        }

        let nums = [];
        this.state.array.forEach(element => nums.push(parseInt(element.props.value)));

        let len = nums.length;
        let animationCounter = 0;
        for (let i = 0; i < len; i++) {
            let min = i;

            animationCounter++;
            setTimeout(() => {
                document.getElementById(i).style.backgroundColor = 'turquoise';
                document.getElementById(len - 1).style.backgroundColor = 'rgb(40, 40, 40)';
                if (i - 1 >= 0) {
                    document.getElementById(i - 1).style.backgroundColor = 'rgb(40, 40, 40)';
                }
            }, ANIMATION_SPEED * animationCounter);

            for (let j = i + 1; j < len; j++) {
                if (nums[min] > nums[j]) {
                    min = j;

                    animationCounter++;
                    setTimeout(() => {
                        document.getElementById(j).style.backgroundColor = 'red';
                        document.getElementById(j - 1).style.backgroundColor = 'rgb(40, 40, 40)';
                        document.getElementById(i).style.backgroundColor = 'rgb(40, 40, 40)';
                    }, ANIMATION_SPEED * animationCounter);
                } else {
                    animationCounter++;
                    setTimeout(() => {
                        document.getElementById(j).style.backgroundColor = 'turquoise';
                        document.getElementById(j - 1).style.backgroundColor = 'rgb(40, 40, 40)';
                    }, ANIMATION_SPEED * animationCounter);
                }
            }
            if (min !== i) {
                animationCounter++;
                setTimeout(() => {
                    const tempLeft = document.getElementById(i).style.left
                    document.getElementById(i).style.left = document.getElementById(min).style.left;
                    document.getElementById(min).style.left = tempLeft;

                    document.getElementById(i).id = -1;
                    document.getElementById(min).id = i;
                    document.getElementById(-1).id = min;
                }, ANIMATION_SPEED * animationCounter);

                let tmp = nums[i];
                nums[i] = nums[min];
                nums[min] = tmp;
            }
        }

        this.setState({ sorted: true })
    }
}

export default Visualizer;