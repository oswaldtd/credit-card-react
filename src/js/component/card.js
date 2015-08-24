import React from 'react/addons';


let defaultFormat = /(\d{1,4})/g;

let cards = [
  {
    type: 'mastercard',
    pattern: /^5[1-5]/,
    format: defaultFormat,
    lenght: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    lenght: [13],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    lenght: [15],
    cvcLength: [3, 4],
    luhn: true
  },
  {
    type: 'discover',
    pattern: /^60/,
    format: defaultFormat,
    lenght: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'maestro',
    pattern: /^5018/,
    format: defaultFormat,
    lenght: [12],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    lenght: [16],
    cvcLength: [3],
    luhn: false
  },
  {
    type: 'unionPay',
    pattern: /^62/,
    format: defaultFormat,
    lenght: [16],
    cvcLength: [3],
    luhn: false
  },
  {
    type: 'diners_club',
    pattern: /^5018/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3],
    luhn: true
  }
];

function cardFromNumber(num) {
  num = (num + "").replace(/D/g, "");
  for (var i = 0; i < cards.length; i++) {
    var n = cards[i];
    if(n.pattern.test(num))

    return n;
  }
}

class Card extends React.Component {
  constructor(props) {
  super(props);
  this.state =
    {
      cardNumber: '',
      cardType: ''
    };
  }

  render() {
    return (
      <div className="credit-card">
        <input
          type="number"
          onChange={(e)=> this.setCardNumber(e)}
          onKeyPress={(e)=> this.handleCardInput(e)}
          placeholder="xxxx xxxx xxxx xxxx" />
        {this.state.cardNumber && <p className="card-type">{this.state.cardType}</p>}
      </div>
    );
  }

  setCardNumber(e) {
    let targetVal = e.target.value;
    this.setState({cardNumber: targetVal});
  }

  handleCardInput(e) {
    let target = e.currentTarget,
      targetVal = target.value,
      charCode = String.fromCharCode(e.which),
      charCodeLen = (targetVal.replace(/\D/g, "") + charCode).length,
      card = cardFromNumber(targetVal + charCode),
      maxLength = 16;

      if (this.state.cardNumber.length >= 2)
        this.setState({cardType: card.type});

      if (card && (maxLength = card.length), !/^\d+$/.test(charCode) || charCodeLen > maxLength) {
        return void e.preventDefault();
      }

      var cardTest = card && "amex" === card.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/;

      return cardTest.test(targetVal) && target.selectionStart === targetVal.length ?
        (e.preventDefault(), void(target.value = targetVal + " " + charCode)) : void 0;
  }
}

export default Card;
