const React = require('react');

class CategoryToggle extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
  clicked() {
    this.props.click(this.props.category);
  }
  render() {
    return (
    <div className="checkbox">
      <input type="checkbox" id={`${this.props.category}-checkbox`} onClick={this.clicked} defaultChecked={this.props.checked}></input>
      <label htmlFor={`${this.props.category}-checkbox`}>{`${this.props.category[0].toUpperCase()+this.props.category.slice(1)}`}</label>
    </div>
  )
  }
}

module.exports = CategoryToggle;
