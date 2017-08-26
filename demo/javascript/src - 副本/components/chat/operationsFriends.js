var React = require("react");
var ReactDOM = require('react-dom');
var textMsg = require('../message/txt');

var jq = require("jquery");

module.exports = React.createClass({

    getInitialState: function () {
        return {
            // the operations list whether show or not
            hide: true,
            pageIndex:1
        };
    },

    update: function () {
        this.setState({hide: !this.state.hide});
    },

    // hide when blur | bind focus event
    componentDidUpdate: function () {
        // !this.state.hide && ReactDOM.findDOMNode(this.refs['webim-operations']).focus();
    },

    // hide when blur close
    handleOnBlur: function () {
        this.setState({hide: true});
    },

    delFriend: function () {
        var value = this.props.name;

        if (!value) {
            return;
        }
        delete Demo.chatRecord[value];

        if (value == Demo.user || !Demo.roster[value]) {
            Demo.api.NotifyError(value + ' ' + Demo.lan.delFriendSelfInvalid);
            this.update();
            return;
        }
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"delFriend","to":"' + value + '"}',
                function success(str) {
                    alert(Demo.lan.contact_deleted);
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('delFriend:' + errCode);
                });
        } else {
            Demo.conn.removeRoster({
                to: value,
                success: function () {
                    if (Demo.roster[value]) {
                        delete Demo.roster[value];
                    }

                    Demo.conn.unsubscribed({
                        to: value
                    });
                },
                error: function () {
                }
            });
        }
        Demo.selected = '';
        this.props.delFriend();
        this.update();
    },

    addToBlackList: function (e) {
        var value = this.props.name;

        if (!value) {
            return;
        }

        var value = this.props.name;
        var me = this;

        //TODO by lwz 重构
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"addToBlackList", "username": "' + value + '"}',
                function success(str) {
                    var list = Demo.api.bBlacklist.add(value);
                    me.setState({blacklist: list});
                    Demo.api.updateRoster();
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('getRoster:' + errCode);
                });
        } else {
            var list = Demo.api.blacklist.add(value);

            Demo.conn.addToBlackList({
                list: list,
                type: 'jid',
                success: function () {
                    me.props.updateNode(null);
                },
                error: function () {
                }
            });
        }
    },
    
    historyList:function(e){
      // console.log('current user--'+this.props.name);
       // console.log('login user--'+Demo.user);
       var startTime='';
        if (Demo.chatRecord[this.props.name]){
            var msg=Demo.chatRecord[this.props.name].messages[0].message;
            console.log(msg.chatTime);
            startTime=msg.chatTime;
        }

       // console.log(this.props.chatId);
      
       this.props.loading('show');
       var me=this;
       jq.post('../chat/msgListJson.action?page='+this.state.pageIndex+'&rows=20',{
            doc:Demo.user,
            painter:this.props.name,
            start:startTime
       },function(result){
            var rows=result.rows;
            if (rows.length>0){
               var messages=[];
            for (var i=0;i<rows.length;i++){
                var row=rows[i].msg_content;
                var type=rows[i].body_type;
                var message={};
                 message.from=rows[i].chat_from;
                 message.type=rows[i].chat_type;
                 message.msg=rows[i].body_msg;
                 message.to=rows[i].chat_to;
                 message.url=rows[i].body_url;
                 message.filename=rows[i].filename;
                 message.length=rows[i].body_length;
                 message.timestamp=rows[i].timestamp;
                 Demo.api.appendMsg(message, type,true);
                
            }
            me.state.pageIndex++; 
            }else{
                alert('暂无聊天信息!');
            }
         me.props.loading('hide');
       })
      
       
    },

    render: function () {

        return (
            <div>
                <i ref='switch' className='webim-operations-icon font xsmaller' onClick={this.historyList} title='单击查看更多历史消息' >N</i>
               
            </div>
        );
    }
});
