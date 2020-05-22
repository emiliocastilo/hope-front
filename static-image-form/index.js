let filesToSend = [];

const loadFile = (event) => {
	let output = document.getElementById('img-container');
	output.innerHTML = '';
	filesToSend = event.target.files;
	
	if(checkImages(event)) {
		const files = event.target.files;

		Object.keys(files).map(key => {

			const imgTag = document.createElement('img');
			imgTag.className = "img-thumbnail col-3";
			imgTag.src =  URL.createObjectURL(files[key]);
			output = document.getElementById('img-container');
			output.appendChild(imgTag);

		});
	}
}

const checkImages = (event) => {
	let pass = false;
	if(event && event.target){
		if(event.target.files.length) {
			pass = true;
		}
	}
	return pass; 
}

const showMessage = (message) => {
	if(message) {
		const error = document.getElementsByClassName('invalid-feedback');
		error[0].style.display = 'block';

		const success = document.getElementsByClassName('valid-feedback');
		success[0].style.display = 'none';
	}else {
		const error = document.getElementsByClassName('valid-feedback');
		error[0].style.display = 'block';

		const success = document.getElementsByClassName('invalid-feedback');
		success[0].style.display = 'none';
	}
}

const submitImage = (event) => {
	event.preventDefault();
	
	if(filesToSend.length) {
		postImage(filesToSend);
	}else {
		showMessage(true);
	}
	return false;
}

const postImage = (data) => {
	console.log(data);
		
	const token = 'token';
	const server = 'http://localhost/service';
	
	const myHeaders = new Headers();
	myHeaders.append('Authorization', token);
	
	const formdata = new FormData();

	Object.keys(data).map((key) => {
		formdata.append(
			`image_${key}`,
			data[key],
			data[key].name
		);
	});
	
	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
	};
	showMessage(false);

	fetch(server, requestOptions)
	.then(response => response.json())
  .then(data => {
		console.log(data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});

}