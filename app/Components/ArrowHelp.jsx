import styled from 'styled-components';
import styles from '../../styles/Library.module.css';

const ArrowHelp = ({ number }) => {
    let output = [];

    for (let i = 0; i < number; i++) {
        output.push(
            <Arrowsvg width="32" height="50" xmlns="http://www.w3.org/2000/svg" $index={i} key={i} className='arrow-svg'>
                <g>
                    <title>Layer 1</title>
                    <path fill="none" strokeWidth="2" d="m19.18095,25.50001l-16.68095,-23.00001l10.98572,0l16.68095,23.00001l-16.68095,22.99999l-10.98572,0l16.68095,-22.99999z" id="svg_5" />
                </g>
            </Arrowsvg>
        )
    }

    return (
        output.map(element => element)
    )
}

export default ArrowHelp;

const Arrowsvg = styled.svg`
    stroke: white;   
    animation: arrow-flash 1s ease-in-out ${props => props.$index*0.1}s infinite;



    @keyframes arrow-flash {
        0%{
            filter: drop-shadow( 3px 3px 2px rgba(250, 250, 250, 1));
        }

        50%{
            filter: drop-shadow( 3px 3px 2px rgba(250, 250, 250, 0));
        }
        100%{
            filter: drop-shadow( 3px 3px 2px rgba(250, 250, 250, 1));
        }
        
    }
`