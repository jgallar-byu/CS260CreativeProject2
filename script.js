const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const resultsSection = document.querySelector('#results');
const typeButtons = document.querySelectorAll('.type');
let type = ''; /* movie or serie */
const APIKEY = 'aed62d04';
let APIURL = ''; 

form.addEventListener('submit', formSubmitted);

typeButtons.forEach(function(el){ /*List each item in the array */
	el.addEventListener('click',function(){
		type = this.id;
		input.placeholder = `Enter a ${type} title`;
		constructUrl(type)
		 typeButtons.forEach(function(el){ 
		 	el.classList.toggle('active');
		 })
	});
});

function constructUrl(type) {
	type = type;
	APIURL = `https://www.omdbapi.com/?type=${type}&apikey=${APIKEY}&x&s=`; /* type is movie or serie */
}

function formSubmitted(event) {
	event.preventDefault();
	const searchTerm = input.value;
	if(searchTerm == '') {
		input.classList.add('has-error');
	} else {
		input.classList.remove('has-error');
		constructUrl(type);
		getResults(searchTerm)
		.then(showResults);
	}
	
}

function getResults(searchTerm) {
	const url = `${APIURL}${searchTerm}`;
	console.log(url);
	return fetch(url)
		.then(response => response.json())
		.then(data => data.Search);
}

function showResults(results) {
	console.log(results);
	resultsSection.innerHtml = '';
	let html = '';
	results.forEach(type => {
		if(type.Poster == 'N/A' || type.Poster == null){
			type.Poster = 'noimage.png';
		}
		html += `
			<div class="results-item col-12 col-sm-6 col-md-4">
				<div class="card">
				  <img class="card-img-top" src="${type.Poster}" alt="${type.Title}">
				  <div class="card-body">
				    <h5 class="card-title">${type.Title}</h5>
				    <p class="card-text">${type.Year}</p>
				  </div>
				  <div class="card-footer">
					<a class="btn btn-block btn-info" target="_blank" href="http://imdb.com/title/${type.imdbID}">
						View on IMDB
					</a>
				  </div>
				</div>
			</div>
		`;
	});
	resultsSection.innerHTML = html;
}