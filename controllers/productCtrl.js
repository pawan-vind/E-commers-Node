const { Product } = require("../Model/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

const uploadDir = "uploads";

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Export middleware
exports.uploadProductImages = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

exports.createProduct = async (req, res) => {
  try {
    console.log("Product creation initiated...");

    if (!req.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Normalize file paths
    const normalizePath = (file) => (file ? file.path.replace(/\\/g, "/") : null);

    const images = [
      normalizePath(req.files.image1?.[0]),
      normalizePath(req.files.image2?.[0]),
      normalizePath(req.files.image3?.[0]),
      normalizePath(req.files.image4?.[0]),
    ].filter(Boolean); // Remove null values

    const thumbnail = normalizePath(req.files.thumbnail?.[0]);

    // Validate at least one image exists
    if (images.length === 0 && !thumbnail) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Create product object
    const productData = {
      ...req.body,
      images,
      thumbnail,
    };

    // Save product to the database
    const product = new Product(productData);
    const doc = await product.save();
    res.status(201).json({ message: "Product created successfully", product: doc });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.fetchAllProducts = async (req, res) => {
  // filter = {"category:["smartphone", "laptops"]}
  // sort = {_sort:"price", _order:"desc"}
  // pagination = {_page:1, _limit:10}
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  } 

  let query = Product.find(condition);
  let totalProductQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductQuery = totalProductQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductQuery = totalProductQuery.find({ brand: req.query.brand });
  }
  //   TODO: get sorted from discounted price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductQuery.countDocuments().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
