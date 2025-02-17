document.addEventListener('DOMContentLoaded', () => {
    const userProfiles = document.getElementById('user-profiles');
    const movieList = document.getElementById('movie-list');
    const movieDetails = document.getElementById('movie-details');
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    const searchInput = document.getElementById('search-input');
    const backwardBtn = document.getElementById('backward-btn');
    const forwardBtn = document.getElementById('forward-btn');

    // Displaying user profiles 
    const users = [
        { id: 1, name: "Professor", avatar: "Netflix-Symbol.png" },
    ];

    users.forEach(user => {
        const userProfile = document.createElement('div');
        userProfile.className = 'user-profile';
        userProfile.innerHTML = `<img src="${user.avatar}" alt="${user.name}"><h3>${user.name}</h3>`;
        userProfiles.appendChild(userProfile);
    });

    // Fetching data from the local JSON file
    fetch('movies.json')
        .then(response => response.json())
        .then(movies => {
            displayMovies(movies);

            // Search functionality
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
                displayMovies(filteredMovies);
            });
        });

    function displayMovies(movies) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `<img src="${movie.thumbnail}" alt="${movie.title}"><h3>${movie.title}</h3>`;
            movieItem.addEventListener('click', () => showMovieDetails(movie));
            movieList.appendChild(movieItem);
        });
    }

    function showMovieDetails(movie) {
        movieDetails.style.transition = 'opacity 0.5s'; 
        movieDetails.style.opacity = 0; 

        setTimeout(() => {
            movieDetails.innerHTML = `<img src="${movie.thumbnail}" alt="${movie.title}"><h2>${movie.title}</h2><p>${movie.description}</p>`;
            movieDetails.style.opacity = 1; 
        }, 500);

        videoPlayer.style.transition = 'opacity 0.5s'; 
        videoPlayer.style.opacity = 0; 

        setTimeout(() => {
            video.src = movie.video;
            videoPlayer.style.display = 'block';
            videoPlayer.style.opacity = 1; 
        }, 500);
    }
});
