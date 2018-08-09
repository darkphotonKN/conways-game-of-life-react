import React, { Component } from 'react';
import Box from './Box';

class MainGrid extends Component {

    // renders the base grid 
    renderGrid = () => {
        
        let outputGrid = [];
        let boxClass = '';

        for(let i = 0; i< this.props.rows; i++) {
            for(let j=0; j<this.props.cols; j++) {
                let boxId = i + '_' + j; // makes the box id

                // when grid index equates to truthy return 'box on' else 'box off'
                boxClass = this.props.grid[i][j] ? 'box on' : 'box off'; // box on / box off are css classes for the box component that colors the boxes according to whether it is 'alive' or 'dead'
                outputGrid.push(
                    <Box 
                        boxClass={boxClass}
                        key={boxId}
                        boxId={boxId}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }

        return outputGrid;
    }

    render() { 
        const width = (this.props.cols * 16);

        // testing 
        const { grid } = this.props;

        return ( 
            <div className="main-grid">
                <h2>Generation: {this.props.generation}</h2>
                {/* width style depends on a dynamic number hence an inline style */}
                <div className="grid" style={{ width: width }}>
                    {this.renderGrid()} {/* DOM displayed grid */}
                </div> 

            </div>
        );
    }
}
 
export default MainGrid;