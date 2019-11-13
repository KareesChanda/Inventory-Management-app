import React, {useEffect, useState} from 'react';
import ProductList from '../components/ProductList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddProduct from '../components/AddProduct';
import {makeStyles} from "@material-ui/core/styles/index";
const config = require('../config');
let api = config.api;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },
}));

const Dashboard = () => {
    const [products, setProducts] = React.useState([]);
    const token = localStorage.getItem("token");
    const getProductList = () => {
        return fetch(`${api}/products/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setProducts(data)
                }
            })
    };

    const deleteProduct = (id) => {
        return fetch(`${api}/products/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    getProductList()
                }
            })
    };

    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();

    const handleSetName = (e) => {
        setName(e.target.value);
    };
    const handleSetPrice = (e) => {
        setPrice(e.target.value);
    };
    const handleSetAmount = (e) => {
        setAmount(e.target.value);
    };
    const addProduct = () => {
        const token = localStorage.getItem("token");
        return fetch(`${api}/products/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                name: name,
                amount: amount,
                price: price
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setName('');
                    setAmount('');
                    setPrice('');
                    getProductList()
                }
            })
    };


    useEffect(()=> {
        getProductList()
    }, []);

    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Grid container row>
                <Grid item sm={6} xs={12}>
                    <AddProduct
                        amount={amount}
                        price={price}
                        name={name}
                        onChangeName={handleSetName}
                        onChangeAmount={handleSetAmount}
                        onChangePrice={handleSetPrice}
                        onClick={addProduct}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <ProductList products={products} onDelete={deleteProduct} onUpdate={getProductList}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;