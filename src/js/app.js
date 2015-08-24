import React from 'react/addons';
import Card from './component/card';

class App extends React.Component {

  render() {
    return(
      <div className="container">
        <h1>The Credit Card App</h1>
        <div className="wrapper">
            <Card/>
        </div>
      </div>
    )
  }
}


React.render(<App/>, document.getElementById('app'));
