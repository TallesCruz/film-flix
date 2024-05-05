import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';

import './filme-info.css'

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [filme, setFilme] = useState({});
    const [loading, setloading] = useState((true));

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}` , {
                params:{
                    api_key: "11aca78c959d2540f39976314bba66e6",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setloading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigate("/", { replace : true});
                return; 
            })
        };
        loadFilme();

        return() =>{
            console.log("Compoenente fopi desmontado")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@filmflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id  === filme.id)

        if(hasFilme){
            toast.warn("Esse Filme já está salvo");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@filmflix", JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo com Sucesso!")
    }
    if(loading){
        
      return(
        <div className="filme-info">
            <h1>Carregando Detalhes...</h1>
        </div>
      )}

      return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3> Sinopse </h3>
            <span>{filme.overview}</span>

            <strong> Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
        )  
    }
    

export default Filme;