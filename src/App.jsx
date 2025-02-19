import { useState, useEffect } from 'react';
import Tours from './Tours';
import Loading from './Loading';

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState(null);

    const removeTour = (id) => {
        let newTours = tours.filter((tour) => tour.id !== id);
        setTours(newTours);
    };

    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const tours = await response.json();
            setLoading(false);
            setTours(tours);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTours();
    }, []);

    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        );
    }

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>no tours left</h2>
                    <button className="btn" onClick={() => fetchTours()}>
                        refresh
                    </button>
                </div>
            </main>
        );
    }
    return (
        <main>
            <Tours tours={tours} removeTour={removeTour} />
        </main>
    );
};
export default App;
