import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

const maxResult = 6;

export default function Home({ products }) {
  return (
    <>
      <main>
        <HeroBanner />
        <Wrapper>
          {/* Heading and paragraph start*/}
          <div className="text-center max-w-[50rem] mx-auto my-[3.125rem] md:my-[5rem]">
            <div className="text-[1.75rem] md:text-[2.125rem] mb-5 font-semibold leading-tight">
              Cushioning for Your Miles
            </div>

            <div className="text-md md:text-xl">
              A lightweight Sneaker which has midsole combined with increased
              stack heights to help provide cushioning during extended stretches
              of running.
            </div>
          </div>
          {/* Heading and paragraph end */}

          {/* Products grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0 max-w-[90rem]">
            {products?.data?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
          {/* Products grid start */}
        </Wrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromApi(
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return {
    props: { products },
  };
}
