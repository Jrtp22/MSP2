import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';

class PokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            pageSize: this.props.perPage || 9,
            loading: false,
            hasMore: true,
            offset: 0,
            isInitialLoad: true, // Added a flag for initial load
        };
        this.loadingRef = React.createRef();
    }

    componentDidMount() {
        this.fetchData();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    fetchData() {
        if (this.state.loading || !this.state.hasMore) return;

        this.setState({ loading: true });

        const { pageSize, offset, isInitialLoad } = this.state;

        const nextOffset = offset + pageSize;

        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pageSize}`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                return null;
            })
            .then(async (json) => {
                if (!json || json.results.length === 0) {
                    this.setState({ hasMore: false });
                } else {
                    const newResources = json.results;

                    // Fetch details for each new Pokémon
                    const updatedResources = await Promise.all(
                        newResources.map(async (resource) => {
                            const details = await this.fetchPokemonDetails(resource.url);
                            return { ...resource, details };
                        })
                    );

                    this.setState((prevState) => ({
                        loading: false,
                        offset: nextOffset,
                        resources: isInitialLoad
                            ? updatedResources
                            : [...prevState.resources, ...updatedResources], // Append if not initial load
                        isInitialLoad: false, // Set the flag to false after initial load
                    }));
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            });
    }

    fetchPokemonDetails(url) {
        return fetch(url)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                return null;
            })
            .then((data) => data)
            .catch((error) => {
                console.error('Error fetching Pokémon details:', error);
                return null;
            });
    }

    handleScroll = () => {
        if (
            this.loadingRef.current &&
            window.innerHeight + window.scrollY >= this.loadingRef.current.offsetTop - 500 &&
            !this.state.loading &&
            this.state.hasMore
        ) {
            this.fetchData();
        }
    };

    render() {
        const { resources } = this.state;

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h4>Pokemon API</h4>
                    </div>
                </div>
                <div className="row" id="scrollRoot">
                    {resources.map((resource, key) => (
                        <div className={'py-3 animated fadeIn ' + (this.props.colSize ? this.props.colSize : 'col-md-4')} key={key}>
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        className="rounded-circle float-right"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${resource.details.id}.png`}
                                        alt={resource.name}
                                    />
                                    <h5>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                            {resource.name}
                                        </a>{' '}
                                        {resource.details.id}
                                    </h5>
                                    {resource.details ? (
                                        <div>
                                            <div>Weight: {resource.details.weight}</div>
                                            <div>Moves: {resource.details.moves.length}</div>
                                            <div>Abilities: {resource.details.abilities.length}</div>
                                            <div>
                                                Forms:{' '}
                                                {resource.details.forms.map((form, k) => (
                                                    <span key={k}>{form.name}, </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <span>Loading details...</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-12 mt-5 py-5 text-center" ref={this.loadingRef}>
                        {this.state.loading && <span>...loading...</span>}
                        {!this.state.hasMore && <span>No more Pokémon to load.</span>}
                    </div>
                </div>
            </div>
        );
    }
}

export default PokeList;
