import { useEffect, useState } from "react";

export function useImageSlider(imagenes, intervalo = 3000){
    const [indice, setIndice] = useState(0);

    useEffect(() =>{
        const intervalo = setInterval(() =>{
            setIndice((prev) =>(prev + 1)% imagenes.length);
        }, 3000
    );

        return () => clearInterval(intervalo);
    }, [imagenes, intervalo]);

    return imagenes[indice];
}