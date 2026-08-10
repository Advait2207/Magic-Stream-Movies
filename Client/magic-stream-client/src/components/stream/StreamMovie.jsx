import { useParams } from 'react-router-dom';
import './StreamMovie.css';

const StreamMovie = () => {
    const { yt_id } = useParams();

    if (!yt_id) {
        return <h3>No trailer available.</h3>;
    }

    return (
        <div className="react-player-container">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${yt_id}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
};

export default StreamMovie;