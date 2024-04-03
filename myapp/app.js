const express = require('express');
const axios  = require('axios');
const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
  });
  

app.get('/', (req, res) => {
    res.send('Welcome to the Top Products Microservice!');
});

const products = [
    
        {
            "productName": "Laptop 1",
            "price": 2236,
            "rating": 4.7,
            "discount": 63,
            "availability": "yes"
        },
        {
            "productName": "Laptop 13",
            "price": 1244,
            "rating": 4.5,
            "discount": 45,
            "availability": "out-of-stock"
        },
        {
            "productName": "Laptop 3",
            "price": 9102,
            "rating": 4.44,
            "discount": 98,
            "availability": "out-of-stock"
        },
        {
            "productName": "Laptop 11",
            "price": 2652,
            "rating": 4.12,
            "discount": 70,
            "availability": "yes"
        },
        {
            "productName": "Laptop 4",
            "price": 1258,
            "rating": 3.8,
            "discount": 33,
            "availability": "yes"
        },
        {
            "productName": "Laptop 13",
            "price": 8686,
            "rating": 3.22,
            "discount": 24,
            "availability": "out-of-stock"
        },
        {
            "productName": "Laptop 14",
            "price": 9254,
            "rating": 3,
            "discount": 56,
            "availability": "yes"
        },
        {
            "productName": "Laptop 1",
            "price": 1059,
            "rating": 2.77,
            "discount": 21,
            "availability": "yes"
        },
        {
            "productName": "Laptop 10",
            "price": 7145,
            "rating": 2.74,
            "discount": 15,
            "availability": "yes"
        },
        {
            "productName": "Laptop 10",
            "price": 4101,
            "rating": 2.67,
            "discount": 37,
            "availability": "out-of-stock"
        }
    ];

    // get product function
    // Function to make a GET request to the e-commerce companies' APIs and return the product data
    async function getProductData(company, categoryname) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`;
    const headers = {
        'Authorization': 'Bearer eyJhbGci0iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMi0nsiZXhwIjoxNzEyMTUwMzk7LCJpYXQi0jE3MTIxNTAw0TcsImlzcyI6IkFmZm9yZG11ZCIsImp0aSI6ImQxZDhmMzh1LWI5NGQtNGFhZC04Yzg5LWY3YzE1M2M3NDBhYSIsInN1YiI6InNhMzc4N0Bzcm1pc3QuZWR1LmluIn0sImNvbXBhbn10YW11IjoiZ29NYXJ0IiwiY2xpZW50SUQi0iJkMWQ4ZjM4ZS1i0TRkLTRhYWQt0GM40S1mN2MXNTNjNzQwYWEiLCJjbG1lbnRTZWNrZXQi0iJCUVZacXhManprT01mTE5vIiwib3duZXJ0YW1]Ijoic3VyYWptYWhhcGF0cmEiLCJvd251ckVtYWlsIjoic2EzNzg3QHNybWlzdC5lZHUuaW4iLCJyb2xsTm8101JSQTIxMTEwMDMwMTA1MDkifQ.Pj91JVqC11MCI17txTUu©Cdb6TAE9-ROP96bbhZBySA'
    };
    const response = await axios.get(url, { headers });
    return response.data;
}

    
    // fetch product function
    async function fetchProducts(categoryname) {
        const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
        let products = [];
    
        for (let company of companies) {
            const data = await getProductData(company, categoryname);
            products = products.concat(data);
        }
    
        return products;
    }
    
    // Function to sort products based on the user's query parameters
    function sortProducts(products, sort) {
        const [field, order] = sort.split('_');
    
        products.sort((a, b) => {
            if (order === 'asc') {
                return a[field] - b[field];
            } else {
                return b[field] - a[field];
            }
        });
    
        return products;
    }
    
    app.get('/categories/:categoryname/products', async (req, res) => {
        const { categoryname } = req.params;
        const { n, page, sort } = req.query;
    
        try {
            // Fetch data from 5-ecommerce give 
            let products = await fetchProducts(categoryname);
    
            // Sort the data query
            products = sortProducts(products, sort);
    
            // If 'n' exceeds 10 - pagination
            const pageSize = Math.min(n, 10);
            const offset = (page - 1) * pageSize;
    
            const paginatedProducts = products.slice(offset, offset + pageSize);
    
            // Return - n 
            res.json(paginatedProducts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });
    
    app.listen(3000, () => console.log('Server is running on port 3000'));
    

    
  
1