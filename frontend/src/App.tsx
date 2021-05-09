import { useQuery } from 'react-query';

const itemList: Array<string> = [];
let list = '';

export type ProductType = {
  id: number;
  imageUrl: string;
  title: string;
  prices: Price[];
  url: string;
};

type Price = {
  amount: number;
  currency: string; // Currently SEK and EUR
};

const getProducts = async (): Promise<ProductType[]> => {
  let response = await fetch('http://localhost:8181/products');
  if (!response.ok) {
    throw new Error(`Cannot communicate with the mocked REST API server (${response.statusText})`);
  }
  return await response.json();
}

const App = () => {
  const { data, isLoading, error } = useQuery<ProductType[]>('products', getProducts);

  const getTotalItems = () => null;
  const handleAddToCart = () => null;
  const handleRemoveFromCart = () => null;

  if (error) {
    return (<div>OBS error occured</div>);
  }

  return (
    <div className="App">
     start
      <ul>
        {data && data.map(item => (<li key={item.id}>{item.title}</li>))}
      </ul>
    </div>
  );
}

export default App;
