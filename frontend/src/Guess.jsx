import react, {useState} from 'react';
import axios from 'axios';

const Guess = () => {
    const [name, setName] = useState('');
    const [result, setResult] = useState('');
    
    const onGuess = async () => {
        const url = 'http://localhost:3000/api/guess';
        const data =  {
            userId: 'my-id',
            name
          };
   
        const response = await axios.post(url, data);

        setResult(response.status.toString());
    };

    return (
        <>
            <div>Name:</div>
            <input type="text" value={name} onChange={(e => setName(e.target.value))}></input>
            <input type="submit" value="Submit" onClick={onGuess}></input>
            <div>Result: {result}</div>
        </>
    );
};

export default Guess;
