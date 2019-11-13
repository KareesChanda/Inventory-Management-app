import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme, makeStyles} from "@material-ui/core/styles/index";
import {lightBlue, red} from "@material-ui/core/colors/index";
import { ThemeProvider } from '@material-ui/styles';
const config = require('../config');
let api = config.api;

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    'product-card': {
        padding: theme.spacing(2),
        float: 'left',
        width: '80%',
        cursor: 'pointer',
        "&:hover": {
            boxShadow: "0 0 1em #e0e0e0"
        }
    },
    productContents: {
        width: '100%'
    },
    'product-card-details': {
        marginTop: 7,
        float: 'right',
        textAlign: 'left'
    },
    productName: {
        float: 'left'
    },
    modalContents: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    numberField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: red
    },
});

const ProductList = ({ products, onDelete, onUpdate }) => {
    const [newName, setNewName] = React.useState();
    const [newAmount, setNewAmount] = React.useState();
    const [newPrice, setNewPrice] = React.useState();

    const token = localStorage.getItem("token");
    const updateProduct = (id) => {
        return fetch(`${api}/products/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                name: newName,
                amount: newAmount,
                price: newPrice
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    onUpdate();
                }
            })
    };
    const handleNewName = (e) => {
        setNewName(e.target.value);
    };
    const handleNewAmount = (e) => {
        setNewAmount(e.target.value);
    };
    const handleNewPrice = (e) => {
        setNewPrice(e.target.value);
    };

    return (
        <Box>
            {products ? (products.length > 0 ?
                products.map((product, index) => {
                    return <ProductCard
                        name={product.name}
                        amount={product.amount}
                        price={product.price}
                        id={product.id}
                        onUpdateName={handleNewName}
                        onUpdateAmount={handleNewAmount}
                        onUpdatePrice={handleNewPrice}
                        onDelete={onDelete}
                        onUpdate={updateProduct}
                    />
                }) : <h3> Inventory is currently empty </h3>) : <h3> No Products Found </h3> }
        </Box>
    );
};

const ProductCard = ({name, amount, price, id, onUpdateName, onUpdateAmount, onUpdatePrice, onUpdate, onDelete}) => {
    const classes= useStyles();
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        onUpdate(id);
        handleClose()
    }

    const handleDelete = () => {
        onDelete(id);
        handleClose()
    }
    return (
        <Box>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.modalContents}>
                    <h2>Update Product</h2>
                        <TextField
                            id="product-name"
                            label={"Current Name: " + name}
                            className={classes.textField}
                            autoComplete="off"
                            onChange={onUpdateName}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="product-amount"
                            label={"Current Amount: " + amount}
                            onChange={onUpdateAmount}
                            className={classes.numberField}
                            autoComplete="off"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="product-price"
                            label={"Current Price: " + price}
                            className={classes.numberField}
                            autoComplete="off"
                            onChange={onUpdatePrice}
                            margin="normal"
                            variant="outlined"
                        />
                    <br/>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" className={classes.buttonClass} onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.buttonClass} onClick={handleDelete}>
                                Delete
                            </Button>
                        </ThemeProvider>
                </div>
            </Modal>
            <Paper onClick={handleOpen} className={classes['product-card']}>
                <h4 className={classes.productName}>{name}</h4>
                <span className={classes['product-card-details']}>Amount: {amount} &nbsp; <br/>Price: ${price}</span>
            </Paper>
        </Box>
    );
};

export default ProductList;