// Import necessary GraphQL modules and dependencies.
const graphql = require("graphql");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const bcrypt = require("bcrypt");

// Import data models for products and orders.
const Product = require("../models/products");
const Order = require("../models/orders");
const User = require("../models/users");

// Import GraphQL type definitions for products, orders, and users.
const ProductType = require("./TypeDefs/productType");
const OrderType = require("./TypeDefs/orderType");
const UserType = require("./TypeDefs/userType");

// Import authentication middleware.
const userAuth = require("../middlewares/auth");

// Define the root query type for the GraphQL schema.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // PRODUCTS QUERIES
    getAllProducts: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        try {
          // The 'resolve' function fetches and returns all products from the database.
          const products = await Product.find();
          console.log('Retrieved products:', products); // Debug log
          return products;
        } catch (error) {
          console.error('Error fetching products:', error);
          throw new Error('Failed to fetch products');
        }
      }
    },
    getProduct: {
      type: ProductType, // Define the type of data to be returned (a single product).
      args: { id: { type: GraphQLString } }, // Specify an input argument 'id'.
      async resolve(parent, args) {
        const product = await Product.findById(args.id);
        return product;
      }
    },

    // ORDERS QUERIES
    getAllOrders: {
      type: new GraphQLList(OrderType),
      async resolve(parent, args, req) {
        // The 'resolve' function fetches and returns a list of orders for a specific user, but only if the user is authenticated.
        if (!req.isAuth) {
          throw new Error("Unauthenticated");
        }
        const orders = await Order.find({ user: args.id });
        return orders;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // USER MUTATIONS
    createUser: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: graphql.GraphQLBoolean },
      },
      async resolve(parent, args) {
        const { username, email, password, isAdmin } = args;
        const newUser = new User({
          username, email, password, isAdmin
        });

        const user = await User.findOne({ email: newUser.email });
        if (user) {
          throw new Error("Already in db");
        }
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        const token = newUser.generateAuthToken();

        const data = {
          token,
          id: newUser._id,
          isAdmin: newUser.isAdmin
        };
        return JSON.stringify(data);
      }
    },
    loginUser: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("Not user with that email");
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        const token = user.generateAuthToken();

        const data = {
          token: token,
          userId: user.id,
          isAdmin: user.isAdmin,
        };
        return JSON.stringify(data);
      }
    },
    // logoutUser: {

    // },
    // PRODUCTS MUTATIONS
    createProduct: {
      type: ProductType,
      args: {
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        discountPercentage: { type: GraphQLFloat },
        images: { type: GraphQLString },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        rating: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        thumbnail: { type: GraphQLString },
        title: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, req) {
        try {
          // if (!req.isAuth) {
          //   throw new Error('Unauthenticated');
          // }
          // if (!req.user.isAdmin) {
          //   throw new Error('Unauthorized: Admin access required');
          // }

          const newProduct = new Product({
            title: args.title,
            brand: args.brand,
            category: args.category,
            description: args.description,
            discountPercentage: args.discountPercentage,
            images: args.images,
            price: args.price,
            rating: args.rating,
            stock: args.stock,
            thumbnail: args.thumbnail,
          });

          await newProduct.save();

          return newProduct;
        } catch (err) {
          throw new Error("Error creating product: " + err.message);
        }
      }
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
        brand: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        discountPercentage: { type: GraphQLFloat },
        images: { type: GraphQLString },
        price: { type: GraphQLFloat },
        rating: { type: GraphQLFloat },
        stock: { type: GraphQLInt },
        thumbnail: { type: GraphQLString },
        title: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const newProduct = await Product.findByIdAndUpdate(args.id, {
          brand: args.brand,
          category: args.category,
          description: args.description,
          discountPercentage: args.discountPercentage,
          images: args.images,
          price: args.price,
          rating: args.rating,
          stock: args.stock,
          thumbnail: args.thumbnail,
          title: args.title,
        });

        return newProduct;
      },
    },

    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args.id);

        await Product.findByIdAndDelete(args.id);

        return args;
      },
    },
    // ORDERS MUTATIONS
    createOrder: {
      type: GraphQLString,
      args: {
        userId: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        zipCode: { type: GraphQLString },
        totalAmount: { type: GraphQLFloat },
        items: { type: GraphQLString },
      },
      async resolve(parent, args, req) {
        const newOrder = new Order({
          userId: args.userId,
          firstName: args.firstName,
          lastName: args.lastName,
          address: args.address,
          city: args.city,
          country: args.country,
          zipCode: args.zipCode,
          totalAmount: args.totalAmount,
          items: args.items,
        });

        await newOrder.save();

        const data = {
          message: "Order Placed Successfully",
        };
        return JSON.stringify(data);
      }
    }
  }
});

// Export a GraphQLSchema that includes the RootQuery and Mutation.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});