import { useEffect, useState } from "react"


const usedebounce = (value , delay) =>{
    const [debouncevalue , setdebouncevalue] = useState(value)

    useEffect(() =>{
        const timer = setTimeout(() => {
            setdebouncevalue(value)
        }, delay);
        return () => clearTimeout(timer)
    } , [value , delay])

    return debouncevalue

}

export default usedebounce;

