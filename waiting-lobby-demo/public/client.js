$(function() {

    let userName;
    const socket = io();

    // Get the window
    const $window = $(window);
    // Get the user name
    const $userNameInput = $('.userNameInput');
    const $loginResult = $('.loginResult');

    /** Set the client's name and send it to server */
    const setUserName = () => {
      userName = $userNameInput.val();

      console.log('new user with name ' + userName);

      // TODO: check the validity?
      socket.emit('add user', userName);
    }

    /**
     * Update the login result box
     * @param: data: the data transfered from server
     */
    const updateLoginResult = (data) => {
      if (data.result == false) {
        $loginResult.text('Waiting for pairing');
      } else {
        $loginResult.text('You\'ve paired with ' + data.userName);
      }
    };

    // Listen on keydown event
    $window.keydown(event => {
      // If the user inputs an ENTER
      if (event.which === 13) {
        setUserName();
      }
    });

    // Listen on pairing event
    socket.on('paired', (data) => {
      updateLoginResult(data);
    });
});