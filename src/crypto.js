import React, {Component} from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import './crypto.css';

export default class Crypto extends Component {
    constructor() {
        super();
        this.state = {
            priceUsd: '',
            changePercent24Hr: '',
            symbol: '',
            name: ''
        }
    }

    componentDidMount() {
        this.getCryptoApi(this.props.cryptoId).then(data => this.setState({
            priceUsd: data.data.priceUsd,
            changePercent24Hr: data.data.changePercent24Hr,
            symbol: data.data.symbol,
            name: data.data.name
        }))
    }

    getCryptoApi(id) {
        return fetch(`https://api.coincap.io/v2/assets/${id}`).then(response =>
        response.json());
    }

    getChangeArrow(changePercent24Hr) {
        if(this.isChangePositive(changePercent24Hr)) {
            return <MdKeyboardArrowUp />;
        } else {
            return <MdKeyboardArrowDown />;
        }
    }

    isChangePositive(changePercent24Hr) {
        if (changePercent24Hr > 0) {
            return true;
        } else if (changePercent24Hr < 0) {
            return false;
        }
    }

    isRedOrBlue(isPos) {
        if (isPos) {
            return 'green';
        } else {
            return 'red';
        }
    }

    getTime() {
        var time = new Date();
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

    roundToDecimal(num, places) {
        var multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }

    render () {
        return (
            <div className='Crypto'>
                <div className='flex-inline'>
                    <div className={`symbol ${this.isRedOrBlue(this.isChangePositive(this.state.changePercent24Hr))}`}>{this.getChangeArrow(this.state.changePercent24Hr)}</div>
                    <div className='coin'>{this.state.symbol}/USD</div>
                </div>

                <div className='container'>
                    
                    <div className={`hr-change ${this.isRedOrBlue(this.isChangePositive(this.state.changePercent24Hr))}`}>{this.roundToDecimal(this.state.changePercent24Hr, 2)}%</div>
                    <div className='price'>${this.roundToDecimal(this.state.priceUsd, 2)}</div>
                    <div className='time'>{this.getTime()}</div>
                </div>
            </div>
            
        );
    }
}