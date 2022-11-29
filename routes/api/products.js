const router = require('express').Router();


const Product = require('../../models/product.model');


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

// GET /api/products/available

router.get('/available', async (req, res) => {
    try {
        const products = await Product.find({ available: true });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// GET /api/products/CATEGORY

router.get('/cat/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

// Get /api/products/min/PRICE

router.get('/min/:price', async (req, res) => {
    try {
        const products = await Product.find({
            price: { $gt: req.params.price }
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// GET /api/products/min/:min/max/:max
// GET /api/products/min/30/max/300


router.get('/min/:min/max/:max', async (req, res) => {
    try {
        const { min, max } = req.params;
        const products = await Product.find({
            price: { $gt: min, $lt: max }
        });
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})


// GET /api/products/stock/:stock
// Recuperamos todos los productos con stock mayor al número que pasamos a través de la URL y que estén disponibles
router.get('/stock/:stock', async (req, res) => {
    try {
        const { stock } = req.params
        const products = await Product.find({
            stock: { $gt: stock },
            available: true
        });
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

// GET /api/products/PRODUCTID
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});



router.post('/', async (req, res) => {
    try {
        const createdProduct = await Product.create(req.body)
        res.json(createdProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const p = await Product.findByIdAndDelete(productId);
        res.json(p);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


module.exports = router;