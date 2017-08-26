var React = require("react");

module.exports = React.createClass({
    render: function () {
    	
        return (
            <div className={'chat-loading' + (this.props.show === 'show' ? '' : ' hide')}>
                <img src='demo/images/loading.gif'/>
            
            </div>
        );
    }
});
