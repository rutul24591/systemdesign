const PROTO_PATH = './customers.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
  defaults: true,
  oneofs: true
});

const customerProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers = [
  { id: '1', name: 'John Doe', age: 22, address: '1 Main St' },
  { id: '2', name: 'Jane Doe', age: 23, address: '2 Main St' },
  { id: '3', name: 'Jim Doe', age: 24, address: '3 Main St' },
  { id: '4', name: 'Jill Doe', age: 25, address: '4 Main St' },
  { id: '5', name: 'Jack Doe', age: 26, address: '5 Main St' },
  { id: '6', name: 'Jenny Doe', age: 27, address: '6 Main St' },
  { id: '7', name: 'Jerry Doe', age: 28, address: '12 Main St' },
  { id: '8', name: 'Jasmine Doe', age: 29, address: '13 Main St' },
  { id: '9', name: 'Jared Doe', age: 30, address: '32 Main St' },
  { id: '10', name: 'Jared Doe', age: 31, address: '23 Main St' }
];

server.addService(customerProto.CustomerService.service, {
  // Implement the getAll method. call is the request object, callback is the response object. 
  // call is used as a placeholder for the request object because we don't need it in this case.
  // call Refers to this in javascript.
  // In memory data manipulation or database operations can be done here.
  getAll: (call, callback) => {
    callback(null, { customers });
  },
  get: (call, callback) => {
    let customer = customers.find(c => c.id == call.request.id);
    if (customer) {
      callback(null, customer)
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found"
      });
    }
  },
  insert: (call, callback) => {
    let customer = call.request;
    customer.id = uuidv4() || Math.random();

    customers.push(customer);
    callback(null, customer);
  },
  update: (call, callback) => {
    let existingCustomer = customers.find(c => c.id === call.request.id);

    if (existingCustomer) {
      existingCustomer.name = call.request.name;
      existingCustomer.age = call.request.age;
      existingCustomer.address = call.request.address;
      callback(null, existingCustomer);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found"
      })
    }
  },
  remove: (call, callback) => {
    let existingCustomerIndex = customers.findIndex(c => c.id === call.request.id);

    if (existingCustomerIndex !== -1) {
      let existingCustomer = customers[existingCustomerIndex];
      customers.splice(existingCustomerIndex, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status_NOT_FOUND,
        details: "Not found"
      })
    }
  }
});

server.bindAsync('127.0.0.1:30043', grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error(`Error starting grpc server: ${error}`);
  } else {
    // Below line not needed. Deprecated.
    // server.start();
    console.log('Server running at http://127.0.0.1:30043');
  }
});