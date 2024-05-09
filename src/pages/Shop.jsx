import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Header from '../components/Header'
import '../assets/styles/shop.css'
import SingleProduct from '../components/SingleProduct'
import axios from 'axios';
import Loading from '../components/Loading';



const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const Shop = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_KEY}/product/getProducts`).then(res => {
            const revData = res.data.reverse()
            setProducts(revData)
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
        })
    }, [])

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 12;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / 12);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 12) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    return (
        <div className='shop'>
            <Header />
            {
                isLoading &&
                <Loading />
            }
            <section className="shopProducts">
                <div className="container">
                    <div className="shopHeading">
                        <h3>Showing 1–12 of 87 results</h3>
                        <select>
                            <option value="all">All</option>
                            <option value="panjabi">Panjabi</option>
                            <option value="t-shirt">T-shirt</option>
                            <option value="pant">Pant</option>
                        </select>
                    </div>
                    <div className="productWrap">
                        {
                            currentItems.map((val, i) => {
                                return <SingleProduct data={val} key={i} />
                            })
                        }
                    </div>
                </div>
            </section>

            <section className="paginationWrap">
                <div className="container">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </section>
        </div>
    )
}

export default Shop