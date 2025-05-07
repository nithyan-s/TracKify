require("dotenv").config();  
const express =require("express");
const app = express();
const port=8080;
const mongoose =require("mongoose");
const path=require("path");
const ejsmate=require("ejs-mate");

app.set("view engine","ejs");                                    // When The Response Is 'Rendered' default path to access.
app.set("views",path.join(__dirname,"/views"));               
app.use(express.static(path.join(__dirname,"/public")));         // Default middleware : for default paths.
app.use(express.urlencoded({extended:true}));                    // Default middleware : for get data sent from the request.
app.use(express.json());
app.engine("ejs",ejsmate);

const adminmodel=require("./models/admin");
const buyer=require("./models/buyer");
const product=require("./models/product");
const seller=require("./models/seller");
const warehouse=require("./models/warehouse");

const db= process.env.MONGO_URI;

main().then(()=>{                                                        // Since To Connect mongoDb To Backend (Server) is Asyncronous Process.                        
    console.log("DATA BASE CONNECTED SUCCESSFULLY..");               
})
.catch((err)=>{
    console.log(err);
})

async function main() {                                               // To Connect mongoDb To Backend (Server).
    
    await mongoose.connect(db);                                      // MongoDB URL.
}


app.listen(port,(req,res)=>{

    console.log("server Started..");
});

app.get("/",(req,res)=>{

    res.send("okkk");
});

app.get("/admin/getusers", async (req, res) => {

    try {
        const admins = await adminmodel.find({});
        const buyers = await buyer.find({});
        const sellers = await seller.find({});
        const warehouses = await warehouse.find({});
        const products = await product.find({});

        res.json({
            admins,
            buyers,
            sellers,
            warehouses,
            products
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching users from database" });
    }
});

app.post("/admin/:id/addseller", async (req, res) => {

    try {

        const { id: adminId } = req.params;
        const { name, contact, email, password } = req.body;

        // Basic validation
        if (!name || !contact || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if admin exists
        const admin = await adminmodel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Create a new seller with admin reference
        const newSeller = new seller({
            name,
            contact,
            email,
            password,
            createdBy: adminId
        });

        await newSeller.save();

        res.status(201).json({
            message: "Seller added successfully",
            seller: newSeller
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add seller" });
    }

});

app.post("/admin/:id/addwarehouse", async (req, res) => {
    try {
        const adminId = req.params.id;
        const { email, password, location, nextwarehouse, isLast } = req.body;

        // Validate required fields
        if (!email || !password || !location) {
            return res.status(400).json({ error: "Fields email, password, and location are required." });
        }

        // Optional: Verify if admin exists
        const adminExists = await adminmodel.findById(adminId);
        if (!adminExists) {
            return res.status(404).json({ error: "Admin not found." });
        }

        // Create warehouse
        const newWarehouse = new warehouse({
            email,
            password,
            location,
            nextwarehouse: nextwarehouse || null,
            isLast: isLast || false,
            createdBy: adminId
        });

        await newWarehouse.save();

        res.status(201).json({ message: "Warehouse created successfully", warehouse: newWarehouse });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create warehouse" });
    }
});



app.get("/admin/:id/notifications", async (req, res) => {
    try {
        const { id: adminId } = req.params;

        const adminData = await adminmodel.findById(adminId);

        if (!adminData) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.json({
            notifications: adminData.notifications || []
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});


app.post("/seller/:id/addprod", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, warehouseHash, buyerHash } = req.body;

        // Check if seller exists
        const foundSeller = await seller.findById(id);
        if (!foundSeller) {
            return res.status(404).json({ error: "Seller not found" });
        }

        // Create a new product
        const newProduct = new product({
            name,
            warehouseHash,
            buyerHash,
            sellerId: id
        });

        await newProduct.save();

        // Push product to seller's product list
        foundSeller.products.push(newProduct._id);
        await foundSeller.save();

        res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product" });
    }
});


app.get("/seller/:id/products", async (req, res) => {
    try {
        const { id } = req.params;

        const sellerWithProducts = await seller.findById(id).populate("products");

        if (!sellerWithProducts) {
            return res.status(404).json({ error: "Seller not found" });
        }

        res.json({
            sellerName: sellerWithProducts.name,
            products: sellerWithProducts.products
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch seller's products" });
    }
});

app.post("/seller/:id/deleteNotify", async (req, res) => {
    try {
        const sellerId = req.params.id;

        // Fetch seller data
        const sellerData = await seller.findById(sellerId);

        if (!sellerData) {
            return res.status(404).json({ error: "Seller not found" });
        }

        // Admin who created the seller
        const adminId = sellerData.createdBy;

        if (!adminId) {
            return res.status(400).json({ error: "This seller does not have a linked admin." });
        }

        // Push notification to admin with seller ID included
        await adminmodel.findByIdAndUpdate(adminId, {
            $push: {
                notifications: {
                    message: `Seller "${sellerData.name}" has requested deletion.`,
                    sellerId: sellerData._id // custom field added to help identify
                }
            }
        });

        res.status(200).json({ message: "Deletion request sent to admin." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while sending the deletion request." });
    }
});

app.post("/buyer/:buyerId/product/:productId/buy", async (req, res) => {

    try {
      const { buyerId, productId } = req.params;
      const { quantity = 1 } = req.body;
  
      const buyerData = await buyer.findById(buyerId);
      if (!buyerData) {
        return res.status(404).json({ error: "Buyer not found" });
      }
  
      const productData = await product.findById(productId);
      if (!productData) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      // Push order with product, quantity, firstWarehouse
      const order = {
        product: productId,
        quantity,
        status: "PLACED",
        orderDate: new Date(),
        firstWarehouse: productData.firstWarehouse
      };
  
      buyerData.orders.push(order);
  
      // Push notification
      buyerData.notifications.push({
        message: `Order placed for product "${productData.name}".`,
        timestamp: new Date()
      });
  
      await buyerData.save();
  
      res.status(201).json({
        message: "Order placed successfully",
        order
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to place order" });
    }

});

app.get("/buyer/products", async (req, res) => {
  try {
    const products = await product.find().populate("sellerId", "name email");
    
    res.status(200).json({
      message: "All available products",
      products
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});