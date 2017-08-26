var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var TextMsg = React.createClass({

    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';
       
        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'}/>
                <p className={this.props.className}>{this.props.nickname} {this.props.time}</p>
                <div className="clearfix">
                    <div className='webim-msg-value'>
                        <span className='webim-msg-icon font'>{icon}</span>
                        <pre dangerouslySetInnerHTML={{__html: this.props.value}}></pre>
                    </div>
                    <div className={"webim-msg-error " + (this.props.error ? ' ' : 'hide')}>
                        <span className='webim-file-icon font smaller red' title={this.props.errorText}>k</span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = function (options, sentByMe) {
    var props = {
        src: options.avatar || 'demo/images/default.png',
        time: options.time || new Date().toLocaleString(),
        value: options.value || '',
        name: options.name,
        nickname:options.nickname,
        error: options.error,
        errorText: options.errorText
    };

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
   console.log(options.before);
   if (options.before)
       options.wrapper.insertBefore(node,options.wrapper.childNodes[1]);  
   else
       options.wrapper.appendChild(node); 

    return ReactDOM.render(
        <TextMsg {...props} className={sentByMe ? 'right' : 'left'}/>,
        node
    );
};
