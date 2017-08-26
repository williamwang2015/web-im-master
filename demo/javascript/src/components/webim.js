var React = require("react");
var SignIn = require('./sign/signin');
var SignUp = require('./sign/signup');
var Chat = require('./chat/chat');
var Loading = require('./common/loading');


module.exports = React.createClass({
    getInitialState: function () {
     //   console.log(WebIM.utils.getCookie());
        return {
            signIn: true,
            signUp: false,
            chat: false,
            loadingStatus: false,
            loadingMsg: ''
        };
    },
    componentWillMount:function(){
     // console.log(username);
      var cookies=WebIM.utils.getCookie();
      var encryptUsername = WebIM.utils.encrypt(username);
   //   console.log(cookies);
     /*  this.setState({
            signIn: false,
            signUp: false,
            chat: true
        });*/
     // console.log(cookies.get('webim_'+encryptUsername));
    },
    update: function (state) {
        this.setState({
            signIn: state.signIn,
            signUp: state.signUp,
            chat: state.chat,
            loadingStatus: state.loadingStatus,
            loadingMsg: state.loadingMsg,
            content: state.content,
            status: state.status
        });
    },

    loading: function (status, msg) {
        msg = msg || Demo.lan.loading;

        this.setState({loadingStatus: status, loadingMsg: msg});
      
    },

    render: function () {
        var props = {};

        props.rosterChange = this.props.rosterChange;
        props.groupChange = this.props.groupChange;
        props.chatroomChange = this.props.chatroomChange;

        var year = new Date().getFullYear();

        return (
            <div>
                <div className={'webim' + (WebIM.config.isWindowSDK ? ' webim_isWindowSDK' : '')}>
                   
                    <SignIn show={this.state.signIn} {...this.props} update={this.update} loading={this.loading}/>
                    <SignUp show={this.state.signUp} {...this.props} update={this.update} loading={this.loading}/>
                    <Chat show={this.state.chat} {...this.props} update={this.update}
                          loading={this.loading} {...props} />
                    <Loading show={this.state.loadingStatus} msg={this.state.loadingMsg}/>
                </div>
                <footer className={'copyright' + (WebIM.config.isWindowSDK ? ' hide' : '')}>© {year} 正心医疗</footer>
            </div>
        );
    }
});