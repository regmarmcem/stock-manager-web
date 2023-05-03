import { Inter, Short_Stack } from 'next/font/google'
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const StockPage: React.FC<StockPageProps> = ({ stock }) => {
  return (
    <div>
      <h1>{stock.id}</h1>
      <p>{stock.name}</p>
    </div>
  );
};

type Stock = {
  id: string
  name: string
}

type StockPageProps = {
  stock: Stock
}

export const getServerSideProps: GetServerSideProps<StockPageProps> = async (context) => {
  try {
    const host = 'localhost:8080';
    const protocol = 'http';
    const stock = await fetch(`${protocol}://${host}/stock/1`)
      .then(data => data.json());
        return {
          props: {
            stock,
          }
        };
  } catch (e) {
    console.log(e);
    return {
      props: {
          stock: [],
      }
    };
  }
}

export default StockPage