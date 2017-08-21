const React = require('react');

class CategoryToggle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div class="checkbox">
      <input type="checkbox" id={`${this.props.category}-checkbox`} onClick={this.props.toggleCategory} defaultChecked={this.props.checked}></input>
      <label for={`${this.props.category}-checkbox`}>{`${this.props.category[0].toUpperCase()+this.props.category.slice(1)}`}</label>
    </div>
  )
  }
}

module.exports = CategoryToggle;
