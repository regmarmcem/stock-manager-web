import { Inter, Short_Stack } from 'next/font/google'
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const StockPage: React.FC<StockPageProps> = ({ stock }) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50 ${inter.className}`}
    >
      <Head>
        <title>在庫管理システム</title>
      </Head>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ul className="space-y-4">
          <li className="pt-6 md:p-4 flex items-center bg-gray-200 rounded-xl shadow">
            <p className="text-lg font-medium">商品ID: {stock.id}
            <br/>
            商品名: {stock.name}</p>
          </li>
        </ul>
      </div>
    </main>
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