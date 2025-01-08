const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-submit-button');


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTag = searchInput.value;
    console.log('Search form submitted');
    window.location.href = `/search/${searchTag}`;
});

searchInput.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
});
