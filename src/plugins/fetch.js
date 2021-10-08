export default {
    install: (app) => {
        app.config.globalProperties.$getMovies = (options) => {
            return fetch('/.netlify/functions/movielist',{
                method: 'POST',
                body: JSON.stringify(options)
            }).then(res => res.json());
        }; 
    }
};