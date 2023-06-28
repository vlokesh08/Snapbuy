import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const userSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const productDetails = new mongoose.Schema({
  id: Number,
  ownerName: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  description: { type: String },
  category: { type: String },
  image: { data : Buffer, contentType : String },
  initialDateTime: {
    type: String,
    required: true,
  },
  finalDateTime: {
    type: String,
    required: true,
  },
});

const requestDetails = new mongoose.Schema({
  reqName: { type: String },
  reqTitle: { type: String },
  reqDescription: { type: String },
});

const Products = mongoose.model('Products', productDetails);
const Requests = mongoose.model('Requests', requestDetails);
const User = mongoose.model('User', userSchema);

// Sign-up endpoint
app.post('/api/signup', async (req, res) => {
  const { clientName, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({ clientName, email, phone, password });
    await user.save();

    res.json({ message: 'Sign up successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Sign up failed' });
  }
});

// Sign-in endpoint
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Sign-in failed' });
  }
});

app.post('/newrequest', async (req, res) => {
  const { reqName, reqTitle, reqDescription } = req.body;
  try {
    // Create a new instance of the Requests model
    const newRequest = new Requests({
      reqName: reqName,
      reqTitle: reqTitle,
      reqDescription: reqDescription,
    });
    console.log(reqName);
    // Save the request to the MongoDB database
    // await newRequest.save();
    res.send('Request saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving request');
  }
});


app.get('/api/items', async (req, res) => {
  Requests.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    });
});

// Protected route
app.get('/api/data', (req, res) => {
  // This route can only be accessed if a valid token is provided
  Products.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    });
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/data', upload.single('image'), async (req, res) => {
  const { ownerName, title, price, description } = req.body;
  const date = new Date();

  console.log(ownerName);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  const formattedDate = `${day}:${month}:${year}`;

  // console.log(formattedDate);
  // try {
    // Create a new instance of the Products model
    const newProduct = new Products({
      ownerName,
      title,
      price,
      description,
      image: {
        data: req.file.filename,
        contentType : "image/png"
      },
      initialDateTime : formattedDate,
      finalDateTime : formattedDate,
    });

    // Save the product to the MongoDB database
    await newProduct.save().then(console.log(newProduct));
    res.send('Product saved successfully');
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Error saving product');
  // }
});



app.get("/api/requests", (req,res)=>{

})



app.listen(5001, () => {
  console.log('The server is running on port 5001');
});
