const searchform = document.getElementById('search-form')

searchform.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchTag = document.getElementById('search-input')
    console.log('Form submitted')
});

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        const searchQuery = event.target.value;
        document.getElementById('search-submit-button').click()
    }
});
