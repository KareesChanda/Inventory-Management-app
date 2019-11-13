import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {createMuiTheme} from "@material-ui/core/styles/index";
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        margin: theme.spacing(1)
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
    buttonClass: {
        color: 'white'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
});

const AddProduct = ({name, price, amount, onClick, onChangeName, onChangeAmount, onChangePrice}) => {

    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <h1>Add Product</h1>
            <form noValidate autoComplete="off">
                <TextField
                    id="product-name"
                    label="Product Name"
                    className={classes.textField}
                    autoComplete="off"
                    onChange={onChangeName}
                    margin="normal"
                    value={name}
                    variant="outlined"
                />
                <TextField
                    id="product-amount"
                    label="Amount"
                    onChange={onChangeAmount}
                    className={classes.numberField}
                    autoComplete="off"
                    value={amount}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="product-price"
                    label="Price"
                    className={classes.numberField}
                    autoComplete="off"
                    onChange={onChangePrice}
                    margin="normal"value={price}
                    variant="outlined"
                />
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className={classes.buttonClass} onClick={onClick}>
                        Add Product
                    </Button>
                </ThemeProvider>
            </form>
        </Paper>
    );
};

export default AddProduct;