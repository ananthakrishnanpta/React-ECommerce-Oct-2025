import Carousel from "../components/Carousel/Carousel";
import ProductCard from "../components/ProductCard/ProductCard";

const fake_products = [
    {
        id : 1,
        title: "Yuhooo",
        img_src : "prod1.jpg",
        price: 2000
    },
    {
        id: 2,
        title: "Hehehe",
        img_src : "prod2.jpg",
        price : 3000
    },
    {
        id: 3,
        title: "Tarararara",
        img_src: "prod3.jpg",
        price : 4000
    }
]
const Home = () => {
    return(
        <>
        <Carousel />
        <section className="row row-cols-1 row-cols-md-2 g-4 my-3">
            {
                fake_products.map((prod) => {
                    return <ProductCard key = {prod.id} product = {prod}/>;
                })
            }
        </section>
        </>
    );
};

export default Home;

