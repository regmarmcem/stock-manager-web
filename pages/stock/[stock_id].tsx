import { Inter, Short_Stack } from 'next/font/google'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

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
    const { stock_id } = context.query;

    const host = 'localhost:8080';
    const protocol = 'http';
    const stock = await fetch(`${protocol}://${host}/stock/${stock_id}`)
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