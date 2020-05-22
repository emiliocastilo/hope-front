const loadFile = function(event) {
	const output = document.getElementById('img-container');
	output.innerHTML = '';
	if(checkImages(event)) {

		const files = event.target.files;

		Object.keys(files).map(key => {

			const imgTag = document.createElement('img');
			imgTag.className = "img-thumbnail col-3";
			imgTag.src =  URL.createObjectURL(files[key]);
			const output = document.getElementById('img-container');
			output.appendChild(imgTag);

		});
	}
}

const checkImages = function(event) {
	let pass = false;
	if(event && event.target){
		if(event.target.files.length) {
			pass = true;
		}
	}
	return pass; 
}

const showMessage = function(message) {
	// const message = getElementById('message');
	// if(message) {
	// 	message.innerHTML = 'Imagenes enviadas';
	// }else {
	// 	message.innerHTML = 'Error';
	// }
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();