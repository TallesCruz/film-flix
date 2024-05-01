
import{ useEffect, useState } from 'react';
import api from '../../services/api';

function Home(){
    const [ filmes, setFilmes] = useState([]);

    useEffect(()=>{
    
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
            params:{
                api_key: "11aca78c959d2540f39976314bba66e6",
                language: "pt-BR",
                page: 1,
            }
        })
        //console.log(response.data.results.slice(0,10));
        setFilmes(response.data.results.slice(0, 10))
    }

        loadFilmes();

    }, [])

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map(filme) => {
                    return(
                        <article>
                            <strong>
                                {filme.tilte}
                            </strong>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;