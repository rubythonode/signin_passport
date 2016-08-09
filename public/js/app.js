var Signin = function() {

  // Background
  var handleBackground = function() {

    $.backstretch([
      "./img/bg/1.jpg",
      "./img/bg/2.jpg",
      "./img/bg/3.jpg",
      "./img/bg/4.jpg"
    ], {
      fade: 1000,
      duration: 8000
    });
  };

  // Form validation
	var handleValidation = function() {
    var $form = $('#signin-form');

    $form.on('click', '.btn', function(e) {
      e.preventDefault();
      $(this).validate();
      if ($(this).valid()) {
        $(this).submit();
      }
    });

    // Sets a custom email pattern for the built-in email validation rule
    $.validator.methods.email = function(value, element) {
      var regexr =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      // console.log(this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value ));
      return this.optional(element) || regexr.test(value);
    };

    $form.validate({
      errorElement: 'small', //default input error message container

      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 4,
          maxlength: 10
        }
      },

      messages: {
        email: {
          required: '이메일 주소를 입력해 주세요',
          email: '이메일 주소의 형식이 유효하지 않습니다'
        },
        password: {
          required: '패스워드를 입력해 주세요',
          minlength: '4자리 이상으로 입력해 주세요',
          maxlength: '10자리 이하로 입력해 주세요'
        }
      },

      submitHandler: function(form, event) {
        event.preventDefault();

        // form validation success, call ajax form submit
        $.ajax({
            method: "POST",
            url: "/signin",
            data: $form.serialize()
        })
          .done(function(data) {

            if(data === 'sign_success'){
              //alert( "success" + data);
              window.location.replace('/welcome');
            } else {
              //alert( "failure" + data);
              $("#alert").text(data).show();
            }
          })
          .fail(function(err) {
            console.log('Signin failed: ', err);
          })
      }
    });
	};

	return {
		//main function to initiate the module
		init: function() {
      handleBackground();
      handleValidation();
		}
	};
}();

$(function(){
	Signin.init();
});