import React,{useState,useEffect} from 'react'
import BasicCard from './BasicCard'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function PaginationComponent(){
    const paginationNumber = 5
    const [filter, setFilter] = useState('')
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [index, setIndex] = useState({
        start : 0,
        end : paginationNumber
    })

    const filteredData = data.filter(item => item.Name.toLowerCase().includes(filter.toLowerCase()))

    const getPaginationCount = () =>{
        let division = filteredData.length / paginationNumber
        let aux = Math.floor(division)

        if (filteredData.length % paginationNumber !== 0){
            aux = aux + 1
        }
        setCount(aux)
        // init page
        setPage(1)
        setIndex({
            ...index,
            start: ((1 * paginationNumber) - paginationNumber),
            end: (1 * paginationNumber)
        })
    }

    useEffect(()=>{
        getPaginationCount()
        //eslint-disable-next-line
    },[data])

    const handleChange = (event, value) => {
        setPage(value)
        setIndex({
            ...index,
            start: ((value * paginationNumber) - paginationNumber), // example: (2 *5 - 5) = start in index 5
            end: (value * paginationNumber), // example: 2 *5  = end in index 10
        })
    }

    const onClickButton = () =>{
        setData([
            ...data,{
                Id : 1,
                Name : `Name ${count}`,
                Age : 18
            }
        ])
    }

    const handleChangeText = (evt) =>{
        const {value} = evt.target
        setFilter(value)
    }

    return (
        <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" style={{margin:'auto'}} onClick={onClickButton}>Contained</Button>
            </Stack>
            <TextField style={{marginTop:'10px'}} label="Outlined secondary" color="secondary" onChange={handleChangeText}  focused />
            {
                filteredData.slice(index.start, index.end).map((datax, i) =>(
                    <BasicCard key={i} id={datax.Id} name={datax.Name} age={datax.Age} />
                ))
            }
            <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination count={count} page={page} onChange={handleChange} />
            </Stack>
        </div>
    );
}