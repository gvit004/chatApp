/**
 * Created by user on 5/11/15.
 */
angular.module('chat', []);

angular.module('chat').controller('chatController', chatController);

chatController.$inject = ['socket'];

function chatController(socket){
    var vm = this;
    vm.chatbox = [];
    vm.isSameSpeaker = isSameSpeaker;

    vm.send = function(msg){
        socket.emit('send:msg', { username:vm.username, message : [msg], date:new Date() });
    };

    socket.on('broadcast:msg', function(data){

        if( vm.chatbox.length != 0 && vm.chatbox[vm.chatbox.length-1].username == data.username){
            vm.chatbox[vm.chatbox.length-1].message.push(data.message[0]);
            vm.chatbox[vm.chatbox.length-1].date = data.date;
        } else {
            vm.chatbox.push(data);
        }

    });

    function isSameSpeaker(oldSpeaker, newSpeaker){
        return oldSpeaker.username == newSpeaker.username ? true : false;
    }
}